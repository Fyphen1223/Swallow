const config = require('../../config.json');

const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed, updateEmbed } = require('../../util/embed.js');

const { SlashCommandBuilder } = require('discord.js');

const log = require('../../util/log.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('premium')
		.setDescription("Swallow's premium")
		.addSubcommand((subcommand) =>
			subcommand.setName('generate').setDescription('Generate premium')
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('redeem')
				.setDescription('Redeem premium')
				.addStringOption((option) =>
					option
						.setName('code')
						.setDescription('The code to redeem')
						.setRequired(true)
				)
		),
	info: {
		premium: false,
	},
	execute: async (interaction) => {
		const guildId = interaction.guild.id;
	},
};

function generateGiftCode() {
	let code = '';
	let chars = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
		'#',
		'$',
		'%',
		'&',
		'*',
		'+',
		'/',
		'=',
		'?',
	];
	for (let i = 0; i < 20; i++) {
		code += chars[Math.floor(Math.random() * chars.length)];
	}
	code = code.match(/.{1,4}/g).join('-');
	return code;
}
