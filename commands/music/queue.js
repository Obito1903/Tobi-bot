const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.queue',
            aliases: ['m.queue'],
            group: 'music',
            memberName: 'queue',
            description: 'Display the queue if the current Guild',
            examples: ['m.queue'],
            guildOnly: true,
        });
    }

    async run(msg, args) {
        try {
            const settings = msg.guild.settings;

            let queue = settings.get('queue', null);
            let list = "";
            if (queue.length === 0) {
                list = 'Queue empty';
            }
            queue.forEach((element, index) => {
                list = list.concat(`\n ${index + 1}- `, element.title)
            });
            msg.channel.send({
                "embed": {
                    "title": "Music queue",
                    "color": this.client.config.color,
                    "footer": {
                        "icon_url": `${this.client.user.avatarURL()}`,
                        "text": `${this.client.config.prefix}help`
                    },
                    "description": "```js\n" + `${list}` + "```"
                }
            }).catch(console.error);

        } catch (err) {
            console.log('Erreur playnow.js ' + err);
        }

    }
};
