const ytdl = require('ytdl-core-discord');
const config = require("../../config-test.json");
const request = require('node-superfetch');
const moment = require('moment');
require('moment-duration-format');

module.exports = class Search {
    constructor() {
    }

    static song() {
        return {
            id: '',
            title: '',
            uploader: '',
            uploaderURL: '',
            requester: '',
            requesterAvatarURL: '',
            url: '',
            duration: ''
        };
    }

    async getSongViaUrl(url) {
        console.log(`[REQUEST] URL:${url}`);
        const info = await ytdl.getBasicInfo(url);
        const song = Search.song();
        song.id = info.video_id;
        song.title = info.title;
        song.url = info.video_url;
        song.uploader = info.author.name;
        song.uploaderURL = info.author.channel_url;
        song.duration = moment.duration(parseInt(info.length_seconds), 'seconds').format();
        return [song];
    }

    async getSongsViaPlaylistUrl(url) {
        console.log(`[REQUEST] PLAYLIST_URL:${url}`);
        const playId = url.toString().split('list=')[1];
        const playlist = await ytpl(playId);
        if (playlist.items.length < 1) throw new Error('Couldn\'t get any songs from that playlist.');
        const songs = [];
        for (const info of playlist.items) {
            const song = Search.song();
            song.id = info.id;
            song.title = info.title;
            song.url = info.url_simple;
            song.uploader = info.author.name;
            song.uploaderURL = info.author.ref;
            song.duration = info.duration;
            songs.push(song);
        }
        return songs;
    }

    async getSongsViaSearchQuery(query) {
        console.log(`[REQUEST] QUERY:${query} FILTER:${this.searchFiltersEnabled ? 'ENABLED' : 'DISABLED'}`);
        const searchString = query.trim();
        const { body, error } = await request.get('https://www.googleapis.com/youtube/v3/search').query({
            part: 'snippet',
            type: 'video',
            maxResults: 1,
            q: searchString,
            key: config.ytApi
        });
        if (!body.items.length || error) throw new Error(`No results for query: "${searchString}".`);
        const songs = [];
        for (const info of body.items) {
            const song = Search.song();
            song.id = info.id.videoId;
            song.title = info.snippet.title;
            song.url = `https://www.youtube.com/watch?v=${info.id.videoId}`;
            song.uploader = info.snippet.channelTitle;
            song.uploaderURL = `https://www.youtube.com/channel/${info.snippet.channelId}`;
            song.duration = moment
                .duration(parseInt((await ytdl.getBasicInfo(song.url)).length_seconds), 'seconds')
                .format();
            songs.push(song);
        }
        return [songs[0]];
    }

    async search(msg, query) {
        let searchString = query.trim();
        let songs = [];
        let note;
        let botMsg;
        if (searchString.includes('youtu.be/') || searchString.includes('youtube.com/')) {
            if (searchString.includes('&')) searchString = searchString.split('&')[0];
            if (searchString.includes('watch') || searchString.includes('youtu.be/')) {
                msg.channel.send({
                    "embed": {
                        "description": `Searching for the YouTube URL...`,
                        "color": config.color,
                    }
                }).then(msg => botMsg = msg);;
                songs = await this.getSongViaUrl(searchString);
            } else if (searchString.includes('playlist')) {
                msg.channel.send({
                    "embed": {
                        "description": `Searching for the YouTube playlist...`,
                        "color": config.color,
                    }
                }).then(msg => botMsg = msg);;
                songs = await this.getSongsViaPlaylistUrl(searchString);
            }
        } else {
            msg.channel.send({
                "embed": {
                    "description": `Searching for the search query...`,
                    "color": config.color,
                }
            }).then(msg => botMsg = msg);
            songs = await this.getSongsViaSearchQuery(query);
        }
        botMsg.delete();
        return songs;
    }

}
