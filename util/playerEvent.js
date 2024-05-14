const config = require('../config.json');
const { getLocale } = require('../lang/lang.js');
const guilds = require('../data/guilds.json');

const { createMusicEmbed, createMessageEmbed, createButton } = require('./embed.js');

const listenEvents = async (guildId) => {
	global.queue[guildId].player.on('start', async () => {
		global.queue[guildId].player.status = 'playing';
		global.queue[guildId].suppressEnd = false;
		const embed = await createMusicEmbed(guildId, 'Start');
		if (global.queue[guildId].panel) global.queue[guildId].panel.delete();
		global.queue[guildId].panel = await global.queue[guildId].textChannel.send({
			embeds: [embed],
			components: createButton(),
		});
	});
	global.queue[guildId].player.on('end', async (data) => {
		if (queue[guildId].suppressEnd) return;
		const index = global.queue[guildId].index + 1;
		global.queue[guildId].previous =
			global.queue[guildId].queue[global.queue[guildId].index];
		global.queue[guildId].player.status = 'finished';
		if (index >= global.queue[guildId].queue.length) {
			if (global.queue[guildId].autoReplay) {
				//Do replay things
			} else if (global.queue[guildId].autoPlay) {
				//Do auto play stuff here
			} else {
				const embed = createMessageEmbed(
					getLocale(guilds[guildId]).vc.queueEnded
				);
				global.queue[guildId].textChannel.send({ embeds: [embed] });
			}
		} else {
			global.queue[guildId].index++;
			global.queue[guildId].player.play({
				track: {
					encoded:
						global.queue[guildId].queue[global.queue[guildId].index].data
							.encoded,
				},
			});
		}
	});
};

module.exports = listenEvents;
