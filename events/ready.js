const config = require('../config.json');
const log = require('../util/log.js');

const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		log.info(`Logged in as ${client.user.tag}`, true, config.config.log.saveToFile);
		if (!config.nodes) return log.error(`No nodes available, exiting...`, true, true);
		config.nodes.forEach((node) => {
			globalThis.Tsumi.addNode(node);
			if (Object.keys(globalThis.Tsumi.Nodes).length === 0) {
				log.error(`No nodes available, exiting...`, true, true);
				process.exit(1);
			}
		});
	},
};
