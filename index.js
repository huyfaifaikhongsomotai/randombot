const { Client, Collection, GatewayIntentBits, Partials, REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { token } = require("./login");
const { defaultPrefix, statusText, statusType } = require("./config");
const { logStatus } = require("./console");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", async () => {
  client.user.setActivity(statusText, { type: statusType });
  logStatus(client);

  const slashCommands = [];
  for (const command of client.commands.values()) {
    if (command.slashData) slashCommands.push(command.slashData.toJSON());
  }
  const rest = new REST({ version: "10" }).setToken(token);
  await rest.put(Routes.applicationCommands(client.user.id), { body: slashCommands });
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (command) await command.execute(interaction);
});

client.on("messageCreate", async msg => {
  if (msg.author.bot || !msg.guild) return;
  if (!msg.content.startsWith(defaultPrefix)) return;
  const args = msg.content.slice(defaultPrefix.length).trim().split(/\s+/);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);
  if (command && command.prefixExecute) await command.prefixExecute(msg, args);
});

client.login(token);
