const config = require('../config.json');
const { getLocale } = require('../lang/lang.js');
const guilds = require('../data/guilds.json');

const { createMusicEmbed, createMessageEmbed, createButton } = require('./embed.js');

const listenEvents = async (guildId) => {
	globalThis.queue[guildId].player.on('start', async () => {
		globalThis.queue[guildId].player.status = 'playing';
		globalThis.queue[guildId].suppressEnd = false;
		const embed = await createMusicEmbed(guildId, 'Start');
		if (globalThis.queue[guildId].panel)
			return await globalThis.queue[guildId].panel.edit({
				embeds: [embed],
				components: createButton(),
			});
		globalThis.queue[guildId].panel = await globalThis.queue[
			guildId
		].textChannel.send({
			embeds: [embed],
			components: createButton(),
		});
	});
	globalThis.queue[guildId].player.on('end', async (data) => {
		if (queue[guildId].suppressEnd) return;
		const index = globalThis.queue[guildId].index + 1;
		globalThis.queue[guildId].previous =
			globalThis.queue[guildId].queue[globalThis.queue[guildId].index];
		globalThis.queue[guildId].player.status = 'finished';
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
					getLocale(guilds[guildId]).vc.queueEnded
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
};

module.exports = listenEvents;
