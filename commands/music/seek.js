const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed, updateEmbed } = require('../../util/embed.js');
const { parseTimeToSeconds } = require('../../util/time.js');
const { checkVC } = require('../../util/check.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seek')
		.setDescription('Seek music')
		.addStringOption((subcommand) =>
			subcommand.setName('time').setDescription('Time to seek on').setRequired(true)
		),
	info: {
		premium: false,
	},
	async execute(interaction) {
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

		const time = interaction.options.getString('time');

		const seconds = parseTimeToSeconds(time);
		if (!seconds) {
			const invalidTimeEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.invalidFormat,
				interaction
			);
			await interaction.editReply({ embeds: [invalidTimeEmbed] });
			return;
		}
		await globalThis.queue[guildId].player.get();
		if (
			seconds >
			globalThis.queue[guildId].queue[globalThis.queue[guildId].index].data.info
				.length
		) {
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.outOfLength,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}
		const embed = createMessageEmbed(
			getLocale(
				globalThis.guilds.get(interaction.guildId).locale
			).vc.seeked.replace('{time}', time),
			interaction
		);

		Promise.all([
			globalThis.queue[guildId].player.seek(seconds * 1000),
			updateEmbed(guildId),
			interaction.editReply({ embeds: [embed] }),
		]);
		return;
	},
};
