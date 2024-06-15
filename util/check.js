const { createMessageEmbed } = require('./embed');
const { getLocale } = require('../lang/lang');

async function checkVC(interaction) {
	const guildId = interaction.guild.id;
	if (!interaction.member.voice.channelId || !globalThis.queue[guildId]) {
		const noValidVCEmbed = createMessageEmbed(
			getLocale(globalThis.guilds.get(guildId).locale).vc.noVC,
			interaction
		);
		if (!interaction.isReplied())
			await interaction.reply({ embeds: [noValidVCEmbed] });
		await interaction.editReply({ embeds: [noValidVCEmbed] });
		return false;
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
			if (!interaction.isReplied())
				await interaction.reply({ embeds: [differentVCEmbed] });
			await interaction.editReply({ embeds: [differentVCEmbed] });
			return false;
		}
		return true;
	}
	return true;
}

module.exports = { checkVC };
