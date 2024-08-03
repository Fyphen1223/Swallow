const { createMessageEmbed, updateEmbed } = require('../util/embed.js');
const { getLocale } = require('../lang/lang.js');
const { handleNotPlaying } = require('../util/check.js');

module.exports = {
	data: {
		customId: 'resume',
	},
	execute: async (interaction) => {
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

		if (await handleNotPlaying(interaction)) return;

		const embed = createMessageEmbed(
			getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.resumed,
			interaction
		);

		Promise.all([
			globalThis.queue[guildId].player.resume(),
			updateEmbed(guildId),
			interaction.reply({ embeds: [embed] }),
		]);
		return;
	},
};
