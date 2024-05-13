const config = require('../config.json');

const { createMusicEmbed } = require('./embed.js');

const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const listenEvents = async (guildId) => {
	global.queue[guildId].player.on('start', async (data) => {
		const current = global.queue[guildId].queue[global.queue[guildId].index];
		global.queue[guildId].textChannel.send(`Now playing: ${current.data.info.title}`);
	});
};

module.exports = listenEvents;
