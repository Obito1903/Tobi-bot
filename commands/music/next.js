const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicNextCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.next',
            aliases: ['m.next'],
            group: 'music',
            memberName: 'next',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
            guildOnly: true,
        });
    }

    async run(msg, args) {
        const voiceChannel = msg.member.voice.channel;
        const settings = msg.guild.settings;
        if (!voiceChannel) return msg.reply(stripIndents`
        You must be in a voice channel to run this command.
        `);
        try {
            const guild = msg.guild;
            var queue = settings.get('queue', null);
            if (queue.length > 0) {
                let song = queue[0];
                queue.shift();
                settings.set('queue', queue);
                if (song) return this.client.registry.resolveCommand('playnow').run(msg, song).catch(err => console.log(err));
                /*
                if (this.autoLeaveIn !== 0) {
                    this.timeout = setTimeout(() => this.disconnectVoiceConnection(msg), this.autoLeaveIn);
                }
                */
            }
            //this.client.registry.resolveCommand('stop').run(msg, args);
            msg.channel.send('Queue is empty.');
        } catch (err) {
            console.log('Erreur next.js ' + err);
        }
    }
};
