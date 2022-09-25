const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop music bot"),
  async execute(interaction, client) {
    try {
      const queue = client.player.getQueue(interaction.guild);

      queue.destroy();
      await interaction.reply(`Me desconecte`);
    } catch (error) {
      console.log(error.message);
      await interaction.reply(`No existe ningun bot conectado`);
    }
  },
};
