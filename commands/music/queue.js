const config = require('../../config.json');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');

const guilds = require('../../data/guilds.json');

const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Control queue')
		.addSubcommand((subcommand) =>
			subcommand.setName('show').setDescription('Show the current queue')
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('remove')
				.setDescription('Remove a song from the queue')
				.addStringOption((option) =>
					option
						.setName('name')
						.setAutocomplete(true)
						.setDescription('The name of the song to remove')
						.setRequired(true)
				)
		),
	async autocomplete(interaction) {
		// handle the autocompletion response (more on how to do that below)
	},
	async execute(interaction) {
		await interaction.deferReply();

		const guildId = interaction.guild.id;
		if (!interaction.member.voice.channelId || !global.queue[guildId]) {
			const noValidVCEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noVC,
				interaction
			);
			await interaction.editReply({ embeds: [noValidVCEmbed] });
			return;
		}

		if (global.queue[guildId].voiceChannel) {
			if (
				global.queue[guildId].voiceChannel.id !==
				interaction.member.voice.channelId
			) {
				const differentVCEmbed = createMessageEmbed(
					getLocale(guilds[guildId].locale).vc.differentVC,
					interaction
				);
				await interaction.editReply({ embeds: [differentVCEmbed] });
				return;
			}
		}

		const subcommand = interaction.options.getSubcommand();
		switch (subcommand) {
			case 'show':
				// Show the current queue
				let content = '';
				if (global.queue[guildId].queue.length === 0) {
					const embed = new EmbedBuilder()
						.setColor(config.config.color.info)
						.setTitle('Queue')
						.setDescription('No music added to the queue.');
					await interaction.editReply({ embeds: [embed] });
				} else {
					content += `📀 ${
						global.queue[guildId].queue[global.queue[guildId].index].data.info
							.title
					}`;

					global.queue[guildId].queue.forEach((item, i) => {
						content += `\n${i + 1}: ${item.data.info.title}`;
					});
					const embed = new EmbedBuilder()
						.setColor(config.config?.color?.info || '#000000')
						.setTitle('Queue')
						.setDescription(codeBlock(content));

					await interaction.editReply({ embeds: [embed] });
				}
				break;
			case 'remove':
				// Remove a song from the queue
				break;
		}
	},
};
