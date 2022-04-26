const Discord = require('discord.js');
const Bot = require('../bot');
const botConfig = require('../config');

const messageCreate = {
    name: 'messageCreate',
    /**
     *
     * @param {Bot} bot
     * @param {Discord.Message} message
     */
    handler: async (bot, message) => {
        // Ignore messages from bots
        if (message.author.bot) return;

        // Ignore messages that don't start with the prefix
        if (message.content.indexOf(bot.prefix) !== 0) {
            console.log(bot.prefix);
            console.log(
                `Message doesn't start with prefix: ${message.content}`
            );
            return;
        }

        // Get the command name
        const commandName = message.content
            .split(' ')[0]
            .slice(bot.prefix.length);

        if (!bot.client.commands) {
            console.log('No commands found!');
            return;
        }

        // Get the command
        const command =
            bot.client.commands.get(commandName) ||
            bot.client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        // If the command doesn't exist, return

        if (!command) return;

        // If the command is a DM command, return
        if (command.dmOnly) return;

        // Get the arguments
        const args = message.content
            .slice(bot.prefix.length + command.name.length)
            .trim()
            .split(/ +/);

        await command.handler(bot, message, args);
    },
};

module.exports = messageCreate;
