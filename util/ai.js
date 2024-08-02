const config = require('../config.json');

const fs = require('node:fs');

/*
async function generateAI(prompt) {
	if (prompt.ctx === 'ready') {
		return await genGPTI(
			`Write me a good joke about ready event - we don't need greetings or something like that, just a joke, please. In this language, please: ${config.humor.lang}`
		);
	}
}

async function genGPTI(prompt, messages) {
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
*/

class TextChannelAI {
	constructor(options) {
		this.config = options.config;
		this.guildId = options.guildId;
		this.textChannel = options.textChannel;
		this.history = [];
		this.history.push({
			role: 'system',
			content: fs.readFileSync('../assets/prompts/prompt.txt', 'utf-8').toString(),
		});
	}

	generate = async (prompt) => {
		this.history.push({
			role: 'user',
			content: prompt,
		});
		const res = await globalThis.fetch('http://localhost:11434/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'phi3:14b',
				messages: this.history,
				prompt,
				stream: true,
				/*
				tools: [
					{
						type: 'function',
						function: {
							name: 'search',
							description:
								'Get search results on internet for given query.',
							parameters: {
								type: 'object',
								properties: {
									query: {
										type: 'string',
										description: 'The query to search for',
									},
								},
								required: ['query'],
							},
						},
					},
					{
						type: 'function',
						function: {
							name: 'play',
							description: 'Play music from given query',
							parameters: {
								type: 'object',
								properties: {
									query: {
										type: 'string',
										description: 'The query to play',
									},
								},
								required: ['query'],
							},
						},
					},
				],
				*/
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
		this.history.push({
			role: 'assistant',
			content: text,
		});
		return text;
	};
}

const ai = new TextChannelAI({
	config: config,
	guildId: '123456789012345678',
	textChannel: '123456789012345678',
});

async function main() {
	console.log(await ai.generate('こんにちは！私はFyphenです。'));
	console.log(await ai.generate('私は誰でしょう？'));
	console.log(await ai.generate('ありがと'));
}

main();

module.exports = { TextChannelAI };
