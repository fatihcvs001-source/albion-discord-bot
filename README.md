# Albion Discord Bot (Railway deployment)

This repository contains a Discord bot for **Albion Online** with Turkish and English language support. It includes various slash commands such as price, player, guild, history, gold, image, ping, and random-build. The bot uses the Albion Online Data Project API and the official game info API for data, and provides localized responses based on the user's Discord locale.

## Features

- Slash commands for item price, player and guild information, price history, gold price, item images, latency/uptime checks, and random build selection.
- Simple JSON-based i18n system with English (en) and Turkish (tr) translations.
- Data caching for price queries to reduce API calls.
- Modular command structure for easy extension.

## Running Locally

1. Install [Node.js](https://nodejs.org/) (v16 or higher recommended).
2. Clone this repository or extract the ZIP file.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the project root and set the following environment variables:
   ```env
   DISCORD_TOKEN=your-discord-bot-token
   CLIENT_ID=your-discord-application-client-id
   DEFAULT_LANG=en  # Optional, fallback language ("en" or "tr")
   ```
5. Register slash commands (only needed when commands change):
   ```bash
   npm run register
   ```
6. Start the bot:
   ```bash
   npm start
   ```

## Deploying to Railway (recommended)

Railway is a cloud platform that can host Node.js applications easily. To deploy this bot on Railway:

1. Sign up for an account at [railway.app](https://railway.app/) and create a new project.
2. When prompted to deploy a service, choose “Deploy from repository” and either connect your GitHub repository or upload this code as a ZIP.
3. If using the ZIP upload, make sure it includes the `package.json`, `index.js`, `commands/`, `utils/`, `locales/`, `Dockerfile`, and `run.bat` files.
4. Railway will detect it’s a Node.js project. Under **Settings → Variables**, add the following environment variables:
   - `DISCORD_TOKEN` – your bot’s token.
   - `CLIENT_ID` – your Discord application’s client ID.
   - `DEFAULT_LANG` (optional) – `en` or `tr`.
5. For the build command, Railway uses `npm install` automatically. For the start command, leave it blank or set it to `npm start`.
6. Deploy the service. Once it shows as running, the bot should be online and ready to use.

### Notes

- You can also deploy to other platforms such as Heroku, Render, or Glitch by adjusting the deployment settings. The included `Dockerfile` makes it easy to containerize the application.
- To register commands globally in production, run `npm run register` locally once or create a one‑off job on Railway with the same command.
- The `run.bat` script is provided for convenience on Windows; it installs dependencies if needed and starts the bot.
