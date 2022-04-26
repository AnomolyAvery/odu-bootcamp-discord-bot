const Discord = require('discord.js');
const Bot = require('./bot');
const config = require('./config');

(async () => {
    const botConfig = config;
    if (!botConfig.token) {
        console.error('No token found!');
        return;
    }
    const bot = new Bot(botConfig);

    bot.init();

    bot.login();
})();
