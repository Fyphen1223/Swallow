const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed, updateEmbed } = require('../../util/embed.js');

const { checkVC } = require('../../util/check.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('pause').setDescription('Pause music'),
	info: {
		premium: false,
	},
	async execute(interaction) {
		const guildId = interaction.guild.id;

		if (!(await checkVC(interaction))) return;

		if (!globalThis.queue[guildId].player.track) {
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.notPlaying,
				interaction
			);
			await interaction.reply({ embeds: [embed] });
			return;
		}

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
