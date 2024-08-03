const { createMessageEmbed } = require('./embed');
const { getLocale } = require('../lang/lang');

async function checkVC(interaction) {
	const guildId = interaction.guild.id;
	if (!interaction.member.voice.channelId) {
		const noValidVCEmbed = createMessageEmbed(
			getLocale(globalThis.guilds.get(guildId).locale).vc.noVC,
			interaction
		);
		if (!interaction.isReplied && !interaction.deferred) {
			await interaction.reply({ embeds: [noValidVCEmbed] });
			return false;
		} else {
			await interaction.editReply({ embeds: [noValidVCEmbed] });
			return false;
		}
	}

	if (!globalThis.queue[guildId]) {
		const noPlayerEmbed = createMessageEmbed(
			getLocale(globalThis.guilds.get(guildId).locale).vc.noPlayer,
			interaction
		);

		if (!interaction.isReplied && !interaction.deferred) {
			interaction.reply({ embeds: [noPlayerEmbed] });
		} else {
			interaction.editReply({ embeds: [noPlayerEmbed] });
		}

		return false;
	}

	if (globalThis.queue[guildId].voiceChannel) {
		if (
			globalThis.queue[guildId].voiceChannel.id !==
			interaction.member.voice.channelId
		) {
			const differentVCEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(guildId).locale).vc.differentVC,
				interaction
			);
			if (!interaction.isReplied && !interaction.deferred) {
				await interaction.reply({ embeds: [differentVCEmbed] });
				return false;
			} else {
				await interaction.editReply({ embeds: [differentVCEmbed] });
				return false;
			}
		}
		return true;
	}
	return true;
}

async function handleNotPlaying(interaction) {
	if (!interaction) return;
	const guildId = interaction.guild.id;
	if (!globalThis.queue[guildId].player) {
		const embed = createMessageEmbed(
			getLocale(globalThis.guilds.get(guildId).locale).vc.notPlaying,
			interaction
		);
		if (!interaction.isReplied && !interaction.deferred) {
			await interaction.reply({ embeds: [embed] });
		} else {
			await interaction.editReply({ embeds: [embed] });
		}
		return true;
	}

	if (!globalThis.queue[guildId].player.track) {
		const embed = createMessageEmbed(
			getLocale(globalThis.guilds.get(guildId).locale).vc.notPlaying,
			interaction
		);
		if (!interaction.isReplied && !interaction.deferred) {
			await interaction.reply({ embeds: [embed] });
		} else {
			await interaction.editReply({ embeds: [embed] });
		}
		return true;
	}
	return false;
}

async function checkVCMessage(message) {
	const guildId = message.guild.id;
	if (!message.member.voice.channelId) {
		const noValidVCEmbed = createMessageEmbed(
			getLocale(globalThis.guilds.get(guildId).locale).vc.noVC
		);
		await interaction.reply({ embeds: [noValidVCEmbed] });
		return false;
	}

	if (!globalThis.queue[guildId]) {
		const noPlayerEmbed = createMessageEmbed(
			getLocale(globalThis.guilds.get(guildId).locale).vc.noPlayer
		);
		interaction.reply({ embeds: [noPlayerEmbed] });
		return false;
	}

	if (globalThis.queue[guildId].voiceChannel) {
		if (
			globalThis.queue[guildId].voiceChannel.id !== message.member.voice.channelId
		) {
			const differentVCEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(guildId).locale).vc.differentVC
			);
			await interaction.editReply({ embeds: [differentVCEmbed] });
			return false;
		}
		return true;
	}
	return true;
}

module.exports = { checkVC, handleNotPlaying };
