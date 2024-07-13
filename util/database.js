const fs = require('node:fs');
const path = require('node:path');

const config = require('../config.json');
const log = require('./log.js');

class database {
	constructor(options) {
		this.options = options;
		if (options?.database === 'local') {
			this.type = 0;
			this.database = {};
			this.database = JSON.parse(
				fs.readFileSync(path.join(__dirname, '..', 'data', 'guilds.json'))
			);
		}
	}

	get(guildId) {
		if (!this.database[guildId]) {
			this.database[guildId] = {};
			log.info(
				`Guild ${guildId} added to guilds.json`,
				config.config.log.debug,
				config.config.log.saveToFile
			);
		}
		if (this.type === 0) {
			return this.database[guildId];
		}
	}
	set(guildId, data) {
		if (!this.database[guildId]) {
			this.database[guildId] = {
				locale: 'en',
				config: {},
			};
			log.info(
				`Guild ${guildId} added to guilds.json`,
				config.config.log.debug,
				config.config.log.saveToFile
			);
		}
		if (this.type === 0) {
			this.database[guildId] = data;
			fs.writeFileSync(
				path.join(__dirname, '..', 'data', 'guilds.json'),
				JSON.stringify(this.database, null, 2)
			);
		}
		return;
	}
}

module.exports = { database };
