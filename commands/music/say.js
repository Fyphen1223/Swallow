const config = require('../../config.json');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed, updateEmbed } = require('../../util/embed.js');

const { SlashCommandBuilder } = require('discord.js');
const listenEvents = require('../../util/playerEvent.js');

const log = require('../../util/log.js');
const { checkVC } = require('../../util/check.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Let me say some things')
		.addStringOption((option) =>
			option.setName('query').setDescription('Things to say').setRequired(true)
		),
	info: {
		premium: false,
	},
	async execute(interaction) {
		const guildId = interaction.guild.id;
		if (!globalThis.queue[guildId]) {
			globalThis.queue.add(guildId);
			globalThis.queue[guildId].node = globalThis.Tsumi.getIdealNode();
		}

		if (!(await checkVC(interaction))) return;

		if (globalThis.queue[guildId].player.track) {
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.alreadyPlaying,
				interaction
			);
			await interaction.reply({ embeds: [embed] });
			return;
		}

		const query = interaction.options.getString('query');

		if (!globalThis.queue[guildId].voiceChannel) {
			globalThis.queue[guildId].textChannel = interaction.channel;
			globalThis.queue[guildId].voiceChannel = interaction.member.voice.channel;
			globalThis.queue[guildId].player = await globalThis.queue[
				guildId
			].node.joinVoiceChannel({
				guildId: guildId,
				channelId: interaction.member.voice.channelId,
				options: {
					deaf: true,
					mute: false,
				},
			});
			listenEvents(guildId);
		}

		globalThis.queue[guildId].isTTS = true;

		const r = await globalThis.queue[guildId].node.loadTTS(query, 'Max');

		await globalThis.queue[guildId].player.play({
			track: { encoded: r.data.encoded },
		});
		return;
	},
};
