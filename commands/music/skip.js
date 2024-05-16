const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');

const guilds = require('../../data/guilds.json');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('skip').setDescription('Skip music'),
	async execute(interaction) {
		await interaction.deferReply();

		const guildId = interaction.guild.id;
		if (!interaction.member.voice.channelId || !globalThis.queue[guildId]) {
			const noValidVCEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noVC,
				interaction
			);
			await interaction.editReply({ embeds: [noValidVCEmbed] });
			return;
		}

		if (globalThis.queue[guildId].voiceChannel) {
			if (
				globalThis.queue[guildId].voiceChannel.id !==
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

		if (globalThis.queue[guildId].queue.length === 0) {
			const noMusicEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noMusic,
				interaction
			);
			await interaction.editReply({ embeds: [noMusicEmbed] });
			return;
		}

		const index = globalThis.queue[guildId].index + 1;
		globalThis.queue[guildId].previous =
			globalThis.queue[guildId].queue[globalThis.queue[guildId].index];

		if (index >= globalThis.queue[guildId].queue.length) {
			const embed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noMoreToSkip
			);
			globalThis.queue[guildId].textChannel.send({ embeds: [embed] });
			return;
		}

		globalThis.queue[guildId].index++;
		globalThis.queue[guildId].suppressEnd = true;
		globalThis.queue[guildId].player.position = 0;
		globalThis.queue[guildId].player.play({
			track: {
				encoded:
					globalThis.queue[guildId].queue[globalThis.queue[guildId].index].data
						.encoded,
			},
		});

		const skipEmbed = createMessageEmbed(
			getLocale(guilds[guildId].locale).vc.skipped
		);

		await interaction.editReply({ embeds: [skipEmbed] });
		return;
	},
};
