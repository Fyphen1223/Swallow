const config = require('../../config.json');

const fs = require('node:fs');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');

const guilds = require('../../data/guilds.json');
const cache = require('../../cache/search.json');
const searchResultCache = require('../../cache/searchResults.json');

const discord = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const listenEvents = require('../../util/playerEvent.js');

const log = require('../../util/log.js');

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
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		log.info(`${focusedValue} is focused.`, false, true);
		if (searchResultCache[focusedValue]) {
			const list = [];
			for (
				let i = 0;
				i < 5 && i < searchResultCache[focusedValue].data.length;
				i++
			) {
				list.push(searchResultCache[focusedValue].data[i].info.title);
			}
			await interaction.respond(
				list.map((choice) => ({
					name: choice,
					value: choice,
				}))
			);
			return;
		}

		const node = globalThis.Tsumi.getIdealNode();

		const result = await node.loadTracks(focusedValue);

		switch (result.loadType) {
			case 'empty': {
				const searchResult = await node.loadTracks(`ytsearch:${focusedValue}`);
				if (!searchResult?.data.length) return;

				searchResultCache[focusedValue] = searchResult;
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
				searchResultCache[focusedValue].data = list;
				fs.writeFileSync(
					'./cache/searchResults.json',
					JSON.stringify(searchResultCache)
				);
				break;
			}
			case 'track': {
				const list = [result.data.info.title];
				await interaction.respond(
					list.map((choice) => ({ name: choice, value: result.encoded }))
				);
				break;
			}
			case 'playlist': {
				const list = [];
				for (let i = 0; i < 25 && i < result.data.tracks.length; i++) {
					list.push([
						result.data.tracks[i].info.title,
						result.data.tracks[i].info.title,
					]);
				}

				await interaction.respond(
					list.map((choice) => ({ name: choice[0], value: choice[1] }))
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

		//Add guild queue to the global queue and node
		if (!globalThis.queue[interaction.guild.id]) {
			globalThis.queue.add(interaction.guild.id);
			globalThis.queue[guildId].node = globalThis.Tsumi.getIdealNode();
		}

		// Check if the user is in a voice channel
		if (!interaction.member.voice.channelId) {
			const noValidVCEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noVC,
				interaction
			);
			await interaction.reply({ embeds: [noValidVCEmbed] });
			return;
		}

		if (globalThis.queue[guildId].voiceChannel) {
			if (
				globalThis.queue[guildId].voiceChannel.id !==
				interaction.member.voice.channelId
			) {
				const differentVCEmbed = createMessageEmbed(
					getLocale(guilds[guildId].locale).vc.differentVC,
					interaction
				);
				await interaction.reply({ embeds: [differentVCEmbed] });
				return;
			}
		}

		const query = interaction.options.getString('query');

		//Join channel first
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

		//そもそもVCに未参加
		if (!query && globalThis.queue[guildId].isEmpty()) {
			const noQueryEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.joined,
				interaction
			);
			await interaction.reply({ embeds: [noQueryEmbed] });
			return;
		}

		/*
		1. そもそもVCに未参加
		2. キューがないかつクエリがない
		3. キューがあるかつクエリがない
		4. キューがあるかつクエリがある
		5. キューがないかつクエリがある
		*/

		// クエリが無いがキューは空ではない
		if (!query && !globalThis.queue[guildId].isEmpty()) {
			// Start playing the queue
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
				if (cache[query]) {
					res = cache[query].res;
					break;
				}
				const searchResult = await globalThis.queue[guildId].node.loadTracks(
					`ytsearch:${query}`
				);
				if (!searchResult?.data.length) {
					await interaction.reply('Sorry, I could not find any data.');
					return;
				}
				res = searchResult.data.shift();
				cache[query] = {
					res,
					time: new Date(),
				};
				break;
			}
			case 'playlist': {
				result.data.tracks.forEach((track) => {
					globalThis.queue[guildId].add(track, interaction.user);
				});
				const resultEmbed = new discord.EmbedBuilder()
					.setColor(config.config.color.info)
					.setAuthor({
						name: ` | 🔍 Added ${result.data.info.name} to the queue.`,
						iconURL: interaction.user.avatarURL(),
					});

				await interaction.reply({ embeds: [resultEmbed] });
				if (globalThis.queue[guildId].player.status === 'playing') return;
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

		const resultEmbed = new discord.EmbedBuilder()
			.setColor(config.config?.color?.info || '#000000')
			.setAuthor({
				name: ` | 🔍 Added ${res.info.title} to the queue.`,
				iconURL: interaction.user.avatarURL(),
			});

		await interaction.reply({ embeds: [resultEmbed] });
		if (globalThis.queue[guildId].player.status === 'playing') return;
		await globalThis.queue[guildId].player.play({
			track: {
				encoded:
					globalThis.queue[guildId].queue[globalThis.queue[guildId].index].data.encoded,
			},
		});
		fs.writeFileSync('./cache/search.json', JSON.stringify(cache));
	},
};
