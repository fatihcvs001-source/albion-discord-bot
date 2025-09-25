@echo off
REM Simple script to run the Albion Discord bot on Windows
REM It installs dependencies on first run and starts the bot

IF NOT EXIST node_modules (
  echo Installing dependencies...
  npm install
)

echo Starting the bot...
node index.js

echo.
echo Bot stopped. Press any key to exit.
pause >nul
