const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { useMainPlayer } = require("discord-player");

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
    const player = useMainPlayer();
    const song = interaction.options.getString("song");

    if (!voiceChannel) {
      return interaction.reply({
        content: "Tu debes estar en un  canal de voz!",
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channel &&
      interaction.guild.members.me.voice.channel !== voiceChannel
    ) {
      return interaction.reply(
        "I am already playing in a different voice channel!"
      );
    }

    // Check if the bot has permission to join the voice channel
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.Connect
      )
    ) {
      return interaction.reply(
        "I do not have permission to join your voice channel!"
      );
    }

    // Check if the bot has permission to speak in the voice channel
    if (
      !interaction.guild.members.me
        .permissionsIn(voiceChannel)
        .has(PermissionsBitField.Flags.Speak)
    ) {
      return await interaction.reply(
        "I do not have permission to speak in your voice channel!"
      );
    }

    interaction.deferReply({ ephemeral: true });
    try {
      // Play the song in the voice channel
      const result = await player.play(voiceChannel, song, {
        nodeOptions: {
          metadata: { channel: interaction.channel }, // Store text channel as metadata on the queue
        },
      });

      // Reply to the user that the song has been added to the queue
      return interaction.editReply(
        `${result.track.title} has been added to the queue!`
      );
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      return interaction.editReply("An error occurred while playing the song!");
    }
  },
};
