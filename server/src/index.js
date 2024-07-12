import { DiscordSDK } from '@discord/embedded-app-sdk';

const client_id = '1238711061784559677';

const discordSdk = new DiscordSDK(client_id);

async function setupDiscordSdk() {
	let auth = null;
	console.log('DiscordSDK is setting up');

	await discordSdk.ready();
	console.log('DiscordSDK is ready');

	const { code } = await discordSdk.commands.authorize({
		client_id: client_id, // クライアントIDを取得
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

		const channel = await discordSdk.commands.getChannel({
			channel_id: discordSdk.channelId,
		});
		document.getElementById('channel-name').innerText = channel.name;

		const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
			headers: {
				Authorization: `Bearer ${auth.access_token}`,
				'Content-Type': 'application/json',
			},
		});
		const guildsJson = await guilds.json(); // サーバー情報を取得
		const currentGuild = guildsJson.find((g) => g.id === discordSdk.guildId);
		const guildImg = document.createElement('img');
		guildImg.setAttribute(
			'src',
			`https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.webp?size=128`
		);
		document.getElementById('guild-icon').appendChild(guildImg);
	} catch (e) {
		console.error(e);
	}
})();
