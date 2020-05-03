const stripIndents = require('common-tags').stripIndents;
const ytdl = require('ytdl-core-discord');
const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'playnow',
            aliases: ['playnow'],
            group: 'music',
            memberName: 'playnow',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
            guildOnly: true,

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
        const settings = msg.guild.settings;
        const guild = msg.guild;
        try {
            const voiceConnection = this.client.voice.connections.find(val => val.channel.guild.id === msg.guild.id);

            const dOptions = {
                volume: settings.get('volume', 50) / 100,
                bitrate: this.client.config.bitRate,
                passes: 3,
                type: 'opus',
                highWaterMark: 1
            }
            let audioDispatcher = voiceConnection.play(await ytdl(args.url), dOptions);
            settings.set('audioDispatcher', audioDispatcher);
            /*
            if (guild.history[0] !== args) {
                guild.history.unshift(args);
                while (guild.history.length > client.config.maxHistory) guild.history.pop();
            }
            */
            audioDispatcher.on('speaking', (speaking) => {
                setTimeout(() => {
                    if (!speaking) {
                        this.client.registry.resolveCommand('next').run(msg, args);
                    }
                }, 2000);
            });

        } catch (err) {
            console.log('Erreur playnow.js ' + err);
        }

    }
};
