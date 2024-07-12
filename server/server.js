const config = require('../config.json');

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.post('/api/token', async (req, res) => {
	code = req.body.code;
	console.log('code:', code);
	params = new URLSearchParams({
		client_id: config.bot.clientId,
		client_secret: config.bot.clientSecret,
		grant_type: 'authorization_code',
		code: code,
	});
	console.log('params:', params);

	const response = await fetch(`https://discord.com/api/oauth2/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: params,
	});
	const { access_token } = await response.json();
	console.log('access token:', access_token);
	res.json({ access_token });
});

app.use(express.static('dist'));

app.listen(PORT, () => {
	console.log(`サーバーが${PORT}番ポートで起動しました。`);
});
