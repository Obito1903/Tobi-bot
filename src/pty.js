const commando = require('discord.js-commando');
const os = require('os');
const pty = require('node-pty');
const { replace } = require('ffmpeg-static');

module.exports = class ptyDiscord {
    constructor() {
    }

    async displayTerm(ptyProcess) {
        ptyProcess.message.edit("```shell\n" + ptyProcess.display + "\n```");
    }

    async addToDisplay(ptyProcess, data) {

        data = data.replace(/\\[K/g, ' \n');
        data = data.replace(/\[(.*?)m/g, '');

        ptyProcess.display = ptyProcess.display + data;
        console.log("longeur " + (ptyProcess.display.match(/\n|\r/g) || []).length);
        let matches = ptyProcess.display.match(/\n|\r/g);
        while (matches.length > 20) {
            console.log(ptyProcess.display.indexOf(matches[0]))
            ptyProcess.display = ptyProcess.display.slice(ptyProcess.display.indexOf(matches[0]), ptyProcess.display.length - 1);

            matches = ptyProcess.display.match(/\n|\r/g);
        }
        await this.displayTerm(ptyProcess).catch(console.error)
    }


}
