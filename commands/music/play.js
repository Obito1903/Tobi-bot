const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicPlayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.play',
            aliases: ['m.play'],
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

            if (!this.client.audioDispatcherList.has(msg.guild.id)) {
                this.client.audioDispatcherList.set(msg.guild.id, {
                    id: msg.guild.id,
                    dispatcher: null,
                });
            }
            const audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id);

            if (args.request.length != 0) {
                await this.client.registry.resolveCommand('m.add').run(msg, args, true).catch(err => console.log(err));
            }
            this.client.registry.resolveCommand('m.join').run(msg, '').catch(err => console.log(err));
            if (!audioDispatcher.dispatcher) {
                this.client.registry.resolveCommand('m.next').run(msg, args).catch(err => console.log(err));
            }
        } catch (err) {
            console.log('Erreur play.js ' + err);
        }
    }
};
