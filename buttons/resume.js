const { createMessageEmbed, updateEmbed } = require('../util/embed.js');
const { getLocale } = require('../lang/lang.js');

module.exports = {
	data: {
		customId: 'resume',
	},
	execute: async (interaction) => {
		await interaction.deferReply();
		const guildId = interaction.guild.id;
		if (!interaction.member.voice.channelId || !globalThis.queue[guildId]) {
			const noValidVCEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.noVC,
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
					getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
						.differentVC,
					interaction
				);
				await interaction.editReply({ embeds: [differentVCEmbed] });
				return;
			}
		}

		if (!globalThis.queue[guildId].player.track) {
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.notPlaying,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}

		const embed = createMessageEmbed(
			getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.resumed,
			interaction
		);

		Promise.all([
			globalThis.queue[guildId].player.resume(),
			updateEmbed(guildId),
			interaction.editReply({ embeds: [embed] }),
		]);
		return;
	},
};
