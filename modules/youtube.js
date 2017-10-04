module.exports = (handles, controller, bot) => {
    var rp = require('request-promise');
    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {
        console.log(message);
        console.log(message.match[1]);
        var search_term = encodeURIComponent(message.match[1]);
        let params = [
            `q=${search_term}`,
            `key=AIzaSyBMu0jLy0TlNNXVidukbgCpHDh5CnO-ke8`,
            `part=snippet`,
            `type=video`,
            `maxResults=25`
        ].join('&');
        let url = `https://www.googleapis.com/youtube/v3/search?${params}`;
        var options = {
            uri: url,
            json: true,
        };
        rp(options)
            .then(function (data) {
                //console.log(data);
                bot.reply(message, data.snippet.thumbnails.high.url);
            })
            .catch(function (err) {
                console.log('error', err);
            });
    });
};