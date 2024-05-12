const config = require('../../config.json');

const { getLocale } = require('../../lang/lang.js');

const guilds = require('../../data/guilds.json');

const discord = require('discord.js');
const {
	SlashCommandBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music from a URL or search query')
		.addStringOption((option) =>
			option
				.setName('query')
				.setDescription('The URL or search query')
				.setAutocomplete(true)
				.setRequired(false)
		),
	async execute(interaction) {
		await interaction.deferReply();
		if (!interaction.member.voice.channelId) {
			const noValidVCEmbed = new discord.EmbedBuilder()
				.setColor(config.config?.color?.info || '#000000')
				.setAuthor({
					name: ` | 🚫 - ${
						getLocale(guilds[interaction.guild.id].locale).vc.noVC
					}`,
					iconURL: interaction.user.avatarURL({}),
				});
			await interaction.editReply({ embeds: [noValidVCEmbed] });
			return;
		}
	},
};
