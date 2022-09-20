const { SlashCommandBuilder } = require("discord.js");
// Require builders to formatter strings
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName("user")
      .setDescription("Replies with the user information"),
  async execute(interaction) {
    await interaction.reply(`User tag: ${bold(interaction.user.tag)}\n${underscore('User Id:')} ${bold(interaction.user.id)}`);
  },
};