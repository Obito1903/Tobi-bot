const commando = require('discord.js-commando');

module.exports = class MusicAddCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.playing',
            aliases: ['m.playing', 'm.current'],
            group: 'music',
            memberName: 'playing',
            description: 'Show info on the current song',
            examples: ['m.playing', 'm.current'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        try {
            const audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id);
            const embed = {
                "embed": {
                    "description": `<@${msg.author.id}> Nothing is playing.`,
                    "color": this.client.config.color,
                }
            };
            if (!audioDispatcher || !audioDispatcher.dispatcher) return msg.channel.send(embed);
            const song = audioDispatcher.playing;
            const playtime = audioDispatcher.dispatcher.totalStreamTime;
            if (!song) return msg.channel.send(embed);
            msg.channel.send({
                "embed": {
                    "title": `Currently playing`,
                    "description": `[${song.title}](${song.url}) [<@${song.requester}>]`,
                    "color": this.client.config.color,
                    "footer": {
                        "icon_url": `${this.client.user.avatarURL()}`,
                        "text": `${this.client.config.prefix}help`
                    },
                    "fields":
                    {
                        "name": "⏲",
                        "value": `${Math.floor((playtime / 1000 / 60 / 60) << 0)}:${Math.floor((playtime / 1000 / 60) << 0)}:${Math.floor((playtime / 1000) % 60)}/${song.duration}`
                    }
                }
            });
        } catch (err) {
            console.log('Erreur add.js ' + err);
        }

    }
};
