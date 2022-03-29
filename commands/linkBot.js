const { SlashCommandBuilder } = require("@discordjs/builders");
// Require builders to formatter strings
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName("link")
      .setDescription("Replies with the link bot"),
  async execute(interaction) {
    const link = client.generateInvite({
      scopes: ['bot'],
    });
    console.log(`Generated application invite link: ${link}`);
    await interaction.reply(`!Yepaaaa¡, este es mi link para ser parte de tu servidor: ${bold(link)}`);
  },
};