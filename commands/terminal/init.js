const commando = require('discord.js-commando');
var os = require('os');
var pty = require('node-pty');

module.exports = class MusicClearCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 't.init',
            aliases: ['t.init'],
            group: 'terminal',
            memberName: 'init',
            description: 'Clear the queue',
            examples: ['init'],
            ownerOnly: true,
            guildOnly: true
        });
    }

    async run(msg, args) {
        this.client.ptyProcess.guildChannel = msg.channel;
        this.client.ptyProcess.message = null;
        msg.channel.send('initialisation').then(txt => this.client.ptyProcess.message = txt);
        this.client.ptyProcess.write('export TERM=xterm-mono\r');
    }
};
