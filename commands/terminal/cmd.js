const commando = require('discord.js-commando');
var os = require('os');
var pty = require('node-pty');

module.exports = class MusicClearCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 't.cmd',
            aliases: ['t.commande', 't.cmd', 't.send'],
            group: 'terminal',
            memberName: 'cmd',
            description: 'Clear the queue',
            examples: ['t.cmd'],
            ownerOnly: true,
            guildOnly: true,

            args: [
                {
                    key: 'commande',
                    prompt: 'Please specify command',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, args) {

        if (!this.client.ptyProcess.guildChannel && !this.client.ptyProcess.message) return msg.channel.send({
            "embed": {
                "description": `<@${msg.author.id}> Please init the channel first.`,
                "color": this.client.config.color,
            }
        });
        await this.client.ptyProcess.write(`${args.commande}\r`);
    }
};
