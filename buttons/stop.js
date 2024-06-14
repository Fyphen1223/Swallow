const { createMessageEmbed } = require('../util/embed.js');
const { getLocale } = require('../lang/lang.js');
const guilds = require('../data/guilds.json');

module.exports = {
	data: {
		customId: 'stop',
	},
	execute: async (interaction) => {
		await interaction.deferReply();
		const guildId = interaction.guild.id;
		if (!interaction.member.voice.channelId || !globalThis.queue[guildId]) {
			const noValidVCEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noVC,
				interaction
			);
			await interaction.editReply({ embeds: [noValidVCEmbed] });
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
				await interaction.editReply({ embeds: [differentVCEmbed] });
				return;
			}
		}

		if (globalThis.queue[guildId].player.status !== 'playing') {
			const embed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.notPlaying,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}

		await globalThis.queue[guildId].player.stop();
		await globalThis.queue[guildId].player.node.leaveVoiceChannel(guildId);

		globalThis.queue[guildId].voiceChannel = null;
		globalThis.queue[guildId].textChannel = null;

		const embed = createMessageEmbed(getLocale(guilds[guildId].locale).vc.stop);

		await interaction.editReply({ embeds: [embed] });
	},
};
