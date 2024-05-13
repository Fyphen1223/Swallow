const config = require('../config.json');

const { createMusicEmbed } = require('./embed.js');

const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const listenEvents = async (guildId) => {
	global.queue[guildId].player.on('start', async (data) => {
		const current = global.queue[guildId].queue[global.queue[guildId].index];
		const embed = createMusicEmbed(guildId, 'Start');
		await global.queue[guildId].textChannel.send({ embeds: [embed] });
	});
};

module.exports = listenEvents;
