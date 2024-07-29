const { Readable } = require('stream');

const { getLocale } = require('../lang/lang.js');
const log = require('./log.js');

const vosk = require('vosk');

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
		const audioStream = new Readable();
		audioStream.push(Buffer.from(voice.data, 'base64'));
		audioStream.push(null);

		const en = new vosk.Recognizer({ model: models.en, sampleRate: 48000 });
		en.setMaxAlternatives(2);
		en.setWords(true);
		audioStream.on('data', (chunk) => {
			if (en.acceptWaveform(chunk)) {
				return;
			} else {
				return;
			}
		});

		audioStream.on('end', () => {
			console.log(en.finalResult());
			en.free();
		});

		globalThis.queue[guildId].textChannel.send('You stopped speaking!');
		//ffmpeg -f s16le -ar 44100 -ac 2 -i output.pcm output.wav
	});
};

module.exports = listenEvents;

/*
function pcmToWav(pcmData, outputPath) {
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
*/
