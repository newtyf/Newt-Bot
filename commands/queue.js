const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("list the songs of the queue"),
  async execute(interaction, client, player) {
    try {
      const queue = player.getQueue(interaction.guild);

      const firstTrack = queue.previousTracks[queue.previousTracks.length - 1];
      const tracks = [
        {
          name: `Now.- ${firstTrack.title}`,
          value: `${firstTrack.author}`,
        },
      ];

      queue.tracks.forEach((element, index) => {
        fieldTrack = {
          name: `${index + 1}). ${element.title}`,
          value: `${element.author}`,
        };

        tracks.push(fieldTrack);
      });

      const queueSongsEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("List Songs")
        .setTimestamp()
        .addFields(tracks);

      await interaction.reply({ embeds: [queueSongsEmbed] });
    } catch (error) {
      console.error(error.message);
      return await interaction.reply("**No hay canciones en la lista**");
    }
  },
};
