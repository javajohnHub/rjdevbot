var Botkit = require('botkit');

module.exports = function () {

    if (!process.env.token) {
        console.log('Error: Specify token in environment');
        process.exit(1);
    }

    var controller = Botkit.slackbot({
        debug: false,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        scopes: ['bot', 'incoming-webhook'],
        send_via_rtm: true,
        require_delivery: true,
    });

    var bot = controller.spawn({
        token: process.env.token,
    }).startRTM();



    /*
     Include all chat bot modules here. Order matters.
     Note the "wHIte stripes" bug
     */
    addHandler(['help'], 'help');
    addHandler(['call me (.*)', 'my name is (.*)'], 'callme');
    addHandler(['wiki (.*)'], 'wikipedia');
    addHandler(['codepen (.*)'], 'codepen');
    addHandler(['uptime', 'identify yourself', 'who are you', 'what is your name'], 'uptime');
    addHandler(['hello', 'hi'], 'greetings');


    function addHandler(handles, name) {
        require('./' + name + '.js')(handles, controller, bot);
    }

};