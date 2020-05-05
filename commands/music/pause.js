const commando = require('discord.js-commando');

module.exports = class MusicAddCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.pause',
            aliases: ['m.pause'],
            group: 'music',
            memberName: 'pause',
            description: 'Pause the audio playback',
            examples: ['pause'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        try {
            const audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id);
            if (!audioDispatcher || !audioDispatcher.dispatcher) {
                msg.channel.send({
                    "embed": {
                        "description": `<@${msg.author.id}> Nothing is playing right now.`,
                        "color": this.client.config.color,
                    }
                });
            } else if (!audioDispatcher.dispatcher.paused) {
                msg.channel.send({
                    "embed": {
                        "description": `<@${msg.author.id}> Music already paused.`,
                        "color": this.client.config.color,
                    }
                });
            } else {
                gaudioDispatcher.dispatcher.pause(true);
                msg.channel.send({
                    "embed": {
                        "description": `<@${msg.author.id}> Playback paused.`,
                        "color": this.client.config.color,
                    }
                });
            }
        } catch (err) {
            console.log('Erreur pause.js ' + err);
        }

    }
};
