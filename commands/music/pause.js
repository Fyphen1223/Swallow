const { getLocale } = require('../../lang/lang.js');
const {
	createMessageEmbed,
	createMusicEmbed,
	createButton,
} = require('../../util/embed.js');

const guilds = require('../../data/guilds.json');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('pause').setDescription('Pause music'),
	info: {
		premium: false,
	},
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

		if (globalThis.queue[guildId].player.status !== 'playing') {
			const embed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.notPlaying,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}

		await globalThis.queue[guildId].player.pause();
		await globalThis.queue[guildId].player.get();
		const embed = createMessageEmbed(
			getLocale(guilds[guildId].locale).vc.paused,
			interaction
		);
		await interaction.editReply({ embeds: [embed] });
		const panel = await createMusicEmbed(guildId);
		try {
			await globalThis.queue[guildId].panel.edit({
				embeds: [panel.embed],
				components: createButton('pause'),
				files: [panel.file],
			});
		} catch (_) {
			await globalThis.queue[guildId].textChannel.send({
				embeds: [panel.embed],
				components: createButton('pause'),
				files: [panel.file],
			});
		}
		return;
	},
};
