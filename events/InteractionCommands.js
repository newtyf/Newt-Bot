// import exportCommands() of index
let c = require('../src/index')
const client = c.exportClient()
module.exports = {
	name: 'interactionCreate',
  // execute commands of commands files
	async execute(interaction) {
		if (!interaction.isCommand()) return;

	  const command = client.commands.get(interaction.commandName);

	  if (!command) return;

	  try {
	  	await command.execute(interaction);
	  } catch (error) {
	  	console.error(error);
	  	await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	  }
	},
};