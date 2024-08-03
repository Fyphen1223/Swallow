const config = require('../config.json');

const { Readable } = require('stream');

const log = require('./log.js');
const { createMusicEmbed, createMessageEmbed, createButton } = require('./embed.js');

if (config.stt.enabled) {
	var vosk = require('vosk');
	var wav = require('wav');

	vosk.setLogLevel(-1);

	var models = {
		en: './models/en',
		ja: './models/ja',
	};
}

async function handleSpeak(voice, guildId) {
	if (!voice.data) return;
	if (!globalThis.guilds.get(guildId).stt) return;

	const monoBuffer = convertStereoToMono(Buffer.from(voice.data, 'base64'));
	const wavHeader = createWavHeader(monoBuffer.length);
	const wavBuffer = Buffer.concat([wavHeader, monoBuffer]);

	const audioStream = new Readable();
	audioStream.push(wavBuffer);
	audioStream.push(null);

	const wfReader = new wav.Reader();
	const wfReadable = new Readable().wrap(wfReader);

	wfReader.on('format', async ({ audioFormat, _, channels }) => {
		if (audioFormat != 1 || channels != 1) {
			log.error('Audio file must be WAV format mono PCM.');
		}

		const model = new vosk.Model(models[globalThis.guilds.get(guildId).locale]);
		const recognizer = new vosk.Recognizer({
			model: model,
			sampleRate: 48000,
		});

		recognizer.setMaxAlternatives(2);
		recognizer.setWords(true);

		for await (const data of wfReadable) {
			recognizer.acceptWaveform(data);
		}
		const res = recognizer.finalResult();
		recognizer.free();
		model.free();
		const user = await globalThis.discordClient.users.cache.get(voice.userId);
		await globalThis.queue[guildId].textChannel.send(
			`${user.globalName}: ${res.alternatives[0].text}`
		);
		return res.alternatives[0].text;
	});

	audioStream.pipe(wfReader);
}

function convertStereoToMono(stereoBuffer) {
	const monoBuffer = Buffer.alloc(stereoBuffer.length / 2);
	for (let i = 0; i < stereoBuffer.length; i += 4) {
		const left = stereoBuffer.readInt16LE(i);
		const right = stereoBuffer.readInt16LE(i + 2);
		const mono = (left + right) / 2;
		monoBuffer.writeInt16LE(mono, i / 2);
	}
	return monoBuffer;
}

function createWavHeader(dataSize) {
	const header = Buffer.alloc(44);
	header.write('RIFF', 0);
	header.writeUInt32LE(36 + dataSize, 4);
	header.write('WAVE', 8);
	header.write('fmt ', 12);
	header.writeUInt32LE(16, 16);
	header.writeUInt16LE(1, 20);
	header.writeUInt16LE(1, 22);
	header.writeUInt32LE(48000, 24);
	header.writeUInt32LE(48000 * 2, 28);
	header.writeUInt16LE(2, 32);
	header.writeUInt16LE(16, 34);
	header.write('data', 36);
	header.writeUInt32LE(dataSize, 40);
	return header;
}

module.exports = { handleSpeak };
