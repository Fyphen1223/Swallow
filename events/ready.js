const config = require('../config.json');
const log = require('../util/log.js');
//const { generateAI } = require('../util/ai.js');

const { getRandomJoke } = require('../util/humor.js');

const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute: async (client) => {
		log.info(`Logged in as ${client.user.tag}`, true, config.config.log.saveToFile);
		if (!config.nodes) return log.error(`No nodes available, exiting...`, true, true);
		let i = 0;
		config.nodes.forEach(async (node) => {
			i++;
			try {
				await globalThis.Tsumi.addNode(node);
			} catch (_) {
				log.error(
					`Node ${node.host} is not working, please check your config file.`,
					true,
					true
				);
			}
			if (Object.keys(globalThis.Tsumi.Nodes).length === 0) {
				log.error(`No nodes available, exiting...`, true, true);
				process.exit(1);
			}
			log.info(`Node ${node.host} is ready`, true, config.config.log.saveToFile);
			if (i === config.nodes.length) {
				log.info(`All nodes are ready`, true, config.config.log.saveToFile);
				if (config.humor.enabled) {
					console.log('-----------------------');
					console.log(getRandomJoke('ready'));
					console.log('-----------------------');
				}
			}
		});
		/*
		console.log(
			await generateAI({
				ctx: 'ready',
			})
		);
		*/
	},
};
