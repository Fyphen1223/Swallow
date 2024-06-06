module.exports = {
	data: {
		customId: 'resume',
	},
	execute: async (interaction) => {
		const guildId = interaction.guild.id;
		console.log(globalThis.queue[guildId].player);
		await interaction.reply(`I'm resuming.`);
	},
};
