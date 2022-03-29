const { SlashCommandBuilder } = require("@discordjs/builders");
// Require builders to formatter strings
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName("user")
      .setDescription("Replies with the user information"),
  async execute(interaction) {
    await interaction.reply(`User tag: ${bold(interaction.user.tag)}\n${underscore('User Id:')} ${bold(interaction.user.id)}`);
  },
};