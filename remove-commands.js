require("dotenv/config");
const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
});

const rest = new REST({ version: "10" }).setToken(process.env.token);

(async () => {
  console.log("Started refreshing application (/) command");

  if (process.env.enviroment === "production") {
    rest
      .put(Routes.applicationCommands(process.env.clientId), {
        body: [],
      })
      .then(() => console.log("Successfully deleted all global commands."))
      .catch((e) => console.error(e));
  } else {
    rest
      .put(Routes.applicationCommands(process.env.clientId, process.env.guildId), {
        body: [],
      })
      .then(() => console.log("Successfully deleted guild commands"))
      .catch((e) => console.error(e));
  }

})();
