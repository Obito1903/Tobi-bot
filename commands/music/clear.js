const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicClearCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.clear',
            aliases: ['m.clear', 'm.clearqueue'],
            group: 'music',
            memberName: 'clear',
            description: 'Clear the queue',
            examples: ['m.clear'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        const settings = msg.guild.settings;

        settings.set('queue', new Array());
        msg.channel.send({
            "embed": {
                "description": `Searching for the YouTube URL...`,
                "color": this.client.config.color,
            }
        }).then(msg => msg.delete(1000));
        console.log(settings.get('queue', null));

    }
};
