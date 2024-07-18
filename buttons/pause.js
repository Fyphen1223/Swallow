const { getLocale } = require('../lang/lang.js');
const { createMessageEmbed, updateEmbed } = require('../util/embed.js');
const { checkVC } = require('../util/check.js');

module.exports = {
	data: {
		customId: 'pause',
	},
	execute: async (interaction) => {
		await interaction.deferReply();
		const guildId = interaction.guild.id;

		if (!(await checkVC(interaction))) return;

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
			getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.paused,
			interaction
		);

		Promise.all([
			globalThis.queue[guildId].player.pause(),
			updateEmbed(guildId),
			interaction.editReply({ embeds: [embed] }),
		]);
		return;
	},
};
