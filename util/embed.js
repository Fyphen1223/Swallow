const config = require('../config.json');

const { generateMusicCard } = require('./card.js');
const { wait } = require('./time.js');

const { AttachmentBuilder } = require('discord.js');

function createMessageEmbed(content, interaction) {
	const embed = {
		color: parseInt(config.config?.color?.info || '#000000'.replace('#', ''), 16),
		author: {
			name: ` | ${content}`,
			icon_url: interaction ? interaction.user.avatarURL() : null,
			url: undefined,
		},
	};
	return embed;
}

async function createMusicEmbed(guildId, mode, type) {
	const current =
		globalThis.queue[guildId].queue[globalThis.queue[guildId].index].data.info;
	const file = new AttachmentBuilder(await generateMusicCard(current, guildId));
	const embed = {
		color: parseInt(config.config?.color?.info || '#000000'.replace('#', ''), 16),
		image: { url: 'attachment://file.jpg' },
	};
	return { embed, file };
}

function createButton(guildId) {
	const m = {
		data: { type: 1 },
		components: [
			{
				type: 2,
				emoji: {
					id: globalThis.queue[guildId].player.paused
						? '1117306258077257791'
						: '1117306256781230191',
				},
				custom_id: globalThis.queue[guildId].player.paused ? 'resume' : 'pause',
				style: 2,
			},
			{
				type: 2,
				emoji: { id: '1100927733116186694' },
				custom_id: 'stop',
				style: 2,
			},
			{
				type: 2,
				emoji: { id: '1117303043743039599' },
				custom_id: 'back',
				disabled: globalThis.queue[guildId].index === 0,
				style: 2,
			},
			{
				type: 2,
				emoji: { id: '1117303289365659648' },
				custom_id: 'skip',
				disabled:
					globalThis.queue[guildId].index ===
					globalThis.queue[guildId].queue.length - 1,
				style: 2,
			},
			{
				type: 2,
				emoji: { id: '1117304805237465138' },
				custom_id: 'queue',
				label: 'Queue',
				style: 2,
			},
		],
	};
	const o = {
		data: { type: 1 },
		components: [
			{
				type: 2,
				emoji: { id: '1117303628349313035' },
				custom_id: 'volumeDown',
				label: '-',
				style: 2,
			},
			{
				type: 2,
				emoji: { id: '1117304554216767558' },
				custom_id: 'volumeUp',
				label: '+',
				style: 2,
			},
			{
				type: 2,
				emoji: undefined,
				custom_id: 'lyric',
				label: 'Lyric',
				style: 2,
			},
			{
				type: 2,
				emoji: undefined,
				custom_id: '30m',
				label: '-30s',
				style: 2,
			},
			{
				type: 2,
				emoji: undefined,
				custom_id: '30p',
				label: '+30s',
				style: 2,
			},
		],
	};
	return [m, o];
}

async function updateEmbed(guildId) {
	const panel = await createMusicEmbed(guildId);
	while (globalThis.queue[guildId].pending) {
		await wait(100);
	}
	if (globalThis.queue[guildId].panel) {
		try {
			await globalThis.queue[guildId].panel.edit({
				embeds: [panel.embed],
				components: createButton(guildId),
				files: [panel.file],
			});
		} catch (_) {
			globalThis.queue[guildId].panel = await globalThis.queue[
				guildId
			].textChannel.send({
				embeds: [panel.embed],
				components: createButton(guildId),
				files: [panel.file],
			});
		}
	} else {
		await globalThis.queue[guildId].textChannel.send({
			embeds: [panel.embed],
			components: createButton(guildId),
			files: [panel.file],
		});
	}
}

module.exports = { createMessageEmbed, createMusicEmbed, createButton, updateEmbed };
