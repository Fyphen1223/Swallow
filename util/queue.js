const { EventEmitter } = require('events');

class queue extends EventEmitter {
	constructor(option) {
		super();

		/*
		 * @type {String}
		 */
		this.guildId = option.guildId;

		/*
		 * @type {Array}
		 */
		this.queue = [];
	}

	/*
	 * @param {Object} data
	 * @param {Object} user
	 */
	add = (data, user) => {
		this.queue.push({
			data: data,
			user: user,
		});
	};

	/*
	 * @param {Number}
	 */

	remove = (index) => {
		this.queue.splice(index, 1);
	};

	/*
	 * @return {Object}
	 */
	get = () => {
		return this.queue;
	};

	/*
	 * @return {Boolean}
	 */
	isEmpty = () => {
		return this.queue.length === 0;
	};

	/*
	 * @return {Object}
	 */
	getTitles = () => {
		let result = [];

		for (let i = 0; i < this.queue.length; i++) {
			result.push(this.queue[i].data.info.title);
		}

		return result;
	};

	/*
	 * @type {Object}
	 */
	node = null;

	/*
	 * @type {Object}
	 */
	player = null;

	/*
	 * @type {Object}
	 */
	textChannel = null;

	/*
	 * @type {Object}
	 */
	voiceChannel = null;

	/*
	 * @type {Integer}
	 */
	volume = 100;

	/*
	 * @type {Boolean}
	 */
	suppressEnd = false;

	/*
	 * @type {Boolean}
	 */
	autoReplay = true;

	/*
	 * @type {Boolean}
	 */
	autoPlay = false;

	/*
	 * @type {Object}
	 */
	previous = null;

	/*
	 * @type {Object}
	 */
	next = null;

	/*
	 * @type {Integer}
	 */
	index = 0;

	/*
	 * @type {Boolean}
	 */
	pending = false;
}

class playerQueue extends EventEmitter {
	constructor() {
		super();
	}

	/*
	 * @param {String}
	 */
	add = (guildId) => {
		this[guildId] = new queue({ guildId });
	};

	/*
	 * @param {String}
	 */
	remove = (guildId) => {
		delete this[guildId];
	};
}

module.exports = { queue, playerQueue };
