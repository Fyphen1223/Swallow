const { EventEmitter } = require('events');

class queue extends EventEmitter {
	constructor(option) {
		super();

		this.guildId = option.guildId;
		this.queue = [];
	}

	add = function (data) {
		this.queue.push(data);
	};

	remove = function (index) {
		this.queue.splice(index, 1);
	};

	get = function () {
		return this.queue;
	};

	isEmpty = function () {
		return this.queue.length === 0;
	};

	getTitles = function () {
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
	autoReplay = false;
	autoPlay = false;
	previous = null;
}

class playerQueue extends EventEmitter {
	constructor() {
		super();
	}

	add = function (guildId) {
		this[guildId] = new queue({ guildId });
	};

	remove = function (guildId) {
		delete this[guildId];
	};
}

module.exports = { queue, playerQueue };
