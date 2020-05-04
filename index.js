const Commando = require('discord.js-commando');
const path = require('path');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const config = require('./config-test.json');

const client = new Commando.Client({
    commandPrefix: config.prefix,
    owner: config.ownerId
});

client.config = config;

client.setProvider(
    sqlite.open({
        filename: './db/tobi.db',
        driver: sqlite3.Database
    }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.audioDispatcherList = new Map();

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['prout', 'Your First Command Group'],
        ['music', '']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

//console.log(client.registry.commands.find(element => element.name === 'play'));

client.on('error', console.error);

client.login(config.token);
