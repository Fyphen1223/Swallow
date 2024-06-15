const { getLocale } = require('../../lang/lang.js');
const {
	createMessageEmbed,
	createMusicEmbed,
	createButton,
} = require('../../util/embed.js');

const { checkVC } = require('../../util/check.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('resume').setDescription('Resume music'),
	info: {
		premium: false,
	},
	async execute(interaction) {
		await interaction.deferReply();
		const guildId = interaction.guild.id;

		if (!(await checkVC(interaction))) return;

		if (globalThis.queue[guildId].player.status !== 'playing') {
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.notPlaying,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}

		await globalThis.queue[guildId].player.resume();
		const embed = createMessageEmbed(
			getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.resumed,
			interaction
		);
		await interaction.editReply({ embeds: [embed] });
		const panel = await createMusicEmbed(guildId);
		try {
			await globalThis.queue[guildId].panel.edit({
				embeds: [panel.embed],
				components: createButton('resume'),
				files: [panel.file],
			});
		} catch (_) {
			await globalThis.queue[guildId].textChannel.send({
				embeds: [panel.embed],
				components: createButton('resume'),
				files: [panel.file],
			});
		}
		return;
	},
};
