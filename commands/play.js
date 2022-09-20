const { SlashCommandBuilder, bold, ChannelType } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const ytdl = require("discord-ytdl-core");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play a music in voice channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to play muisc")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    )
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("the url to reproduce")
        .setRequired(true)
    )
  ,
  async execute(interaction) {
    const voiceChanel = interaction.options.getChannel("channel");
    const urlMusic = interaction.options.getString("url");

    if (!(urlMusic.includes('http') || urlMusic.includes('https'))) {
      return await interaction.reply(`La url ingresada no es valida`);
    }

    const voiceConnection = joinVoiceChannel({
      channelId: voiceChanel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: true,
    });

    const dataMusic = await ytdl.getBasicInfo(urlMusic)
    const minutesMusic = dataMusic.videoDetails.lengthSeconds / 60
    const help = Math.ceil(minutesMusic) - minutesMusic
    const secondsMusic = help * 60

    const timeMusic = `${Math.ceil(minutesMusic)} : ${Math.ceil(secondsMusic)}`


    let stream = ytdl(urlMusic, {
      filter: "audioonly",
      opusEncoded: true,
      encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
    });

    let resource = createAudioResource(stream);
    const audioPlayer = createAudioPlayer();

    audioPlayer.play(resource);

    voiceConnection.subscribe(audioPlayer);

    audioPlayer.on("error", (err) => console.log(err));

    audioPlayer.on("stateChange", (oldState, newState) => {
      console.log(
        `Audio player transitioned from ${oldState.status} to ${newState.status}`
      );
    });

    voiceConnection.on("stateChange", (oldState, newState) => {
      console.log(
        `Connection transitioned from ${oldState.status} to ${newState.status}`
      );
    });

    await interaction.reply(`Reprocucionedo ${bold(dataMusic.videoDetails.title)}, tiempo: ${bold(timeMusic)} \n ${urlMusic}`);
  },
};
