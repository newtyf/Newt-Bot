const { SlashCommandBuilder } = require("@discordjs/builders");
// Require builders to formatter strings
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName("server")
      .setDescription("Replies with the server information"),
  async execute(interaction) {
    await interaction.reply(`Server name: ${bold(interaction.guild.name)}\nthe members conunt: ${bold(interaction.guild.memberCount)}`);
  },
};