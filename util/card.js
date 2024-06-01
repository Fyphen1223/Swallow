const { formatTime } = require('./time');

const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
GlobalFonts.registerFromPath('./assets/fonts/FiraCode-Light.ttf', 'FiraCode');
GlobalFonts.registerFromPath('./assets/fonts/Nunito.ttf', 'Nunito');
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
		height: 160 * 2,
		cropCenter: true,
		borderRadius: 10,
	});
	const image = await loadImage(thumbnailImage);
	ctx.drawImage(image, 10 * 2, 10 * 2);

	ctx.font = '50px "Jakarta", "FiraCode", "NotoSansJP", "Arial"';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(formatTitle(current.title) || 'Title', 200 * 2, 45 * 2);
	ctx.fillText(formatAuthor(current.author) || 'Author', 240 * 2, 90 * 2);
	ctx.fillStyle = '#26aed4';
	ctx.fillText('by', 200 * 2, 90 * 2);

    

	ctx.fillStyle = '#646464';
	ctx.fillRect(100, 575, canvas.width - 200, 10);

	ctx.fillStyle = '#26aed4';
	ctx.fillRect(100, 575, 200, 10);

	ctx.fillStyle = '#ffffff';
	ctx.font = '35px "Jakarta", "FiraCode", "NotoSansJP", "Arial"';
	ctx.fillText(formatTime(globalThis.queue[guildId].player.position / 1000), 100, 550);

	ctx.fillText(formatTime(current.length / 1000), canvas.width - 220, 550);

	ctx.font = '70px "Jakarta", "FiraCode", "NotoSansJP", "Arial"';
	ctx.fillText(
		`${globalThis.queue[guildId].index + 1} / ${
			globalThis.queue[guildId].queue.length
		}`,
		canvas.width - 200,
		300
	);

	const buffer = canvas.toBuffer('image/png');

	return buffer;
}

function formatTitle(string) {
	if (string.length > 15) {
		return string.slice(0, 15) + '...';
	}
	return string;
}

function formatAuthor(string) {
	if (string.length > 13) {
		return string.slice(0, 13) + '...';
	}
	return string;
}

module.exports = { generateMusicCard };

/*

	return await Dynamic({
		thumbnailImage:
			options?.thumbnailImage ||
			'https://www.sunloft.co.jp/dx/wp-content/uploads/2021/11/91d2b179414b6226db466fc3a8491c57.jpg',
		backgroundColor: '#070707',
		progress: options?.position || 0,
		progressColor: '#26aed4',
		progressBarColor: '#2458ab',
		name: options?.title || 'Unknown',
		nameColor: '#a4e3f5',
		author: options?.author || 'Unknown',
		authorColor: '#696969',
	});

*/
