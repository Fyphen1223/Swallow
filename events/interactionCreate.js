const fs = require('fs');

const config = require('../config.json');

const guilds = require('../data/guilds.json');
const log = require('../util/log');

const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(
				interaction.commandName
			);

			if (!command) {
				console.error(
					`No command matching ${interaction.commandName} was found.`
				);
				return;
			}

			if (!guilds[interaction.guildId]) {
				guilds[interaction.guildId] = {
					locale: 'en',
					config: {},
				};
				fs.writeFileSync(
					'./data/guilds.json',
					JSON.stringify(guilds, null, 4)
				);
				log.info(
					`Guild ${interaction.guildId} added to guilds.json`,
					config.config.log.debug,
					config.config.log.saveToFile
				);
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content:
							'There was an error while executing this command!',
						ephemeral: true,
					});
				} else {
					await interaction.reply({
						content:
							'There was an error while executing this command!',
						ephemeral: true,
					});
				}
			}
		} else if (interaction.isAutocomplete()) {
			const command = interaction.client.commands.get(
				interaction.commandName
			);

			if (!command) {
				console.error(
					`No command matching ${interaction.commandName} was found.`
				);
				return;
			}

			try {
				await command.autocomplete(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	},
};