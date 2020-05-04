const commando = require('discord.js-commando');

const search = new SearchEngine()

module.exports = class MusicAddCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.pause',
            aliases: ['m.pause'],
            group: 'music',
            memberName: 'pause',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        try {
            const audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id);
            if (!audioDispatcher) {
                message.channel.send('Nothing playing right now.');
            } else if (!audioDispatcher.dispatcher.paused) {
                message.channel.send('Music already paused.');
            } else {
                gaudioDispatcher.dispatcher.pause(true);
                message.channel.send('Playback paused.');
            }
        } catch (err) {
            console.log('Erreur add.js ' + err);
        }

    }
};
