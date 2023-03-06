const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play a music in voice channel")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("the url to reproduce")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const guild = client.guilds.cache.get(interaction.guildId);
    const member = guild.members.cache.get(interaction.member.user.id);
    const voiceChannel = member.voice.channel;
    const song = interaction.options.getString("song");

    if (!voiceChannel) {
      return await interaction.reply({
        content: "Tu debes estar en un  canal de voz!",
        ephemeral: true,
      });
    }

    const queue = client.player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(voiceChannel);
    } catch {
      queue.destroy();
      return await interaction.reply({
        content: "¡No se pudo unir a tu canal de voz!",
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const resultSearch = await client.player.search(song, {
      requestedBy: interaction.user,
    });

    if (!resultSearch || resultSearch.tracks.length === 0 ) {
      return await interaction.followUp({
        content: `❌ | Musica **${song}** no encontrada!`,
      });
    }

    if (resultSearch.playlist === null) {
      var track = resultSearch.tracks[0];
      queue.play(track);
      return await interaction.followUp({
        content: `⏱️ | Musica añadida a la lista **${track.title}**!`,
      });
    } else {
      let playlist = resultSearch.tracks;
      let firstTrack = playlist[0];
      queue.play(firstTrack);
      playlist.shift();
      queue.addTracks(playlist);
      return await interaction.followUp({
        content: `⏱️ | Musica añadida a la lista **${firstTrack.title}**!`,
      });
    }
  },
};
