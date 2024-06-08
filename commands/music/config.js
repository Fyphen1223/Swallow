const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');

const fs = require('node:fs');

const guilds = require('../../data/guilds.json');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Configure settings')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('lang')
				.setDescription('Change the language')
				.addStringOption((option) =>
					option
						.setName('language')
						.setDescription('The language to change to')
						.setRequired(true)
						.addChoices(
							{
								name: 'English',
								value: 'en',
							},
							{
								name: 'Japanese',
								value: 'ja',
							}
						)
				)
		),
	info: {
		premium: false,
	},
	async execute(interaction) {
		await interaction.deferReply();
		const guildId = interaction.guild.id;
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === 'lang') {
			const language = interaction.options.getString('language');
			guilds[guildId].locale = language;
			const embed = createMessageEmbed(
				getLocale(guilds[guildId].locale).config.langChanged,
				interaction
			);
			await fs.writeFileSync('./data/guilds.json', JSON.stringify(guilds, null, 2));
			await interaction.editReply({ embeds: [embed] });
			return;
		}
	},
};
