const config = require('../config.json');

const log = require('../util/log.js');

function bootServer() {
	const express = require('express');
	globalThis.app = express();

	globalThis.app.use(express.json());
	globalThis.app.post('/api/token', async (req, res) => {
		code = req.body.code;
		params = new URLSearchParams({
			client_id: config.bot.clientId,
			client_secret: config.bot.clientSecret,
			grant_type: 'authorization_code',
			code: code,
		});
		const response = await globalThis.fetch(`https://discord.com/api/oauth2/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: params,
		});
		const { access_token } = await response.json();
		res.json({ access_token });
	});

	globalThis.app.use(express.static('dist'));
	globalThis.app.listen(config.dashboard.port);
	log.info(`Server is running on port ${config.dashboard.port}`);
}

module.exports = { bootServer };
