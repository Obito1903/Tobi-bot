const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');

module.exports = class UserInfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            aliases: ['join'],
            group: 'music',
            memberName: 'join',
            description: 'Prompt the bot to join your voice channel',
            examples: ['join', 'join @user'],
            guildOnly: true,

            args: [
                {
                    key: 'user',
                    prompt: 'Please specify a user',
                    type: 'member',
                    default: ''
                }
            ]
        });
    }

    async run(msg, { user }) {
        var member;
        if ((user === '') || !user) {
            member = msg.member;
        } else {
            member = user;
            console.log(member);

        }

        const voiceChannel = member.voice.channel;

        if (!voiceChannel) return msg.reply(stripIndents`
            You must be in a voice channel to run this command.
            `);
        const voiceConnection = this.client.voice.connections.find(val => val.channel.guild.id === msg.guild.id);
        if (!voiceConnection) {
            if (voiceChannel && voiceChannel.joinable) {
                voiceChannel.join();
            }
        } else {
            voiceConnection.voice.channel.leave
            if (voiceChannel && voiceChannel.joinable) voiceChannel.join();
        }
        msg.reply(stripIndents`
            Joined channel.
            `);
    }
};
