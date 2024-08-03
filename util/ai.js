const config = require('../config.json');

const fs = require('node:fs');

const { handleNotPlaying, checkVCMessage } = require('./check');

class TextChannelAI {
	constructor(options) {
		this.config = options.config;
		this.guildId = options.guildId;
		this.textChannel = options.textChannel;
		this.history = [];
		this.history.push({
			role: 'system',
			content: fs.readFileSync('./assets/prompts/prompt.txt', 'utf-8').toString(),
		});
	}

	generate = async (prompt) => {
		this.history.push({
			role: 'user',
			content: prompt,
		});

		let text = null;
		if (config.ai.useOllama) {
			text = await this.generateWithOllama();
		} else {
			text = await this.generateWithGPTI();
		}

		this.history.push({
			role: 'assistant',
			content: text,
		});

		return text;
	};

	generateWithOllama = async () => {
		const res = await globalThis.fetch('http://localhost:11434/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'phi3:14b',
				messages: this.history,
				stream: true,
			}),
		});

		const reader = res.body.getReader();
		const decoder = new TextDecoder();
		let done = false;
		let text = '';

		while (!done) {
			const { value, done: readerDone } = await reader.read();
			done = readerDone;
			if (value) {
				const chunk = JSON.parse(
					decoder.decode(value, {
						stream: true,
					})
				);
				text += chunk.message.content;
			}
		}
		return text;
	};

	generateWithGPTI = async () => {
		const res = await globalThis.fetch('https://nexra.aryahcr.cc/api/chat/gpt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messages: this.history,
				model: config.ai.model,
				markdown: false,
			}),
		});
		const response = await res.json();
		return response.gpt;
	};
}

module.exports = { TextChannelAI };
