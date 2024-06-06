const { getLocale } = require('../lang/lang.js');
const {
	createMessageEmbed,
	createMusicEmbed,
	createButton,
} = require('../util/embed.js');

const guilds = require('../data/guilds.json');

module.exports = {
	data: {
		customId: 'pause',
	},
	execute: async (interaction) => {
		const guildId = interaction.guild.id;

		if (!interaction.member.voice.channelId) {
			const noValidVCEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noVC,
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
					getLocale(guilds[guildId].locale).vc.differentVC,
					interaction
				);
				await interaction.reply({ embeds: [differentVCEmbed] });
				return;
			}
		}

		if (globalThis.queue[guildId].player.status !== 'playing') {
			const notPlayingEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.noMusic,
				interaction
			);
			await interaction.reply({ embeds: [notPlayingEmbed] });
			return;
		}

		if (globalThis.queue[guildId].player.paused) {
			const alreadyPausedEmbed = createMessageEmbed(
				getLocale(guilds[guildId].locale).vc.alreadyPaused,
				interaction
			);
			await interaction.reply({ embeds: [alreadyPausedEmbed] });
			return;
		}

		await globalThis.queue[guildId].player.get();
		await globalThis.queue[guildId].player.pause();
		const embed = createMessageEmbed(
			getLocale(guilds[guildId].locale).vc.paused,
			interaction
		);
		await interaction.reply({ embeds: [embed] });
		const panel = await createMusicEmbed(guildId);
		await globalThis.queue[guildId].panel.edit({
			embeds: [panel.embed],
			components: createButton('pause'),
			files: [panel.file],
		});
		return;
	},
};
