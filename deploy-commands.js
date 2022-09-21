const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, environment } = require('./config.json');

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

commandFiles.forEach(file => {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
})

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		if (environment === "production") {
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);
		} else {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId), // => this function is only for commands that were created on the server
				// Routes.applicationCommands(clientId), => this function is for global commands
				{ body: commands },
			);
		}

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();