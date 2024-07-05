const { createMessageEmbed } = require('../../util/embed.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	info: {
		premium: false,
	},
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
