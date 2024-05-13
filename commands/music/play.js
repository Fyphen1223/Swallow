const config = require('../../config.json');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');

const guilds = require('../../data/guilds.json');

const discord = require('discord.js');
const {
	SlashCommandBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	EmbedBuilder,
} = require('discord.js');
const listenEvents = require('../../util/playerEvent.js');

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
		// handle the autocompletion response (more on how to do that below)
	},
	async execute(interaction) {
		await interaction.deferReply();

		const guildId = interaction.guild.id;

		//Add guild queue to the global queue and node
		if (!global.queue[interaction.guild.id]) {
			global.queue.add(interaction.guild.id);
			global.queue[guildId].node = global.Tsumi.getIdealNode();
		}

		// Check if the user is in a voice channel
		if (!interaction.member.voice.channelId) {
			const noValidVCEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noVC,
				interaction
			);
			await interaction.editReply({ embeds: [noValidVCEmbed] });
			return;
		}

		if (global.queue[guildId].voiceChannel) {
			if (
				global.queue[guildId].voiceChannel.id !==
				interaction.member.voice.channelId
			) {
				const differentVCEmbed = createMessageEmbed(
					getLocale(guilds[guildId].locale).vc.differentVC,
					interaction
				);
				await interaction.editReply({ embeds: [differentVCEmbed] });
				return;
			}
		}

		const query = interaction.options.getString('query');

		//Join channel first
		if (!global.queue[guildId].voiceChannel) {
			global.queue[guildId].textChannel = interaction.channel;
			global.queue[guildId].voiceChannel = interaction.member.voice.channel;
			global.queue[guildId].player = await global.queue[
				guildId
			].node.joinVoiceChannel(
				{
					guildId: guildId,
					channelId: interaction.member.voice.channelId,
				},
				{
					selfDeaf: true,
					selfMute: false,
				}
			);
			listenEvents(guildId);
		}

		//そもそもVCに未参加
		if (!query && global.queue[guildId].isEmpty()) {
			const noQueryEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.joined,
				interaction
			);
			await interaction.editReply({ embeds: [noQueryEmbed] });
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
		if (!query && !global.queue.isEmpty()) {
			// Start playing the queue
			return;
		}

		const result = await global.queue[guildId].node.loadTracks(query);

		let res = null;
		switch (result.loadType) {
			case 'track': {
				res = result.data;
				break;
			}
			case 'empty': {
				const searchResult = await global.queue[guildId].node.loadTracks(
					`ytsearch:${query}`
				);
				if (!searchResult?.data.length) {
					await interaction.editReply('Sorry, I could not find any data.');
					return;
				}
				res = searchResult.data.shift();
				break;
			}
			case 'playlist': {
				result.data.tracks.forEach((track) => {
					global.queue[guildId].add(track, interaction.user);
				});
				const resultEmbed = new discord.EmbedBuilder()
					.setColor(config.config.color.info)
					.setAuthor({
						name: ` | 🔍 Added ${result.data.info.name} to the queue.`,
						iconURL: interaction.user.avatarURL({}),
					});

				await interaction.editReply({ embeds: [resultEmbed] });
				if (global.queue[guildId].player.status === 'playing') return;
				// start playing the queue
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
		global.queue[guildId].queue.push({
			data: res,
			user: interaction.user,
		});

		const resultEmbed = new discord.EmbedBuilder()
			.setColor(config.config?.color?.info || '#000000')
			.setAuthor({
				name: ` | 🔍 Added ${res.info.title} to the queue.`,
				iconURL: interaction.user.avatarURL({}),
			});

		await interaction.editReply({ embeds: [resultEmbed] });

		await global.queue[guildId].player.play({
			track: {
				encoded:
					global.queue[guildId].queue[global.queue[guildId].index].data.encoded,
			},
		});
	},
};
