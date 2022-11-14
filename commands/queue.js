const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("list the songs of the queue"),
  offset: {
    value: 0,
    reset: false
  },
  async execute(interaction, client) {
    try {
      const queue = client.player.getQueue(interaction.guild);

      const firstTrack = queue.previousTracks[queue.previousTracks.length - 1];
      let playlist = queue.tracks;
      let offsetPlaylist = this.offset.value;
      let tracks = [
        {
          name: `Now.- ${firstTrack.title}`,
          value: `${firstTrack.author}`,
        },
      ];

      const reducePlaylist = playlist.slice(
        offsetPlaylist,
        offsetPlaylist + 10
      );

      reducePlaylist.forEach((element, index) => {
        const fieldTrack = {
          name: `${index + offsetPlaylist + 1}). ${element.title}`,
          value: `${element.author}`,
        };

        tracks.push(fieldTrack);
      });

      const queueSongsEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("List Songs")
        .setTimestamp()
        .addFields(tracks);

      const queueButtonNext = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("moreQueue")
          .setLabel("more songs ->")
          .setStyle(ButtonStyle.Primary)
      );

      if (tracks.length === 1) {
        const fieldTrack = {
          name: `Se listaron todas las canciones`,
          value: `--`,
        };

        tracks.push(fieldTrack);
        this.offset.value = 0
        this.offset.reset = true
      }

      await interaction.reply({
        embeds: [queueSongsEmbed],
        components: [queueButtonNext],
      });
    } catch (error) {
      console.error(error);
      return await interaction.reply("**No hay canciones en la lista**");
    }

  },
};
