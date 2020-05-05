const commando = require('discord.js-commando');

module.exports = class MusicPlayNowCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.volume',
            group: 'music',
            memberName: 'volume',
            description: 'Define bot volume',
            examples: ['m.volume 10'],
            guildOnly: true,

            args: [
                {
                    key: 'volume',
                    prompt: 'Please specify a volume between 0 and 100',
                    type: 'integer',
                    min: 0,
                    max: 100
                }
            ]
        });
    }

    async run(msg, { volume }) {
        try {
            const audioDispatcher = this.client.audioDispatcherList.get(msg.guild.id);
            const settings = msg.guild.settings;

            settings.set('volume', volume);
            msg.channel.send({
                "embed": {
                    "description": `<@${msg.author.id}> Setting volume to ${volume}.`,
                    "color": this.client.config.color,
                }
            });
            if (audioDispatcher) audioDispatcher.dispatcher.setVolume(volume / 100);
        } catch (err) {
            console.log('Erreur playnow.js ' + err);
        }
    }
};
