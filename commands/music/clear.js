const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicClearCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.clear',
            aliases: ['m.clear', 'm.clearqueue'],
            group: 'music',
            memberName: 'clear',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        const settings = msg.guild.settings;

        settings.set('queue', new Array());
        msg.reply(stripIndents`
        Queue cleared.
        `);
        console.log(settings.get('queue', null));

    }
};
