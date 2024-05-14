const config = require('../config.json');

const { formatTime } = require('./time.js');

const { EmbedBuilder } = require('discord.js');

function createMessageEmbed(content, interaction) {
	const embed = new EmbedBuilder()
		.setColor(config.config?.color?.info || '#000000')
		.setAuthor({
			name: ` | ${content}`,
			iconURL: interaction ? interaction.user.avatarURL() : null,
		});
	return embed;
}

async function createMusicEmbed(guildId, mode, type) {
	const current = global.queue[guildId].queue[global.queue[guildId].index].data.info;
	let requester = '';
	if (
		global.queue[guildId].queue[global.queue[guildId].index].user ===
		'Auto Recommendation'
	) {
		requester = 'Auto Recommendation';
	} else {
		requester = `<@${queue[guildId].queue[queue[guildId].index].user.id}>`;
	}
	await global.queue[guildId].player.get();
	const embed = new EmbedBuilder()
		.setColor(config.config?.color?.info || '#000000')
		.addFields(
			{
				name: 'Author',
				value: current.author,
				inline: true,
			},
			{
				name: 'Title',
				value: current.title,
				inline: true,
			},
			{
				name: 'Duration',
				value: `${formatTime(
					Math.floor(global.queue[guildId].player.position / 1000)
				)}/${formatTime(Math.floor(current.length / 1000))}`,
				inline: true,
			},
			{
				name: 'Requested by',
				value: requester,
				inline: true,
			},
			{
				name: 'Volume',
				value: `${queue[guildId].volume}%`,
				inline: true,
			},
			{
				name: 'Position',
				value: `${global.queue[guildId].index + 1}/${
					global.queue[guildId].queue.length
				}`,
				inline: true,
			}
		)
		.setImage(current.artworkUrl);
	return embed;
}

module.exports = { createMessageEmbed, createMusicEmbed };
