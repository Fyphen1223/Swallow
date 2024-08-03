const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed, updateEmbed } = require('../../util/embed.js');

const { checkVC, handleNotPlaying } = require('../../util/check.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('resume').setDescription('Resume music'),
	info: {
		premium: false,
	},
	async execute(interaction) {
		const guildId = interaction.guild.id;

		if (!(await checkVC(interaction))) return;

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
