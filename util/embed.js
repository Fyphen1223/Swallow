const config = require('../config.json');

const { EmbedBuilder } = require('discord.js');

function createMessageEmbed(content, interaction) {
	const embed = new EmbedBuilder()
		.setColor(config.config?.color?.info || '#000000')
		.setAuthor({
			name: ` | ${content}`,
			iconURL: interaction.user.avatarURL({}),
		});
	return embed;
}

module.exports = { createMessageEmbed };
