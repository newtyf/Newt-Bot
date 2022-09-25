const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pinga")
    .setDescription("Una sorpresilla"),
  async execute(interaction) {
    const embebedImage = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Lo que te encanta mamawebo!")
      .setImage(
        "https://cdn.discordapp.com/attachments/761257148561883156/1023412607811592202/5e3352bf-74a6-45e0-bdd9-fbf90f4da9cb.jpg"
      );

    await interaction.reply({ embeds: [embebedImage] });
  },
};
