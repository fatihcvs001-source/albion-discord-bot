require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const i18n = require('./utils/i18n');

// Create a new client instance with guild intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Use a Collection to store commands
client.commands = new Collection();

// Dynamically read command files from the commands directory
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Ensure each command exports data and execute
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`[WARNING] The command at ${filePath} is missing required \"data\" or \"execute\" property.`);
    }
  }
}

// Once the client is ready, log to console
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Listen for slash command interactions
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, i18n);
  } catch (error) {
    console.error(error);
    const locale = interaction.locale?.startsWith('tr') ? 'tr' : 'en';
    await interaction.reply({ content: i18n.t('general.error', locale) || 'There was an error while executing this command!', ephemeral: true });
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
