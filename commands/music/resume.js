const commando = require('discord.js-commando');

module.exports = class MusicAddCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.resume',
            aliases: ['m.resume'],
            group: 'music',
            memberName: 'resume',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
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
                        "description": `<@${msg.author.id}> Music already playing.`,
                        "color": this.client.config.color,
                    }
                });
            } else {
                audioDispatcher.dispatcher.resume();
                msg.channel.send({
                    "embed": {
                        "description": `<@${msg.author.id}> Playback resumed.`,
                        "color": this.client.config.color,
                    }
                });
            }
        } catch (err) {
            console.log('Erreur add.js ' + err);
        }

    }
};
