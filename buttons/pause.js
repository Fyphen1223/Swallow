const { getLocale } = require('../lang/lang.js');
const { createMessageEmbed, updateEmbed } = require('../util/embed.js');
const { checkVC, handleNotPlaying } = require('../util/check.js');

module.exports = {
	data: {
		customId: 'pause',
	},
	execute: async (interaction) => {
		const guildId = interaction.guild.id;

		if (!(await checkVC(interaction))) return;
		if (await handleNotPlaying(interaction)) return;

		const embed = createMessageEmbed(
			getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.paused,
			interaction
		);

		Promise.all([
			globalThis.queue[guildId].player.pause(),
			updateEmbed(guildId),
			interaction.reply({ embeds: [embed] }),
		]);
		return;
	},
};
