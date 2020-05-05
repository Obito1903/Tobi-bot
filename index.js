const Commando = require('discord.js-commando');
const path = require('path');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const config = require('./config-test.json');
const fs = require("fs");
var os = require('os');
var pty = require('node-pty');
const ptyDiscord = require('./src/pty');

const DiscordTerm = new ptyDiscord()

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
var ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-mono',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
});

ptyProcess.display = " ";

const client = new Commando.Client({
    commandPrefix: config.prefix,
    owner: config.ownerId
});
client.ptyProcess = ptyProcess;
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
        ['music', 'Music commands'],
        ['terminal', 'Music commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

client.on('error', console.error);

ptyProcess.on('data', function (data) {
    if (client.ptyProcess.message && client.ptyProcess.display) {
        DiscordTerm.addToDisplay(client.ptyProcess, data).catch(console.error);
    }
});


client.login(config.token);
