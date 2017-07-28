var Botkit = require('botkit');
var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser     = require('body-parser');
require('dotenv').config();
var port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB);

require('./botkit')();

app.set('port', port);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded
app.use(express.static(path.resolve(__dirname, '../client/build')));

require('./api/members')(app);
require('./api/upwork')(app);

app.listen(app.get('port'), function () {
    console.log('Node app is running at localhost:' + app.get('port'));
});


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
    addHandler(['login (.*)'], 'login');
    addHandler(['update'], 'update');
    addHandler(['codepen (.*)'], 'codepen');
    addHandler(['upwork (.*) (.*)'], 'upwork');
    addHandler(['uptime', 'identify yourself', 'who are you', 'what is your name'], 'uptime');
    addHandler(['hello', 'hi'], 'greetings');
    addHandler(['dm'], 'twitterdm');
    addHandler(['profile'], 'profile');

    function addHandler(handles, name) {
        require('./modules/' + name + '.js')(handles, controller, bot);
    }

};