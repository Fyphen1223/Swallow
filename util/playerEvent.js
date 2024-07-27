const fs = require('node:fs');

const { getLocale } = require('../lang/lang.js');
const log = require('./log.js');

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
		fs.writeFileSync('./records/temp.pcm', Buffer.from(voice.data, 'base64'));
		globalThis.queue[guildId].textChannel.send('You stopped speaking!');
	});
};

module.exports = listenEvents;
