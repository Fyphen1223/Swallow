const { getLocale } = require('../lang/lang.js');
const {
	createMessageEmbed,
	createMusicEmbed,
	createButton,
} = require('../util/embed.js');

module.exports = {
	data: {
		customId: 'pause',
	},
	execute: async (interaction) => {
		const guildId = interaction.guild.id;

		if (!interaction.member.voice.channelId) {
			const noValidVCEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.noVC,
				interaction
			);
			await interaction.reply({ embeds: [noValidVCEmbed] });
			return;
		}

		if (globalThis.queue[guildId].voiceChannel) {
			if (
				globalThis.queue[guildId].voiceChannel.id !==
				interaction.member.voice.channelId
			) {
				const differentVCEmbed = createMessageEmbed(
					getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
						.differentVC,
					interaction
				);
				await interaction.reply({ embeds: [differentVCEmbed] });
				return;
			}
		}

		if (globalThis.queue[guildId].player.status !== 'playing') {
			const notPlayingEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.noMusic,
				interaction
			);
			await interaction.reply({ embeds: [notPlayingEmbed] });
			return;
		}

		if (globalThis.queue[guildId].player.paused) {
			const alreadyPausedEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.alreadyPaused,
				interaction
			);
			await interaction.reply({ embeds: [alreadyPausedEmbed] });
			return;
		}

		if (globalThis.queue[guildId].player.status !== 'playing') {
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.notPlaying,
				interaction
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}

		await globalThis.queue[guildId].player.pause();
		const embed = createMessageEmbed(
			getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.paused,
			interaction
		);
		await globalThis.queue[guildId].player.get();
		await interaction.reply({ embeds: [embed] });
		const panel = await createMusicEmbed(guildId);
		try {
			await globalThis.queue[guildId].panel.edit({
				embeds: [panel.embed],
				components: createButton('pause', guildId),
				files: [panel.file],
			});
		} catch (_) {
			await globalThis.queue[guildId].textChannel.send({
				embeds: [panel.embed],
				components: createButton('pause', guildId),
				files: [panel.file],
			});
		}
		return;
	},
};
