const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');
const { TextChannelAI } = require('../../util/ai.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Configure settings')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('lang')
				.setDescription('Change the language')
				.addStringOption((option) =>
					option
						.setName('language')
						.setDescription('The language to change to')
						.setRequired(true)
						.addChoices(
							{
								name: 'English',
								value: 'en',
							},
							{
								name: 'Japanese',
								value: 'ja',
							}
						)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand.setName('stt').setDescription('Enable or Disable Speech To Text')
		)
		.addSubcommand((subcommand) =>
			subcommand.setName('ai').setDescription('Enable or Disable Chat AI features')
		),
	info: {
		premium: false,
	},
	async execute(interaction) {
		await interaction.deferReply();
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === 'lang') {
			const language = interaction.options.getString('language');
			const current = globalThis.guilds.get(interaction.guildId);
			current.locale = language;
			globalThis.guilds.set(interaction.guildId, current);
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).config
					.langChanged,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}

		if (subcommand === 'stt') {
			const current = globalThis.guilds.get(interaction.guildId);
			current.stt = !current.stt;
			globalThis.guilds.set(interaction.guildId, current);
			if (!current.stt) {
				const embed = createMessageEmbed(
					getLocale(globalThis.guilds.get(interaction.guildId).locale).config
						.sttDisabled,
					interaction
				);

				if (
					globalThis.queue[interaction.guildId] &&
					globalThis.queue[interaction.guildId].player
				)
					await globalThis.queue[interaction.guildId].player.stopListen();
				await interaction.editReply({ embeds: [embed] });
			} else {
				const embed = createMessageEmbed(
					getLocale(globalThis.guilds.get(interaction.guildId).locale).config
						.sttEnabled,
					interaction
				);
				if (
					globalThis.queue[interaction.guildId] &&
					globalThis.queue[interaction.guildId].player
				)
					await globalThis.queue[interaction.guildId].player.startListen();
				await interaction.editReply({ embeds: [embed] });
			}
			return;
		}

		if (subcommand === 'ai') {
			const current = globalThis.guilds.get(interaction.guildId);
			if (!current.ai) {
				current.ai = interaction.channel.id;
				current.aiChannel = interaction.channel.id;
				globalThis.aiQueue.set(interaction.guildId, {
					channelId: interaction.channel.id,
					ai: new TextChannelAI({
						config: {
							model: 'phi3:14b',
						},
						guildId: interaction.guildId,
						textChannel: interaction.channel,
					}),
				});
				globalThis.guilds.set(interaction.guildId, current);
				const embed = createMessageEmbed(
					getLocale(globalThis.guilds.get(interaction.guildId).locale).config
						.aiEnabled,
					interaction
				);
				await interaction.editReply({ embeds: [embed] });
			} else {
				current.ai = false;
				current.aiChannel = false;
				try {
					globalThis.aiQueue.delete(interaction.guildId);
				} catch (_) {}
				const embed = createMessageEmbed(
					getLocale(globalThis.guilds.get(interaction.guildId).locale).config
						.aiDisabled,
					interaction
				);
				await interaction.editReply({ embeds: [embed] });
			}
			globalThis.guilds.set(interaction.guildId, current);
		}
	},
};
