module.exports = (handles, controller, bot) => {
    var rp = require('request-promise');
    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {
        var search_term = encodeURIComponent(message.match[1]);
        var url = 'http://localhost:5000/api/search/' + search_term;
        var options = {
            uri: url,
            json: true,
        };
        rp(options)
            .then(function (data) {
                data.businesses.forEach(function(v, k){
                    bot.reply(message, v.name);
                    bot.reply(message, v.url);

                })

            })
            .catch(function (err) {
                console.log('error', err);
            });
    });
};