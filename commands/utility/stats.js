const os = require('os');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Show the stats of this bot'),
	info: {
		premium: false,
	},
	async execute(interaction) {
		await interaction.deferReply();

		const embed = new EmbedBuilder().addFields(
			{
				name: 'Total Memory',
				value: `${Math.ceil(os.totalmem() / 1024 / 1024)} MB`,
				inline: true,
			},
			{
				name: 'Free Memory',
				value: `${Math.ceil(os.freemem() / 1024 / 1024)} MB`,
				inline: true,
			},
			{
				name: 'Used Memory',
				value: `${Math.ceil((os.totalmem() - os.freemem()) / 1024 / 1024)} MB`,
				inline: true,
			},
			{ name: 'CPU Core Count', value: `${os.cpus().length}`, inline: false },
			{ name: 'CPU Model', value: `${os.cpus()[0].model}`, inline: true }
		);

		await interaction.editReply({ embeds: [embed] });
	},
};
