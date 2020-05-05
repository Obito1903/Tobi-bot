const stripIndents = require('common-tags').stripIndents;
const SearchEngine = require('../../src/music/ytSearch');
const commando = require('discord.js-commando');

const search = new SearchEngine()

module.exports = class MusicAddCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.add',
            aliases: ['m.add'],
            group: 'music',
            memberName: 'add',
            description: 'Add a song to the playlist',
            examples: ['m.add url', 'm.add song name'],
            guildOnly: true,

            args: [
                {
                    key: 'request',
                    prompt: 'Please specify a valid url or name',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, args) {
        try {
            const settings = msg.guild.settings;
            if (!settings.get('queue', null)) settings.set('queue', new Array());
            if (!settings.get('history', null)) settings.set('history', new Array());
            if (!settings.get('volume', null)) settings.set('volume', 50);

            let songs = await search.search(msg, args.request).catch(err => console.log(err));
            let queue = settings.get('queue', null);
            if (songs.length + queue.length > this.client.config.maxQueue) {
                if (songs.length === 1) return msg.channel.send({
                    "embed": {
                        "title": "Queue is full",
                        "description": "The Queue has been shortened",
                        "color": this.client.config.color,
                        "footer": {
                            "icon_url": `${this.client.user.avatarURL()}`,
                            "text": `${this.client.config.prefix}help`
                        }
                    }
                });
                songs = songs.slice(0, this.client.config.maxQueue - queue.length);
            }

            for (const song of songs) {
                song.requester = msg.author.id;
                song.requesterAvatarURL = msg.author.displayAvatarURL();
            }
            queue = queue.concat(songs);
            console.log(queue);
            settings.set('queue', queue).catch(err => console.log(err));
            console.log(`[QUEUE] SERVERID:${msg.guild.id} Added ${songs.length} songs.`);

            if (songs.length > 1) {
                msg.channel.send({
                    "embed": {
                        "title": `Added to queue: ${songs.length} songs`,
                        "color": this.client.config.color,
                        "footer": {
                            "icon_url": `${this.client.user.avatarURL()}`,
                            "text": `${this.client.config.prefix}help`
                        }
                    }
                });
            } else {
                msg.channel.send({
                    "embed": {
                        "title": `Queued`,
                        "description": `[${songs[0].title}](${songs[0].url}) [<@${songs[0].requester}>]`,
                        "color": this.client.config.color,
                        "footer": {
                            "icon_url": `${this.client.user.avatarURL()}`,
                            "text": `${this.client.config.prefix}help`
                        }
                    }
                });
            }
            msg.delete();
        } catch (err) {
            console.log('Erreur add.js ' + err);
        }

    }
};
