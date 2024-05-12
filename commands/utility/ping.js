const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');

const guilds = require('../../data/guilds.json');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.deferReply();
		const embed = createMessageEmbed(
			`🏓 - Pong! Current ping is ${discordClient.ws.ping}ms`,
			interaction
		);
		await interaction.editReply({ embeds: [embed] });
		return;
	},
};
