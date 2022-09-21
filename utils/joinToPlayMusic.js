const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
} = require("@discordjs/voice");
const ytdl = require("discord-ytdl-core");
const youtubesearchapi = require("youtube-search-api");

/**
 * @param {*} channelId - id of voice channel
 * @param {*} interaction - interaction class
 * @param {*} urlMusic - url of the youtube music
 *
 * @returns - function to connect, search and play music
 */
const joinToPlayMusicYoutube = (
  channelId,
  guildId,
  voiceAdapterCreator,
  urlMusic
) => {
  return new Promise(async (resolve, reject) => {
    //TODO create voice connection
    let voiceConnection = getVoiceConnection(guildId);
    if (
      !voiceConnection ||
      voiceConnection.joinConfig.channelId !== channelId
    ) {
      voiceConnection = joinVoiceChannel({
        channelId: channelId,
        guildId: guildId,
        adapterCreator: voiceAdapterCreator,
        selfDeaf: true,
      });
    }

    //TODO get music
    const dataMusic = await ytdl.getBasicInfo(urlMusic);
    const minutesMusic = Math.trunc(dataMusic.videoDetails.lengthSeconds / 60);
    const secondsMusic = Math.trunc(
      (dataMusic.videoDetails.lengthSeconds / 60 - minutesMusic) * 60
    );
    const titleMusic = dataMusic.videoDetails.title;
    let stream = ytdl(urlMusic, {
      filter: "audioonly",
      opusEncoded: true,
      encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
    });

    //TODO create resource and play
    let resource = createAudioResource(stream);
    const audioPlayer = createAudioPlayer();
    audioPlayer.play(resource);
    voiceConnection.subscribe(audioPlayer);

    // handle states
    audioPlayer.on("error", (err) => {
      console.log(err);
    });
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

    resolve({ minutesMusic, secondsMusic, titleMusic });
  });
};

module.exports = { joinToPlayMusicYoutube };
