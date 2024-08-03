import { DiscordSDK } from '@discord/embedded-app-sdk';

const client_id = '1238711061784559677';

const discordSdk = new DiscordSDK(client_id);

async function setupDiscordSdk() {
	let auth = null;
	console.log('DiscordSDK is setting up');
	await discordSdk.ready();
	console.log('DiscordSDK is ready');
	const { code } = await discordSdk.commands.authorize({
		client_id: client_id,
		response_type: 'code',
		state: '',
		prompt: 'none',
		scope: ['identify', 'guilds'],
	});
	console.log('Authorization is successful');
	const response = await fetch('/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code,
		}),
	});
	console.log('Token is fetched');
	const { access_token } = await response.json();
	auth = await discordSdk.commands.authenticate({
		access_token,
	});
	console.log('Authentication is successful');
	if (auth == null) {
		throw new Error('Authenticate command failed');
	}
	return auth;
}

(async () => {
	try {
		let auth = await setupDiscordSdk();
		console.log('DiscordSDK is set up');

		const button = document.getElementById('sendClick');
		button.addEventListener('click', async () => {
			fetch('/api/send');
			console.log('Button clicked');
		});
	} catch (e) {
		console.error(e);
	}
})();
