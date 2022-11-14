const {Events} = require("discord.js")
const queueCommand = require("../commands/queue")

module.exports = {
	name: Events.InteractionCreate,
	execute(interaction, client) {
		if (interaction.isButton() && interaction.customId === "moreQueue") {
      if (!queueCommand.offset.reset) {
				queueCommand.offset.value += 10
			} else {
				queueCommand.offset.reset = false
			}
			queueCommand.execute(interaction, client)
    }
		if (!interaction.isButton() && interaction.commandName !== "queue") {
			queueCommand.offset.value = 0
			queueCommand.offset.reset = true
		};
	},
};