const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicNextCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.next',
            aliases: ['m.next', 'm.skip'],
            group: 'music',
            memberName: 'next',
            description: 'Skip the current song and play the next one',
            examples: ['m.next', 'm.skip'],
            guildOnly: true,
        });
    }

    async run(msg, args) {
        const settings = msg.guild.settings;
        try {
            const guild = msg.guild;
            var queue = settings.get('queue', null);
            var history = settings.get('history', null);
            if (queue.length > 0) {
                let song = queue[0];
                queue.shift();
                settings.set('queue', queue);

                history.push(song);
                if (history.length > this.client.config.maxHistory) {
                    history.pop();
                }

                if (song) return this.client.registry.resolveCommand('m.playnow').run(msg, song).catch(err => console.log(err));
            } else {
                const audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id).dispatcher;
                if (audioDispatcher !== null) return this.client.registry.resolveCommand('m.stop').run(msg, args);
            }

        } catch (err) {
            console.log('Erreur next.js ' + err);
        }
    }
};
