const { SlashCommandBuilder } = require("discord.js");
const {
  getVoiceConnection,
} = require("@discordjs/voice");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop music bot"),
  async execute(interaction) {
    try {
      const connection = getVoiceConnection(interaction.guildId);
      connection.destroy()
    } catch (error) {
      console.log(error.message);
    }
    await interaction.reply(`Me desconecte`);
  },
};
