const { EventEmitter } = require('events');

class queue extends EventEmitter {
	constructor(option) {
		super();

		this.guildId = option.guildId;
		this.queue = [];
	}

	add = (data, user) => {
		this.queue.push({
			data: data,
			user: user,
		});
	};

	remove = (index) => {
		this.queue.splice(index, 1);
	};

	get = () => {
		return this.queue;
	};

	isEmpty = () => {
		return this.queue.length === 0;
	};

	getTitles = () => {
		let result = [];

		for (let i = 0; i < this.queue.length; i++) {
			result.push(this.queue[i].data.info.title);
		}

		return result;
	};

	node = null;
	player = null;
	textChannel = null;
	voiceChannel = null;
	volume = 100;
	suppressEnd = false;
	autoReplay = true;
	autoPlay = false;
	previous = null;
	index = 0;
}

class playerQueue extends EventEmitter {
	constructor() {
		super();
	}

	add = (guildId) => {
		this[guildId] = new queue({ guildId });
	};

	remove = (guildId) => {
		delete this[guildId];
	};
}

module.exports = { queue, playerQueue };
