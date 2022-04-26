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

    init() {
        this.client.commands = new Discord.Collection();

        this.loadCommands();
        this.loadEvents();
    }

    async login() {
        return await this.client.login(this.token);
    }

    loadEvents() {
        const eventsDir = path.join(__dirname, 'events');

        fs.readdirSync(eventsDir)
            .filter((file) => file.endsWith('.js'))
            .forEach((file) => {
                const event = require(path.join(eventsDir, file));

                this.client.on(event.name, event.handler.bind(null, this));
            });
    }

    loadCommands() {
        const commandsDir = path.join(__dirname, 'commands');

        fs.readdirSync(commandsDir)
            .filter((file) => file.endsWith('.js'))
            .forEach((file) => {
                const command = require(path.join(commandsDir, file));
                console.log(`Loading command: ${command.name}`);
                this.client.commands.set(command.name, command);
            });
    }
}

module.exports = Bot;
