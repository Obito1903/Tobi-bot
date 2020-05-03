const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicPlayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['play'],
            group: 'music',
            memberName: 'play',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
            guildOnly: true,

            args: [
                {
                    key: 'request',
                    prompt: 'Please specify a valid url',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(msg, args) {
        const voiceChannel = msg.member.voice.channel;
        const settings = msg.guild.settings;
        if (!voiceChannel) return msg.reply(stripIndents`
        You must be in a voice channel to run this command.
        `);
        try {
            if (args.request.length != 0) {
                console.log('prout');
                this.client.registry.resolveCommand('add').run(msg, args, true);
            }
            this.client.registry.resolveCommand('join').run(msg, '');

            if (!settings.get('audioDispatcher', null)) {
                this.client.registry.resolveCommand('next').run(msg, args);
            }

        } catch (err) {
            console.log('Erreur play.js ' + err);
        }
    }
};
