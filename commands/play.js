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
  async execute(interaction, client, player) {
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

    const queue = player.createQueue(interaction.guild, {
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
    const track = await player
      .search(song, {
        requestedBy: interaction.user,
      })
      .then((Listtracks) => Listtracks.tracks[0]);
    if (!track)
      return await interaction.followUp({
        content: `❌ | Musica **${song}** no encontrada!`,
      });

    queue.play(track);

    return await interaction.followUp({
      content: `⏱️ | Musica añadida a la lista **${track.title}**!`,
    });
  },
};
