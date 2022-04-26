const Bot = require('../bot');

const testCommand = {
    name: 'test',
    aliases: ['t'],
    dmOnly: false,
    /**
     *
     * @param {Bot} bot
     * @param {Discord.Message} message
     * @param {Array<string>} args
     */
    handler: async (bot, message, args) => {
        await message.reply('Hello World!');
    },
};

module.exports = testCommand;
