module.exports = (handles, controller, bot) => {
    var rp = require('request-promise');
    controller.hears(handles, 'direct_message,direct_mention,mention, ambient', function (bot, message) {
        console.log(message);
        console.log(message.match[1]);
        var search_term = encodeURIComponent(message.match[1]);
        let params = [
            `q=${search_term}`,
            `key=AIzaSyBMu0jLy0TlNNXVidukbgCpHDh5CnO-ke8`,
            `part=snippet`,
            `type=video`,
            `maxResults=1`
        ].join('&');
        let url = `https://www.googleapis.com/youtube/v3/search?${params}`;
        var options = {
            uri: url,
            json: true,
        };
        rp(options)
            .then(function (data) {
                //console.log(data.items[0].id.videoId);
                bot.reply(message, 'https://www.youtube.com/watch?v=' + data.items[0].id.videoId);
            })
            .catch(function (err) {
                console.log('error', err);
            });
    });
};