const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

class Bot {
    constructor({ token, prefix }) {
        this.token = token;
        this.prefix = prefix;
        this.client = new Discord.Client({
            intents: ['GUILDS', 'GUILD_MESSAGES'],
        });
    }

    /**
     * Initialize the commands collection + load the commands & events
     */
    init() {
        this.client.commands = new Discord.Collection();

        this.loadCommands();
        this.loadEvents();
    }

    /**
     *  Starts the bot
     *
     * @returns {Promise<void>}
     */
    async start() {
        return await this.client.login(this.token);
    }

    /**
     * Load all event handlers from the events directory
     */
    loadEvents() {
        const eventsDir = path.join(__dirname, 'events');

        const files = fs
            .readdirSync(eventsDir)
            .filter((f) => f.endsWith('.js'));

        files.forEach((file) => {
            const event = require(path.join(eventsDir, file));

            this.client.on(event.name, event.handler.bind(null, this));
        });
    }

    /**
     * Load all commands from the commands directory
     */
    loadCommands() {
        const commandsDir = path.join(__dirname, 'commands');

        const files = fs
            .readdirSync(commandsDir)
            .filter((f) => f.endsWith('.js'));

        files.forEach((file) => {
            const command = require(path.join(commandsDir, file));
            console.log(`Loading command: ${command.name}`);
            this.client.commands.set(command.name, command);
        });
    }
}

module.exports = Bot;
