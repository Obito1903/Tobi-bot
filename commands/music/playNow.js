const stripIndents = require('common-tags').stripIndents;
const ytdl = require('ytdl-core-discord');
const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.playnow',
            aliases: ['m.playnow'],
            group: 'music',
            memberName: 'playnow',
            description: 'Play the requested music',
            examples: ['play url'],
            guildOnly: true,
            hiden: true,

            args: [
                {
                    key: 'url',
                    prompt: 'Please specify a valid url',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, args) {
        try {
            let audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id);
            const settings = msg.guild.settings;
            const guild = msg.guild;

            const voiceConnection = this.client.voice.connections.find(val => val.channel.guild.id === msg.guild.id);
            const dOptions = {
                volume: settings.get('volume', 50) / 100,
                bitrate: this.client.config.bitRate,
                passes: 3,
                type: 'opus',
                highWaterMark: 1
            }
            audioDispatcher.dispatcher = voiceConnection.play(await ytdl(args.url), dOptions);
            audioDispatcher.playing = args;
            msg.channel.send({
                "embed": {
                    "title": `Playing`,
                    "description": `[${args.title}](${args.url}) [<@${args.requester}>]`,
                    "color": this.client.config.color,
                    "footer": {
                        "icon_url": `${this.client.user.avatarURL()}`,
                        "text": `${this.client.config.prefix}help`
                    }
                }
            });
            console.log('playind :' + args.url);
            audioDispatcher.dispatcher.on('finish', (speaking) => {
                this.client.registry.resolveCommand('m.next').run(msg, args).catch(err => console.log(err));
            });

        } catch (err) {
            console.log('Erreur playnow.js ' + err);
        }

    }
};
