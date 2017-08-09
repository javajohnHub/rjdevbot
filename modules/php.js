var Xray = require('x-ray');
var x = Xray();

module.exports = (handles, controller, bot) => {
    
    controller.hears(handles, 'direct_message', function (bot, message) {
        var method = encodeURIComponent(message.match[1]);
        method = method.replace('_', '-');
        x('http://php.net/manual/en/function.' + method, '.methodsynopsis', function(err, result) {
            if (err) console.log(err);
            console.log(result);
        });

    })
        
}