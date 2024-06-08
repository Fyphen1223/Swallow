const {
	createMessageEmbed,
	createMusicEmbed,
	createButton,
} = require('../util/embed.js');
const { getLocale } = require('../lang/lang.js');
const guilds = require('../data/guilds.json');

module.exports = {
	data: {
		customId: 'resume',
	},
	execute: async (interaction) => {
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
		await globalThis.queue[guildId].player.resume();

		const embed = createMessageEmbed(
			getLocale(guilds[guildId].locale).vc.resumed,
			interaction
		);
		await interaction.editReply({ embeds: [embed] });
		const panel = await createMusicEmbed(guildId);
		try {
			await globalThis.queue[guildId].panel.edit({
				embeds: [panel.embed],
				components: createButton('resume'),
				files: [panel.file],
			});
		} catch (_) {
			await globalThis.queue[guildId].textChannel.send({
				embeds: [panel.embed],
				components: createButton('resume'),
				files: [panel.file],
			});
		}
		return;
	},
};
