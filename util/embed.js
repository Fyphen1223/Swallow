const config = require('../config.json');

const { formatTime } = require('./time.js');
const { generateMusicCard } = require('./card.js');

const {
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	AttachmentBuilder,
} = require('discord.js');

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
	const current =
		globalThis.queue[guildId].queue[globalThis.queue[guildId].index].data.info;
	let requester = '';
	if (
		globalThis.queue[guildId].queue[globalThis.queue[guildId].index].user ===
		'Auto Recommendation'
	) {
		requester = 'Auto Recommendation';
	} else {
		requester = `<@${
			globalThis.queue[guildId].queue[globalThis.queue[guildId].index].user.id
		}>`;
	}

	const position = globalThis.queue[guildId].player.position;
	const length = current.length;
	let ratio = 0;
	if (position == 0) {
		ratio = 1;
	} else {
		ratio = (position / length) * 100;
	}
	const file = new AttachmentBuilder(await generateMusicCard(current, guildId));
	const embed = new EmbedBuilder()
		.setColor(config.config?.color?.info || '#000000')
		.setImage('attachment://file.jpg');
	return { embed, file };
}

function createButton(style) {
	const main = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(style === 'pause' ? 'resume' : 'pause')
			.setLabel(style === 'pause' ? 'Resume' : 'Pause')
			.setEmoji(style === 'pause' ? '1117306256781230191' : '1117306258077257791')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('stop')
			.setLabel('Stop')
			.setEmoji('1100927733116186694')
			.setStyle(ButtonStyle.Danger),
		new ButtonBuilder()
			.setCustomId('back')
			.setLabel('Back')
			.setEmoji('1117303043743039599')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('skip')
			.setLabel('Skip')
			.setEmoji('1117303289365659648')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('addR')
			.setLabel('Add Relate')
			.setStyle(ButtonStyle.Secondary)
	);

	const other = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId('volumeDown')
			.setLabel('Down')
			.setEmoji('1117303628349313035')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('volumeUp')
			.setLabel('Up')
			.setEmoji('1117304554216767558')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('lyric')
			.setLabel('Lyric')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('queue')
			.setLabel('Queue')
			.setEmoji('1117304805237465138')
			.setStyle(ButtonStyle.Secondary)
	);

	const seek = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId('30m')
			.setLabel('-30s')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('30p')
			.setLabel('+30s')
			.setStyle(ButtonStyle.Secondary)
	);
	return [main, other, seek];
}

module.exports = { createMessageEmbed, createMusicEmbed, createButton };
