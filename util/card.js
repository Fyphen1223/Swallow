const { formatTime } = require('./time.js');

const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
GlobalFonts.registerFromPath('./assets/fonts/Jakarta.ttf', 'Jakarta');
GlobalFonts.registerFromPath('./assets/fonts/NotoSansJP.ttf', 'NotoSansJP');
const { cropImage } = require('cropify');

async function generateMusicCard(current, guildId) {
	const canvas = createCanvas(640 * 2, 600);
	const ctx = canvas.getContext('2d');
	const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	gradient.addColorStop(0, '#1a1a2e');
	gradient.addColorStop(1, '#16213e');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	const thumbnailImage = await cropImage({
		imagePath: current.artworkUrl,
		width: 160 * 2,
		height: 220 * 2,
		cropCenter: true,
		borderRadius: 10,
	});
	const image = await loadImage(thumbnailImage);
	ctx.drawImage(image, 10 * 2, 10 * 2);
	ctx.font = '50px "Jakarta", "NotoSansJP", "NotoSans"';
	ctx.fillStyle = '#ffffff';
	//Title

	ctx.fillText(formatTitle(current.title, canvas) || 'Title', 200 * 2, 45 * 2);
	//Author
	ctx.font = '50px "Jakarta", "NotoSansJP", "NotoSans"';
	ctx.fillText(formatAuthor(current.author, canvas) || 'Author', 240 * 2, 90 * 2);
	ctx.fillStyle = '#26aed4';
	//by
	ctx.font = '50px "Jakarta", "NotoSansJP", "NotoSans"';
	ctx.fillText('by', 200 * 2, 90 * 2);
	//Requested by
	const requester =
		globalThis.queue[guildId].queue[globalThis.queue[guildId].index].user;
	ctx.fillStyle = '#ffffff';
	ctx.font = '50px "Jakarta", "NotoSansJP", "NotoSans"';
	ctx.fillText(formatRequester(requester.displayName), 500, 290);
	ctx.fillText(`${globalThis.queue[guildId].volume}%`, 400, 400);
	const requesterImage = await cropImage({
		imagePath: `https://cdn.discordapp.com/avatars/${requester.id}/${requester.avatar}.webp`,
		width: 100,
		height: 100,
		cropCenter: true,
		borderRadius: 50,
	});
	const requesterImageLoad = await loadImage(requesterImage);
	ctx.drawImage(requesterImageLoad, 380, 225);
	let ratio;
	if (queue[guildId].player.position == 0) {
		ratio = 0;
	} else {
		ratio = queue[guildId].player.position / current.length;
	}
	ctx.font = '50px "Jakarta", "NotoSansJP", "NotoSans"';
	ctx.fillStyle = '#646464';
	ctx.fillRect(100, 575, canvas.width - 200, 10);
	ctx.fillStyle = '#26aed4';
	ctx.fillRect(100, 575, 10.8 * (ratio * 100), 10);
	ctx.fillRect(0, 465, canvas.width, 10);

	//Progress bar time
	ctx.fillStyle = '#ffffff';
	ctx.font = '35px "Jakarta", "NotoSans"';
	ctx.fillText(
		formatTime(Math.ceil(globalThis.queue[guildId].player.position / 1000)),
		100,
		550
	);
	ctx.fillText(formatTime(current.length / 1000), canvas.width - 220, 550);
	//Position
	ctx.font = '70px "Jakarta", "NotoSans"';
	ctx.fillText(
		`${globalThis.queue[guildId].index + 1} / ${
			globalThis.queue[guildId].queue.length
		}`,
		canvas.width - 200,
		300
	);
	// ボタンの背景を描画
	ctx.fillStyle = '#e94560'; // ボタンの背景色を設定
	ctx.fillRect(550, 360, 200, 50); // ボタンの背景の位置とサイズを設定
	// ボタンのテキストを描画
	ctx.font = '30px "Jakarta", "NotoSans"'; // フォントの大きさとフォントファミリーを設定
	ctx.fillStyle = 'white'; // テキストの色を設定
	ctx.fillText(formatSource(current.sourceName), 555, 395); // テキストの位置を設定
	const buffer = canvas.toBuffer('image/png');
	return buffer;
}

function formatTitle(string, canvas) {
	const ctx = canvas.getContext('2d');
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

function formatAuthor(string, canvas) {
	const ctx = canvas.getContext('2d');
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

function formatRequester(string) {
	if (string.length > 8) {
		return string.slice(0, 8) + '...';
	}
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
