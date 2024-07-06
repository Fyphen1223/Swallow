const config = require('../config.json');

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
	const file = new AttachmentBuilder(await generateMusicCard(current, guildId));
	const embed = new EmbedBuilder()
		.setColor(config.config?.color?.info || '#000000')
		.setImage('attachment://file.jpg');
	return { embed, file };
}

function createButton(style, guildId) {
	const main = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(style === 'pause' ? 'resume' : 'pause')
			.setEmoji(style === 'pause' ? '1117306258077257791' : '1117306256781230191')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('stop')
			.setEmoji('1100927733116186694')
			.setStyle(ButtonStyle.Danger),
		new ButtonBuilder()
			.setCustomId('back')
			.setEmoji('1117303043743039599')
			.setDisabled(globalThis.queue[guildId].index === 0)
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('skip')
			.setEmoji('1117303289365659648')
			.setDisabled(
				globalThis.queue[guildId].index ===
					globalThis.queue[guildId].queue.length - 1
			)
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('queue')
			.setLabel('Queue')
			.setEmoji('1117304805237465138')
			.setStyle(ButtonStyle.Secondary)
	);

	const other = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId('volumeDown')
			.setLabel('-')
			.setEmoji('1117303628349313035')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('volumeUp')
			.setLabel('+')
			.setEmoji('1117304554216767558')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('lyric')
			.setLabel('Lyric')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('30m')
			.setLabel('-30s')
			.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
			.setCustomId('30p')
			.setLabel('+30s')
			.setStyle(ButtonStyle.Secondary)
	);
	return [main, other];
}

module.exports = { createMessageEmbed, createMusicEmbed, createButton };
