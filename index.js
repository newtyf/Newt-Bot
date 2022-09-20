// Require the necessary discord.js classes
const fs = require("node:fs");
const { Collection, Client, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
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
    client.on(event.name, (...args) => event.execute(...args));
  }
});

// When the client is ready, run this code (only once)
// client.once('ready', () => {
// 	console.log('Ready!');
// });

// client.once('ready', c => {
// 	console.log(`Ready! Logged in as ${c.user.tag}`);
// });

// client.on('interactionCreate', interaction => {
// 	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
// });

// reply for commands in index.js file, only use this strategy if you onlu have few commands
// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	const { commandName } = interaction;

// 	if (commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	}
//   if (commandName === 'server') {
// 		await interaction.reply(`Server name: ${bold(interaction.guild.name)}\nthe members conunt: ${bold(interaction.guild.memberCount)}`);
// 	}
//   if (commandName === 'user') {
// 		await interaction.reply(`User tag: ${bold(interaction.user.tag)}\n${underscore('User Id:')} ${bold(interaction.user.id)}`);
// 	}
//   if (commandName === 'link') {
//     const link = client.generateInvite({
//       scopes: ['bot'],
//     });
//     console.log(`Generated application invite link: ${link}`);
//     await interaction.reply(`!Yepaaaa¡, este es mi link para ser parte de tu servidor: ${bold(link)}`);
// 	}
// });

// Login to Discord with your client's token

client.login(token);
