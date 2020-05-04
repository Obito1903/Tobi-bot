const commando = require('discord.js-commando');

const search = new SearchEngine()

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
            if (!audioDispatcher) {
                msg.channel.send('Nothing playing right now.');
            } else if (!audioDispatcher.dispatcher.paused) {
                msg.channel.send('Music already playing.');
            } else {
                audioDispatcher.dispatcher.resume();
                msg.channel.send('Playback resumed.');
            }
        } catch (err) {
            console.log('Erreur add.js ' + err);
        }

    }
};
