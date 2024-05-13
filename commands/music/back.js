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
	data: new SlashCommandBuilder().setName('back').setDescription('Play previous music'),
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

		if (global.queue[guildId].queue.length === 0) {
			const noMusicEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noMusic,
				interaction
			);
			await interaction.editReply({ embeds: [noMusicEmbed] });
			return;
		}

		const index = global.queue[guildId].index - 1;
		global.queue[guildId].previous =
			global.queue[guildId].queue[global.queue[guildId].index];

		if (index < 0) {
			const embed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noMoreToBack
			);
			global.queue[guildId].textChannel.send({ embeds: [embed] });
			return;
		}

		global.queue[guildId].index--;
		global.queue[guildId].suppressEnd = true;
		global.queue[guildId].player.position = 0;
		global.queue[guildId].player.play({
			track: {
				encoded:
					global.queue[guildId].queue[global.queue[guildId].index].data.encoded,
			},
		});

		const backEmbed = createMessageEmbed(getLocale(guilds[guildId].locale).vc.backed);

		await interaction.editReply({ embeds: [backEmbed] });
		return;
	},
};
