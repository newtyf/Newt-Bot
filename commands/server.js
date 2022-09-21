const { SlashCommandBuilder } = require("discord.js");
// Require builders to formatter strings
const { bold } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with the server information"),
  async execute(interaction) {
    await interaction.reply(
      `Server name: ${bold(interaction.guild.name)}\nthe members conunt: ${bold(
        interaction.guild.memberCount
      )}`
    );
  },
};
