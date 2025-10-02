require("dotenv/config");
// Require the necessary discord.js classes
const fs = require("node:fs");
const { Collection, Client, GatewayIntentBits } = require("discord.js");
const { Player, GuildQueueEvent } = require("discord-player");
const { DefaultExtractors } = require("@discord-player/extractor");


// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
// Create a new player instance

const player = new Player(client);

player.extractors.loadMulti(DefaultExtractors);

player.on("connectionCreate", (queue) => {
  queue.connection.voiceConnection.on("stateChange", (oldState, newState) => {
    const oldNetworking = Reflect.get(oldState, "networking");
    const newNetworking = Reflect.get(newState, "networking");

    const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
      const newUdp = Reflect.get(newNetworkState, "udp");
      clearInterval(newUdp?.keepAliveInterval);
    };

    oldNetworking?.off("stateChange", networkStateChangeHandler);
    newNetworking?.on("stateChange", networkStateChangeHandler);
  });
});

// Handle the event when a track starts playing
player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
  // Get the metadata stored on the queue
  const { channel } = queue.metadata;
  // Send a message to the channel
  await channel.send(`Now playing: ${track.title}`);
});

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
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

// Login to Discord with your client's token

client.login(process.env.token);
