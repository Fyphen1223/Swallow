const { getLocale } = require('../../lang/lang.js');
const { createMessageEmbed } = require('../../util/embed.js');
const { checkVC, handleNotPlaying } = require('../../util/check.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('back').setDescription('Play previous music'),
	info: {
		premium: false,
	},
	async execute(interaction) {
		await interaction.deferReply();

		const guildId = interaction.guild.id;

		if (!(await checkVC(interaction))) return;
		if (await handleNotPlaying(interaction)) return;

		if (globalThis.queue[guildId].queue.length === 0) {
			const noMusicEmbed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.noMusic,
				interaction
			);
			await interaction.editReply({ embeds: [noMusicEmbed] });
			return;
		}

		const index = globalThis.queue[guildId].index - 1;
		globalThis.queue[guildId].previous =
			globalThis.queue[guildId].queue[globalThis.queue[guildId].index];

		if (index < 0) {
			const embed = createMessageEmbed(
				getLocale(globalThis.guilds.get(interaction.guildId).locale).vc
					.noMoreToBack
			);
			await interaction.editReply({ embeds: [embed] });
			return;
		}

		globalThis.queue[guildId].index--;
		globalThis.queue[guildId].suppressEnd = true;
		globalThis.queue[guildId].player.position = 0;
		globalThis.queue[guildId].player.play({
			track: {
				encoded:
					globalThis.queue[guildId].queue[globalThis.queue[guildId].index].data
						.encoded,
			},
		});

		const backEmbed = createMessageEmbed(
			getLocale(globalThis.guilds.get(interaction.guildId).locale).vc.backed
		);

		await interaction.editReply({ embeds: [backEmbed] });
		return;
	},
};
