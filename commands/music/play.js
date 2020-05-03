const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class UserInfoCommand extends commando.Command {
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

    async run(msg, { request }) {
        const voiceChannel = msg.member.voice.channel;
        const settings = msg.guild.settings;
        if (!voiceChannel) return msg.reply(stripIndents`
        You must be in a voice channel to run this command.
        `);
        try {
            if (request.length != 0) {
                console.log('prout');
                this.client.registry.commands.find(element => element.name === 'add')
                    .run(msg, request, true)
                    .catch(err => console.log('can\'t execute "add" in "play.js"' + err));
            }
            this.client.registry.commands.find(element => element.name === 'join')
                .run(msg, '')
                .catch(err => console.log('can\'t execute "join" in "play.js"' + err));

            if (!settings.get('audioDispatcher', null)) {
                console.log('audio not yet implemented')
            }

        } catch (err) {
            console.log('Erreur play.js ' + err);
        }
    }
};
