const log = require('../util/log');
const { createMessageEmbed } = require('../util/embed');
const { TextChannelAI } = require('../util/ai');

const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;
		if (message.channel.type === 'dm') return;

		if (globalThis.guilds.get(message.guild.id).aiChannel !== message.channel.id)
			return;

		if (
			globalThis.guilds.get(message.guild.id).ai &&
			!globalThis.aiQueue.has(message.guild.id)
		) {
			globalThis.aiQueue.set(message.guildId, {
				channelId: globalThis.guilds.get(message.guild.id).aiChannel,
				ai: new TextChannelAI({
					config: {
						model: 'phi3:14b',
					},
					guildId: message.guildId,
					textChannel: message.channel,
				}),
			});
		}
		if (!message.content) return;
		if (!globalThis.aiQueue.has(message.guild.id)) return;
		const ai = globalThis.aiQueue.get(message.guild.id);
		if (message.channel.id !== ai.channelId) return;
		const text = await ai.ai.generate(message.content);
		if (!text) return;
		await message.channel.send(text);
	},
};
