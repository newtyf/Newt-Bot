require("dotenv/config")
// Require the necessary discord.js classes
const fs = require("node:fs");
const { Collection, Client, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
// Create a new player instance
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
})

client.player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**! \n ${track.url}`))

// Reading commands files
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  /* Set a new item in the Collection
	With the key as the command name and the value as the exported module*/
  client.commands.set(command.data.name, command);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

//Reading events files
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
eventFiles.forEach((file) => {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});


// Login to Discord with your client's token

client.login(process.env.token);
