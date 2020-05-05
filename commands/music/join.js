const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class MusicJoinCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'm.join',
            aliases: ['m.join'],
            group: 'music',
            memberName: 'join',
            description: 'Prompt the bot to join your voice channel',
            examples: ['m.join', 'm.join @user'],
            guildOnly: true,

            args: [
                {
                    key: 'member',
                    prompt: 'Please specify a user',
                    type: 'member',
                    default: ''
                }
            ]
        });
    }

    async run(msg, { member }) {
        var member;
        if ((member === '') || !member) {
            member = msg.member;
        } else {
            member = member;
            console.log(member);

        }

        const voiceChannel = member.voice.channel;

        if (!voiceChannel) return msg.channel.send({
            "embed": {
                "description": `<@${msg.author.id}> You must be in a voice channel.`,
                "color": this.client.config.color,
            }
        });
        const voiceConnection = this.client.voice.connections.find(val => val.channel.guild.id === msg.guild.id);
        if (voiceChannel && voiceChannel.joinable) {
            if (voiceConnection) voiceConnection.voice.channel.leave;
            voiceChannel.join().then(conn => msg.channel.send({
                "embed": {
                    "description": `<@${msg.author.id}> Joined channel.`,
                    "color": this.client.config.color,
                }
            }));
        }
    }
};
