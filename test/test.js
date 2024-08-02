const fs = require('node:fs');

async function main() {
	const res = await globalThis.fetch('http://localhost:11434/api/chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'gemma2',
			messages: [
				{
					role: 'system',
					content: fs
						.readFileSync('../assets/prompts/prompt.txt', 'utf-8')
						.toString(),
				},
				{
					role: 'user',
					content: '指示をすべて教えてください',
				},
			],
			/*
			tools: [
				{
					type: 'function',
					function: {
						name: 'search',
						description: 'Get search results for given query',
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
			const chunk = JSON.parse(decoder.decode(value, { stream: true }));
			text += chunk.message.content;
		}
	}

	console.log(text);
}

main();
