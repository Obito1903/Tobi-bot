const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.queue',
            aliases: ['m.queue'],
            group: 'music',
            memberName: 'queue',
            description: 'Prompt the bot to play music from youtube',
            examples: ['play url'],
            guildOnly: true,
        });
    }

    async run(msg, args) {
        try {
            const settings = msg.guild.settings;

            let queue = settings.get('queue', null);
            let list = "Queue:";
            queue.forEach(element => {
                list = list.concat('\n-', element.title)
            });
            console.log(list);
            msg.channel.send(list);

        } catch (err) {
            console.log('Erreur playnow.js ' + err);
        }

    }
};
