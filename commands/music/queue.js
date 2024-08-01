const config = require('../../config.json');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');
const { checkVC } = require('../../util/check.js');

const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require('discord.js');
const { wait } = require('../../util/time.js');

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
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('artwork')
				.setDescription('Show the artwork of the current song')
		)
		.addSubcommand((subcommand) =>
			subcommand.setName('purge').setDescription('Purge the queue')
		),
	info: {
		premium: false,
	},
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		if (!globalThis.queue[interaction.guild.id]) return;
		if (!globalThis.queue[interaction.guild.id].voiceChannel) return;
		const list = globalThis.queue[interaction.guild.id].getTitles();
		const result = list.filter((item) => item.includes(focusedValue));
		if (result.length > 24) result.length = 24;
		await interaction.respond(
			result.map((choice) => ({ name: choice, value: choice }))
		);
	},
	async execute(interaction) {
		await interaction.deferReply();

		if (!(await checkVC(interaction))) return;

		const subcommand = interaction.options.getSubcommand();
		const guildId = interaction.guild.id;

		switch (subcommand) {
			case 'show':
				// Show the current queue
				let content = '';
				if (globalThis.queue[interaction.guild.id].queue.length === 0) {
					const embed = {
						title: 'Queue',
						description: 'No music added to the queue.',
						color: parseInt(
							config.config?.color?.info || '#000000'.replace('#', ''),
							16
						),
					};
					await interaction.editReply({ embeds: [embed] });
				} else {
					content += `📀 ${
						globalThis.queue[guildId].queue[globalThis.queue[guildId].index]
							.data.info.title
					} by ${
						globalThis.queue[guildId].queue[globalThis.queue[guildId].index]
							.data.info.author
					}`;

					globalThis.queue[guildId].queue.forEach((item, i) => {
						content += `\n${i + 1}: ${item.data.info.title} by ${
							item.data.info.author
						}`;
					});
					const embed = {
						title: 'Queue',
						description: '```' + content + '```',
						color: parseInt(
							config.config?.color?.info || '#000000'.replace('#', ''),
							16
						),
					};

					await interaction.editReply({ embeds: [embed] });
				}
				break;
			case 'remove':
				const list = globalThis.queue[guildId].getTitles();
				const query = interaction.options.getString('name');
				const index = list.indexOf(query);

				if (index === -1) {
					const embed = createMessageEmbed(
						getLocale(globalThis.guilds.get(guildId).locale).vc.notFound,
						interaction
					);
					await interaction.editReply({ embeds: [embed] });
					break;
				}

				if (globalThis.queue[guildId].index === index) {
					const embed = createMessageEmbed(
						getLocale(globalThis.guilds.get(guildId).locale).vc
							.currentlyPlaying,
						interaction
					);
					await interaction.editReply({ embeds: [embed] });
					break;
				}

				globalThis.queue[guildId].remove(index);
				const removeEmbed = createMessageEmbed(
					getLocale(globalThis.guilds.get(interaction.guild.id).locale).vc
						.removed,
					interaction
				);

				if (globalThis.queue[guildId].index >= index) {
					globalThis.queue[guildId].index--;
				}

				await interaction.editReply({ embeds: [removeEmbed] });
				break;
			case 'artwork':
				const artWork = new EmbedBuilder()
					.setColor(config.config.color.info)
					.setImage(
						globalThis.queue[guildId].queue[globalThis.queue[guildId].index]
							.data.info.artworkUrl
					);
				/*
				const urlButton = new ButtonBuilder()
					.setURL(
						globalThis.queue[guildId].queue[globalThis.queue[guildId].index]
							.data.info.uri
					)
					.setLabel('Open')
					.setStyle(ButtonStyle.Link);
				*/
				await interaction.editReply({
					embeds: [artWork],
					//	components: [urlButton],
				});
				break;
			case 'purge':
				const guildId = interaction.guild.id;
				if (!globalThis.queue[guildId].player.track) {
					const embed = createMessageEmbed(
						getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
							.notPlaying,
						interaction
					);
					await interaction.editReply({ embeds: [embed] });
					return;
				}

				do {
					await wait(100);
				} while (globalThis.queue[guildId].pending);
				globalThis.queue[guildId].suppressEnd = true;
				const embed = createMessageEmbed(
					getLocale(globalThis.guilds.get(interaction.guild.id).locale).vc
						.purged,
					interaction
				);
				Promise.all([
					interaction.editReply({ embeds: [embed] }),
					globalThis.queue[guildId].player.stop(),
				]);
				globalThis.queue[guildId].queue = [];
				globalThis.queue[guildId].index = 0;

				globalThis.queue[guildId].panel.delete();
				globalThis.queue[guildId].panel = null;
				break;
		}
		return;
	},
};
