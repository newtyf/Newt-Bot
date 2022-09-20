const { SlashCommandBuilder } = require("discord.js");
// Require builders to formatter strings
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Replies with the link bot"),

  async execute(interaction, client) {
    const link = client.generateInvite({
      scopes: ['applications.commands']
    });
    console.log(`Generated application invite link: ${link}`);
    await interaction.reply(`!Yep¡, este es mi link para ser parte de tu servidor: ${bold(link)}`);
  },
};