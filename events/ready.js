const config = require('../config.json');
const log = require('../util/log.js');

const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		log.info(
			`Logged in as ${client.user.tag}`,
			true,
			config.config.log.saveToFile
		);
	},
};
