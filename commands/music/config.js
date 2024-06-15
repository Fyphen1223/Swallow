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
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === 'lang') {
			const language = interaction.options.getString('language');
			const current = globalThis.guilds.get(interaction.guildId);
			current.locale = language;
			globalThis.guilds.set(interaction.guildId, current);
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).config
					.langChanged,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}
	},
};
