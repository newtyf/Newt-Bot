const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Sends a random gif!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The gif category")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply(
      `!Yepaaaa¡, este es mi link para ser parte de tu servidor`
    );
  },
};
