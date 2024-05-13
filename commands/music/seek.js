const config = require('../../config.json');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');
const { parseTimeToSeconds } = require('../../util/time.js');

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
		.setName('seek')
		.setDescription('Seek music')
		.addStringOption((subcommand) =>
			subcommand.setName('time').setDescription('Time to seek on').setRequired(true)
		),
	async autocomplete(interaction) {
		// handle the autocompletion response (more on how to do that below)
	},
	async execute(interaction) {
		await interaction.deferReply();

		const guildId = interaction.guild.id;
		if (!interaction.member.voice.channelId || !global.queue[guildId]) {
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

		const time = interaction.options.getString('time');

		const seconds = parseTimeToSeconds(time);
		if (!seconds) {
			const invalidTimeEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.invalidFormat,
				interaction
			);
			await interaction.editReply({ embeds: [invalidTimeEmbed] });
			return;
		}
		await global.queue[guildId].player.get();
		if (
			seconds >
			global.queue[guildId].queue[global.queue[guildId].index].data.info.length
		) {
			const embed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.outOfLength,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}
		global.queue[guildId].player.seek(seconds * 1000);
		const embed = createMessageEmbed(
			getLocale(guilds[guildId].locale).vc.seeked.replace('{time}', time),
			interaction
		);
		await interaction.editReply({ embeds: [embed] });
		return;
	},
};