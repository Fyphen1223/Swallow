const log = require('../util/log');
const { createMessageEmbed } = require('../util/embed');

const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				log.error('No command found', true, true);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (err) {
				log.error(err.stack, true, true);
				const em = createMessageEmbed(
					'There was an error while executing this command!',
					interaction
				);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						embeds: [em],
						ephemeral: true,
					});
				} else {
					await interaction.reply({
						embeds: [em],
						ephemeral: true,
					});
				}
			}
		} else if (interaction.isAutocomplete()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				log.error(
					`No command matching ${interaction.commandName} was found.`,
					true,
					true
				);
				return;
			}

			try {
				await command.autocomplete(interaction);
			} catch (err) {
				log.error(err.stack, true, true);
			}
		} else if (interaction.isButton()) {
			const button = interaction.client.buttons.get(interaction.customId);

			if (!button) {
				log.error(
					`No button matching ${interaction.customId} was found.`,
					true,
					true
				);
				return;
			}

			try {
				await button.execute(interaction);
			} catch (err) {
				log.error(err.stack, true, true);
			}
		}
	},
};
