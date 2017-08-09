var Xray = require('x-ray');
var x = Xray();

module.exports = (handles, controller, bot) => {
    
    controller.hears(handles, 'direct_message', function (bot, message) {
        var method = encodeURIComponent(message.match[1]);
        method = method.replace('_', '-');
        var response = '\`\`\`';
        
        x('http://php.net/manual/en/function.' + method, {
          items: x('body', [{
            synopsis: '.methodsynopsis',
            description: '.rdfs-comment'
          }])
        })(function(err, result) {
            if (err) console.log(err);
            response += result.items[0].synopsis.replace(/\s\s+/g, ' ');
            response += result.items[0].description + '\`\`\`';
        });
        
        bot.reply(message, response);
    })
        
}