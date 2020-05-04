const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.stop',
            aliases: ['m.stop'],
            group: 'music',
            memberName: 'stop',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        try {
            const audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id).dispatcher;
            if (!audioDispatcher) return msg.channel.send('Nothing playing right now.');
            audioDispatcher.pause();
            audioDispatcher.destroy();
            audioDispatcher = null;
            msg.channel.send('Playback stopped.');
            settings.set('queue', new Array());
            msg.channel.send('Queue is now empty.');
        } catch (err) {
            console.log('Erreur stop.js ' + err);
        }

    }
};
