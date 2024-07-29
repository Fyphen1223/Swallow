const { Readable } = require('stream');
const fs = require('fs');

const { getLocale } = require('../lang/lang.js');
const log = require('./log.js');

const vosk = require('vosk');
const WavEncoder = require('wav-encoder');
const wav = require('wav');

vosk.setLogLevel(1);

const models = {
	en: new vosk.Model('./models/en'),
	//ja: new vosk.Model('./models/ja'),
};

const { createMusicEmbed, createMessageEmbed, createButton } = require('./embed.js');

const listenEvents = async (guildId) => {
	globalThis.queue[guildId].player.removeAllListeners();
	if (globalThis.guilds.get(guildId).stt) {
		await globalThis.queue[guildId].player.startListen();
	} else {
		await globalThis.queue[guildId].player.stopListen();
	}

	globalThis.queue[guildId].player.on('start', async () => {
		if (globalThis.queue[guildId].isTTS) return;
		globalThis.queue[guildId].suppressEnd = false;
		globalThis.queue[guildId].pending = true;
		await globalThis.queue[guildId].player.get();
		const embed = await createMusicEmbed(guildId, 'Start');
		if (globalThis.queue[guildId].panel) {
			try {
				const d = await Promise.all([
					globalThis.queue[guildId].panel.delete(),
					globalThis.queue[guildId].textChannel.send({
						embeds: [embed.embed],
						components: createButton(guildId),
						files: [embed.file],
					}),
				]);
				globalThis.queue[guildId].panel = d[1];
			} catch (_) {}
			return;
		} else {
			try {
				globalThis.queue[guildId].panel = await globalThis.queue[
					guildId
				].textChannel.send({
					embeds: [embed.embed],
					components: await createButton(guildId),
					files: [embed.file],
				});
			} catch (err) {
				log.error(err.stack);
			}
		}
		globalThis.queue[guildId].pending = false;
	});
	globalThis.queue[guildId].player.on('end', async () => {
		if (queue[guildId].suppressEnd || queue[guildId].isTTS) return;
		const index = globalThis.queue[guildId].index + 1;
		globalThis.queue[guildId].previous =
			globalThis.queue[guildId].queue[globalThis.queue[guildId].index];
		if (index >= globalThis.queue[guildId].queue.length) {
			if (globalThis.queue[guildId].autoReplay) {
				globalThis.queue[guildId].index = 0;
				globalThis.queue[guildId].player.play({
					track: {
						encoded:
							globalThis.queue[guildId].queue[
								globalThis.queue[guildId].index
							].data.encoded,
					},
				});
			} else if (globalThis.queue[guildId].autoPlay) {
				//Do auto play stuff here
			} else {
				const embed = createMessageEmbed(
					getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
						.queueEnded
				);
				globalThis.queue[guildId].textChannel.send({ embeds: [embed] });
			}
		} else {
			globalThis.queue[guildId].index++;
			globalThis.queue[guildId].player.play({
				track: {
					encoded:
						globalThis.queue[guildId].queue[globalThis.queue[guildId].index]
							.data.encoded,
				},
			});
		}
	});

	globalThis.queue[guildId].player.on('startSpeaking', async (voice) => {
		if (!globalThis.guilds.get(guildId).stt) return;
		globalThis.queue[guildId].textChannel.send('Listening to your voice...');
	});
	globalThis.queue[guildId].player.on('endSpeaking', async (voice) => {
		if (!globalThis.guilds.get(guildId).stt) return;

		fs.writeFileSync(
			'./records/output.wav',
			pcmToWav(Buffer.from(voice.data, 'base64'), 2, 48000, 16)
		);

		const audioStream = new Readable();
		audioStream.push(pcmToWav(Buffer.from(voice.data, 'base64'), 2, 48000, 16));
		audioStream.push(null);

		const wfReader = new wav.Reader();
		const wfReadable = new Readable().wrap(wfReader);

		wfReader.on('format', async ({ audioFormat, sampleRate, channels }) => {
			if (audioFormat != 1 || channels != 1) {
				console.error('Audio file must be WAV format mono PCM.');
				process.exit(1);
			}
			const rec = new vosk.Recognizer({ model: models.en, sampleRate: sampleRate });
			rec.setMaxAlternatives(10);
			rec.setWords(true);
			for await (const data of wfReadable) {
				const end_of_speech = rec.acceptWaveform(data);
				if (end_of_speech) {
					console.log(JSON.stringify(rec.result(), null, 4));
				}
			}
			console.log(JSON.stringify(rec.finalResult(), null, 4));
			rec.free();
		});

		audioStream.pipe(wfReader);
		globalThis.queue[guildId].textChannel.send('You stopped speaking!');
		//ffmpeg -f s16le -ar 44100 -ac 2 -i output.pcm output.wav
	});
};

module.exports = listenEvents;

function writeWav(pcmData, outputPath) {
	if (!Buffer.isBuffer(pcmData)) {
		throw new Error('pcmData must be a Buffer');
	}

	const numChannels = 2; // Mono
	const sampleRate = 48000; // 48kHz
	const bitsPerSample = 16; // 16-bit

	const writer = new wav.FileWriter(outputPath, {
		channels: numChannels,
		sampleRate: sampleRate,
		bitDepth: bitsPerSample,
	});

	writer.write(pcmData);
	writer.end();
}

/**
 * 2チャンネルのPCMデータを1チャンネルに変換する関数
 * @param {Buffer} stereoBuffer - ステレオのPCMデータ
 * @returns {Buffer} モノラルに変換されたPCMデータ
 */
function convertStereoToMono(stereoBuffer) {
	// モノラルデータ用のバッファを作成
	const monoBuffer = Buffer.alloc(stereoBuffer.length / 2);

	// 16ビットPCMデータを処理するために2バイトずつ読み込む
	for (let i = 0, j = 0; i < stereoBuffer.length; i += 4, j += 2) {
		// 左右のチャンネルを読み取る
		const left = stereoBuffer.readInt16LE(i);
		const right = stereoBuffer.readInt16LE(i + 2);

		// 左右チャンネルの平均を取ってモノラルに変換
		const mono = Math.round((left + right) / 2);

		// モノラルデータを書き込む
		monoBuffer.writeInt16LE(mono, j);
	}

	return monoBuffer;
}

// PCMデータをWAVデータに変換する関数
function pcmToWav(pcmBuffer, numChannels, sampleRate, bitsPerSample) {
	const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
	const blockAlign = (numChannels * bitsPerSample) / 8;
	const wavHeader = Buffer.alloc(44);

	// RIFFヘッダー
	wavHeader.write('RIFF', 0); // ChunkID
	wavHeader.writeUInt32LE(36 + pcmBuffer.length, 4); // ChunkSize
	wavHeader.write('WAVE', 8); // Format

	// fmtチャンク
	wavHeader.write('fmt ', 12); // Subchunk1ID
	wavHeader.writeUInt32LE(16, 16); // Subchunk1Size
	wavHeader.writeUInt16LE(1, 20); // AudioFormat (PCM)
	wavHeader.writeUInt16LE(numChannels, 22); // NumChannels
	wavHeader.writeUInt32LE(sampleRate, 24); // SampleRate
	wavHeader.writeUInt32LE(byteRate, 28); // ByteRate
	wavHeader.writeUInt16LE(blockAlign, 32); // BlockAlign
	wavHeader.writeUInt16LE(bitsPerSample, 34); // BitsPerSample

	// dataチャンク
	wavHeader.write('data', 36); // Subchunk2ID
	wavHeader.writeUInt32LE(pcmBuffer.length, 40); // Subchunk2Size

	return Buffer.concat([wavHeader, pcmBuffer]);
}
