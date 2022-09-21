const { SlashCommandBuilder, bold, ChannelType } = require("discord.js");
const { joinToPlayMusicYoutube } = require("../utils/joinToPlayMusic");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play a music in voice channel")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("the url to reproduce")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const guild = client.guilds.cache.get(interaction.guildId)
    const member = guild.members.cache.get(interaction.member.user.id);
    const voiceChannel = member.voice.channel;
    const urlMusic = interaction.options.getString("url");

    if (!(urlMusic.includes("http") || urlMusic.includes("https"))) {
      return await interaction.reply(`La url ingresada no es valida`);
    }
    if (!voiceChannel) {
      return await interaction.reply('Debes estar conectado a un canal de voz')
    }

    const music = await joinToPlayMusicYoutube(voiceChannel.id, interaction.guildId, interaction.guild.voiceAdapterCreator,urlMusic);

    await interaction.reply(
      `Reproduciendo ${bold(music.titleMusic)}, tiempo: ${bold(
        music.minutesMusic
      )}:${bold((music.secondsMusic).toLocaleString(undefined, {minimumIntegerDigits: 2}))} \n ${urlMusic}`
    );
  },
};
