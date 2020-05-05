const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.stop',
            aliases: ['m.stop'],
            group: 'music',
            memberName: 'stop',
            description: 'Stop audio playback',
            examples: ['m.stop'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        try {
            let audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id);
            if (!audioDispatcher.dispatcher) return msg.channel.send('Nothing playing right now.');
            audioDispatcher.dispatcher.pause();
            audioDispatcher.dispatcher.destroy();
            audioDispatcher.dispatcher = null;
            msg.channel.send({
                "embed": {
                    "description": `<@${msg.author.id}> Playback stopped.`,
                    "color": this.client.config.color,
                }
            });
        } catch (err) {
            console.log('Erreur stop.js ' + err);
        }

    }
};
