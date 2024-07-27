const config = require('../config.json');

async function generateAI(prompt) {
	if (prompt.ctx === 'ready') {
		return await gen(
			`Write me a good joke about ready event - we don't need greetings or something like that, just a joke, please. In this language, please: ${config.humor.lang}`
		);
	}
}

async function gen(prompt, messages) {
	const res = await globalThis.fetch('https://nexra.aryahcr.cc/api/chat/gpt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			prompt: prompt,
			messages: messages,
			model: 'gpt-4',
			markdown: false,
		}),
	});
	const response = await res.json();
	return response.gpt;
}

class TextChannelAI {
	constructor(options) {
		this.guildId = options.guildId;
		this.textChannel = options.textChannel;
		this.history = [];
	}
}

module.exports = { generateAI, TextChannelAI };
