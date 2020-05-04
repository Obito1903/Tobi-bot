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
            examples: ['join', 'join @user'],
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

        if (!voiceChannel) return msg.reply(stripIndents`
            You must be in a voice channel to run this command.
            `);
        const voiceConnection = this.client.voice.connections.find(val => val.channel.guild.id === msg.guild.id);
        if (!voiceConnection) {
            if (voiceChannel && voiceChannel.joinable) {
                voiceChannel.join();
                msg.reply(stripIndents`
                Joined channel.
                `);
            }
        } else {
            voiceConnection.voice.channel.leave
            if (voiceChannel && voiceChannel.joinable) {
                voiceChannel.join();
                msg.reply(stripIndents`
                Joined channel.
                `);
            }
        }

    }
};
