const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.history',
            aliases: ['m.history'],
            group: 'music',
            memberName: 'history',
            description: 'Display the guild music history',
            examples: ['m.history'],
            guildOnly: true,
        });
    }

    async run(msg, args) {
        try {
            const settings = msg.guild.settings;

            let history = settings.get('history', null);
            let list = '';
            if (history.length === 0) {
                list = 'History empty';
            }
            history.forEach((element, index) => {
                list = list.concat(`\n ${index + 1}- `, element.title)
            });
            msg.channel.send({
                "embed": {
                    "title": "Music history",
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
