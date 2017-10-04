module.exports = (handles, controller, bot) => {
    var rp = require('request-promise');
    controller.hears(handles, 'direct_message,direct_mention,mention, ambient', function (bot, message) {
        console.log(message);
        console.log(message.match[1]);
        var search_term = encodeURIComponent(message.match[1]);
        let params = [
            `q=${search_term}`,
            `api_key=dc6zaTOxFJmzC`
        ].join('&');
        let url = `https://api.giphy.com/v1/gifs/search?${params}`;
        var options = {
            uri: url,
            json: true,
        };
        rp(options)
            .then(function (data) {
                //console.log(data[0].bitly_gif_url);
                bot.reply(message, data[0]);
            })
            .catch(function (err) {
                console.log('error', err);
            });
    });
};