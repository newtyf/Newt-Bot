require("isomorphic-fetch");
const { SlashCommandBuilder } = require("discord.js");
const { GiphyFetch } = require("@giphy/js-fetch-api");

const GIPHY = new GiphyFetch(process.env.api_key_giphy);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Sends a random gif!")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The gif category")
        .setRequired(true)
    ),
  async execute(interaction) {
    const gifName = interaction.options.getString("name");

    const { data: gifs } = await GIPHY.search(gifName, {
      limit: 20,
      type: "gifs",
      sort: "relevant",
    });

    const randomSelectGif = Math.floor(Math.random() * (gifs.length - 1));

    await interaction.reply(gifs[randomSelectGif].url);
  },
};
