const config = require('../../config.json');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed, updateEmbed } = require('../../util/embed.js');

const { SlashCommandBuilder } = require('discord.js');
const listenEvents = require('../../util/playerEvent.js');

const log = require('../../util/log.js');
const { checkVC } = require('../../util/check.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music from a URL or search query')
		.addStringOption((option) =>
			option
				.setName('query')
				.setDescription('The URL or search query')
				.setAutocomplete(true)
				.setRequired(false)
		),
	info: {
		premium: false,
	},
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		log.info(`${focusedValue} is focused.`, false, true);
		const node = globalThis.Tsumi.getIdealNode();
		const result = await node.loadTracks(focusedValue);
		switch (result.loadType) {
			case 'empty': {
				const searchResult = await node.loadTracks(`ytsearch:${focusedValue}`);
				if (!searchResult?.data.length) return;
				const list = [];
				for (let i = 0; i < 5 && i < searchResult.data.length; i++) {
					list.push(searchResult.data[i]);
				}
				await interaction.respond(
					list.map((choice) => ({
						name: choice.info.title,
						value: choice.info.title,
					}))
				);
				break;
			}
			case 'track': {
				const list = [result.data.info.title];
				await interaction.respond(
					list.map((choice) => ({ name: choice, value: choice }))
				);
				break;
			}
			case 'playlist': {
				const list = [];
				for (let i = 0; i < 25 && i < result.data.tracks.length; i++) {
					list.push(result.data.tracks[i].info.title);
				}

				await interaction.respond(
					list.map((choice) => ({ name: choice, value: choice }))
				);

				break;
			}
			case 'search': {
				if (!result?.data.length) return;
				const list = [];
				for (let i = 0; i < 5 && i < result.data.length; i++) {
					list.push(result.data[i].info.title, result.data[i].info.title);
				}
				await interaction.respond(
					list.map((choice) => ({ name: choice, value: choice }))
				);
				break;
			}
			case 'error': {
				log.error('An error has occured while trying to search for a track.');
			}
		}
	},
	async execute(interaction) {
		const guildId = interaction.guild.id;
		if (!globalThis.queue[guildId]) {
			globalThis.queue.add(guildId);
			globalThis.queue[guildId].node = globalThis.Tsumi.getIdealNode();
		}

		if (!(await checkVC(interaction))) return;

		const query = interaction.options.getString('query');

		if (!globalThis.queue[guildId].voiceChannel) {
			globalThis.queue[guildId].textChannel = interaction.channel;
			globalThis.queue[guildId].voiceChannel = interaction.member.voice.channel;
			globalThis.queue[guildId].player = await globalThis.queue[
				guildId
			].node.joinVoiceChannel({
				guildId: guildId,
				channelId: interaction.member.voice.channelId,
				options: {
					deaf: true,
					mute: false,
				},
			});
			listenEvents(guildId);
		}

		if (!query && globalThis.queue[guildId].isEmpty()) {
			const noQueryEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.joined,
				interaction
			);
			await interaction.reply({ embeds: [noQueryEmbed] });
			return;
		}

		if (!query && !globalThis.queue[guildId].isEmpty()) {
			globalThis.queue[guildId].index = 0;
			Promise.all([
				globalThis.queue[guildId].player.play({
					track: {
						encoded: globalThis.queue[guildId].queue[0].data.encoded,
					},
				}),
				interaction.reply({
					embeds: [
						createMessageEmbed(
							getLocale(globalThis.guilds.get(interaction.guildId).locale)
								.vc.queueStarted,
							interaction
						),
					],
				}),
			]);
			return;
		}

		const result = await globalThis.queue[guildId].node.loadTracks(query);

		let res = null;
		switch (result.loadType) {
			case 'track': {
				res = result.data;
				break;
			}
			case 'empty': {
				const searchResult = await globalThis.queue[guildId].node.loadTracks(
					`ytsearch:${query}`
				);
				if (!searchResult?.data.length) {
					await interaction.reply('Sorry, I could not find any data.');
					return;
				}
				res = searchResult.data.shift();
				break;
			}
			case 'playlist': {
				result.data.tracks.forEach((track) => {
					globalThis.queue[guildId].add(track, interaction.user);
				});
				const resultEmbed = {
					color: parseInt(
						config.config?.color?.info || '#000000'.replace('#', ''),
						16
					),
					author: {
						name: ` | 🔍 Added ${res.info.title} to the queue.`,
						url: undefined,
						icon_url: interaction.user.avatarURL(),
					},
				};

				await interaction.reply({ embeds: [resultEmbed] });
				if (globalThis.queue[guildId].player.track) return;
				await globalThis.queue[guildId].player.play({
					track: {
						encoded:
							globalThis.queue[guildId].queue[
								globalThis.queue[guildId].index
							].data.encoded,
					},
				});
				return;
			}
			case 'search': {
				if (!result?.data.length) {
					await interaction.editReply('Sorry, I could not find any data.');
					return;
				}
				res = result.data.shift();
				break;
			}
			case 'error': {
				await interaction.editReply('Sorry, I could not find any data.');
				return;
			}
		}

		globalThis.queue[guildId].queue.push({
			data: res,
			user: interaction.user,
		});
		const resultEmbed = {
			color: parseInt(config.config?.color?.info || '#000000'.replace('#', ''), 16),
			author: {
				name: ` | 🔍 Added ${res.info.title} to the queue.`,
				url: undefined,
				icon_url: interaction.user.avatarURL(),
			},
		};

		if (globalThis.queue[guildId].player.track) {
			Promise.all([
				updateEmbed(guildId),
				interaction.reply({
					embeds: [resultEmbed],
				}),
			]);
		} else {
			Promise.all([
				interaction.reply({
					embeds: [resultEmbed],
				}),
				await globalThis.queue[guildId].player.play({
					track: {
						encoded:
							globalThis.queue[guildId].queue[
								globalThis.queue[guildId].index
							].data.encoded,
					},
				}),
			]);
		}
		return;
	},
};
