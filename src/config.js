require('dotenv').config();

const botConfig = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
};

module.exports = botConfig;
