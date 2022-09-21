const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop music bot"),
  async execute(interaction, client, player) {
    try {
      const connection = getVoiceConnection(interaction.guildId);
      const queue = player.getQueue(interaction.guild);

      queue.destroy();
      connection.destroy();
      await interaction.reply(`Me desconecte`);
    } catch (error) {
      console.log(error.message);
      await interaction.reply(`No existe ningun bot conectado`);
    }
  },
};
