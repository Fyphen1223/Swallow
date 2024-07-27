const config = require('../config.json');

const { formatTime } = require('./time.js');

const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
GlobalFonts.registerFromPath('./assets/fonts/Jakarta.ttf', 'Jakarta');
GlobalFonts.registerFromPath('./assets/fonts/NotoSansJP.ttf', 'NotoSansJP');
const { cropImage } = require('cropify');

async function generateMusicCard(current, guildId) {
	const canvas = createCanvas(640 * 2, 600);
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = '#16213e';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	await globalThis.queue[guildId].player.get();
	//Title
	ctx.font = '50px "Jakarta", "NotoSans", "NotoSansJP"';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(formatTitle(current.title, ctx) || 'Title', 200 * 2, 45 * 2);

	//Author
	ctx.fillText(formatAuthor(current.author, ctx) || 'Author', 240 * 2, 90 * 2);
	ctx.fillStyle = '#26aed4';
	//by
	ctx.fillText('by', 200 * 2, 90 * 2);
	//Requested by
	const requester =
		globalThis.queue[guildId].queue[globalThis.queue[guildId].index].user;
	ctx.fillStyle = '#ffffff';
	ctx.fillText(formatRequester(requester.displayName, ctx), 500, 290);
	ctx.fillText(`${globalThis.queue[guildId].volume}%`, 400, 400);
	/*await loadImage(
		await cropImage({
			imagePath: `https://cdn.discordapp.com/avatars/${requester.id}/${requester.avatar}.webp`,
			width: 100,
			height: 100,
			cropCenter: true,
			borderRadius: 50,
		})
	);
	*/

	let ratio;

	if (globalThis.queue[guildId].player.position == 0) {
		ratio = 0;
	} else {
		ratio = globalThis.queue[guildId].player.position / current.length;
	}
	ctx.fillStyle = '#646464';
	ctx.fillRect(100, 575, canvas.width - 200, 10);
	ctx.fillStyle = '#26aed4';
	ctx.fillRect(100, 575, 10.8 * (ratio * 100), 10);

	//Progress bar time
	ctx.fillStyle = '#ffffff';
	ctx.font = '35px "Jakarta", "NotoSans", "NotoSansJP"';
	ctx.fillText(
		formatTime(Math.ceil(globalThis.queue[guildId].player.position / 1000)),
		100,
		550
	);
	ctx.fillText(formatTime(current.length / 1000, ctx), canvas.width - 220, 550);
	//Position
	ctx.font = '70px "Jakarta", "NotoSans", "NotoSansJP"';
	ctx.fillText(
		`${globalThis.queue[guildId].index + 1} / ${
			globalThis.queue[guildId].queue.length
		}`,
		canvas.width - 200,
		300
	);

	// Draw button background
	ctx.fillStyle = '#e94560';
	ctx.fillRect(550, 360, 200, 50);
	// Draw button text
	ctx.font = '30px "Jakarta", "NotoSans", "NotoSansJP"';
	ctx.fillStyle = 'white';
	ctx.fillText(formatSource(current.sourceName), 555, 395);

	let thumbnailImage = null;
	/*
	try {
		thumbnailImage = await cropImage({
			imagePath: current.artworkUrl,
			width: 160 * 2,
			height: 220 * 2,
			cropCenter: true,
			borderRadius: 10,
		});
	} catch (e) {
		thumbnailImage = await cropImage({
			imagePath: config.config.music.defaultThumbnail,
			width: 160 * 2,
			height: 220 * 2,
			cropCenter: true,
			borderRadius: 10,
		});
	}

	const croppedImage = await cropImage({
		imagePath: `https://cdn.discordapp.com/avatars/${requester.id}/${requester.avatar}.webp`,
		width: 100,
		height: 100,
		cropCenter: true,
		borderRadius: 50,
	});
	*/
	const images = await Promise.all([
		cropImage({
			imagePath: current.artworkUrl || config.config.music.defaultThumbnail,
			width: 160 * 2,
			height: 220 * 2,
			cropCenter: true,
			borderRadius: 10,
		}),
		cropImage({
			imagePath: `https://cdn.discordapp.com/avatars/${requester.id}/${requester.avatar}.webp`,
			width: 100,
			height: 100,
			cropCenter: true,
			borderRadius: 50,
		}),
	]);
	const d = await Promise.all([loadImage(images[1]), loadImage(images[0])]);
	ctx.drawImage(d[0], 380, 225);
	ctx.drawImage(d[1], 10 * 2, 10 * 2);

	const buffer = canvas.toBuffer('image/png');
	return buffer;
}

function formatTitle(string, ctx) {
	let textWidth = ctx.measureText(string).width;
	if (textWidth + 400 < 1210) {
		return string;
	}
	do {
		string = string.slice(0, -1);
		textWidth = ctx.measureText(string).width;
	} while (textWidth + 400 >= 1210);
	string += '...';
	return string;
}

function formatAuthor(string, ctx) {
	let textWidth = ctx.measureText(string).width;
	if (textWidth + 700 < 1210) {
		return string;
	}
	do {
		string = string.slice(0, -1);
		textWidth = ctx.measureText(string).width;
	} while (textWidth + 700 >= 1210);
	string += '...';
	return string;
}

function formatRequester(string, ctx) {
	let textWidth = ctx.measureText(string).width;
	if (textWidth + 700 < 1210) {
		return string;
	}
	do {
		string = string.slice(0, -1);
		textWidth = ctx.measureText(string).width;
	} while (textWidth + 700 >= 1210);
	string += '...';
	return string;
}

function formatSource(string) {
	switch (string) {
		case 'youtube':
			return 'YouTube';
		case 'soundcloud':
			return 'SoundCloud';
		case 'bandcamp':
			return 'Bandcamp';
		case 'spotify':
			return 'Spotify';
		case 'apple':
			return 'Apple Music';
		case 'twitch':
			return 'Twitch';
		case 'vimeo':
			return 'Vimeo';
		case 'facebook':
			return 'Facebook';
		case 'twitter':
			return 'Twitter';
		case 'instagram':
			return 'Instagram';
		case 'mixer':
			return 'Mixer';
		case 'picarto':
			return 'Picarto';
		case 'bilibili':
			return 'Bilibili';
		case 'niconico':
			return 'Niconico';
		case 'openrec':
			return 'OpenRec';
		case 'tiktok':
			return 'TikTok';
		case 'local':
			return 'Local';
		default:
			return string;
	}
}

module.exports = { generateMusicCard };
