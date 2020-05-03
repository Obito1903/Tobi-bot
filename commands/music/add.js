const stripIndents = require('common-tags').stripIndents;
const SearchEngine = require('../../src/music/ytSearch');
const commando = require('discord.js-commando');

const search = new SearchEngine()

module.exports = class MusicAddCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'add',
            aliases: ['add'],
            group: 'music',
            memberName: 'add',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
            guildOnly: true,

            args: [
                {
                    key: 'request',
                    prompt: 'Please specify a valid url',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, args) {
        try {
            const settings = msg.guild.settings;
            if (!settings.get('audioDispatcher', null)) settings.set('audioDispatcher', null);
            if (!settings.get('queue', null)) settings.set('queue', new Array());
            if (!settings.get('history', null)) settings.set('history', new Array());
            if (!settings.get('volume', null)) settings.set('volume', 50);

            console.log('hfk');

            let songs = await search.search(msg, args.request);
            var queue = settings.get('queue', null);
            console.log(queue);

            if (songs.length + queue.length > this.client.config.maxQueue) {
                if (songs.length === 1) return msg.channel.send('Queue is full.');
                msg.channel.send('Playlist has been shortened.');
                songs = songs.slice(0, this.client.config.maxQueue - queue.length);
            }

            for (const song of songs) {
                song.requester = msg.author.id;
                song.requesterAvatarURL = msg.author.displayAvatarURL();
            }
            queue = queue.concat(songs);
            console.log(queue);
            settings.set('queue', queue);
            console.log(`[QUEUE] SERVERID:${msg.guild.id} Added ${songs.length} songs.`);

            if (songs.length > 1) {
                msg.channel.send(`Added to queue: ${songs.length} songs`);
            } else {
                msg.channel.send(`Added to queue: [${songs[0].title}](${songs[0].url})`);
            }
        } catch (err) {
            console.log('Erreur add.js ' + err);
        }

    }
};
