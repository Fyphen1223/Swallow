const http = require('http');
const https = require('https');
const fs = require('fs');

const config = require('../config.json');

const log = require('../util/log.js');

const express = require('express');

function bootServer() {
	globalThis.app = express();

	globalThis.server = https.createServer(
		{
			key: fs.readFileSync('./ssl/privatekey.pem'),
			cert: fs.readFileSync('./ssl/cert.pem'),
			ca: fs.readFileSync('./ssl/chain.pem'),
		},
		app
	);
	globalThis.app.use(express.json());
	globalThis.app.post('/api/token', async (req, res) => {
		code = req.body.code;
		params = new URLSearchParams({
			client_id: config.bot.applicationId,
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

	globalThis.app.post('/api/send', async (req, res) => {
		res.json({ success: true });
		console.log('Button clicked');
	});

	globalThis.app.use(express.static('./server/dist'));
	globalThis.server.listen(config.dashboard.port, () => {
		log.info(`Server is running on port ${config.dashboard.port}`, true, true);
	});
}

module.exports = { bootServer };
