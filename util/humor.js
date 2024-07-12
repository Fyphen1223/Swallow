const humor = require('../assets/json/humor.json');

function getRandomJoke(ctx) {
	if (ctx === 'ready') {
		return humor.ready[Math.floor(Math.random() * humor.ready.length)];
	}
}

module.exports = { getRandomJoke };
