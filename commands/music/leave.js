const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.leave',
            aliases: ['m.leave'],
            group: 'music',
            memberName: 'leave',
            description: 'Prompt the bot to leave current channel',
            examples: ['m.leavel'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        try {
            const voiceConnection = this.client.voice.connections.find(val => val.channel.guild.id === msg.guild.id);
            if (!voiceConnection) return msg.channel.send({
                "embed": {
                    "description": `<@${msg.author.id}> The bot is not in a voice channel.`,
                    "color": this.client.config.color,
                }
            });
            this.client.registry.resolveCommand('m.stop').run(msg, '').catch(err => console.log(err));
            voiceConnection.disconnect();
            msg.channel.send({
                "embed": {
                    "description": `Leaved the channel.`,
                    "color": this.client.config.color,
                }
            });
        } catch (err) {
            console.log('Erreur leave.js ' + err);
        }

    }
};
