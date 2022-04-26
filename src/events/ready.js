const Discord = require('discord.js');
const Bot = require('../bot');

const readyEvent = {
    name: 'ready',
    /**
     *
     * @param {Bot} bot
     */
    handler: async (bot) => {
        console.log(`Logged in as ${bot.client.user.tag}!`);
    },
};

module.exports = readyEvent;
