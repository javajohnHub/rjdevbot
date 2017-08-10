var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser     = require('body-parser');
var request = require('request');
require('dotenv').config();
var port = process.env.PORT || 5000;

var api = require('./routes/api');

app.use('/api', api);

require('./modules')();

app.set('port', port);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded
app.use(express.static(path.resolve(__dirname, '../client/build')));

setInterval(function() {
    request('http://rjdevslack.herokuapp.com', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
}, 300000);

app.listen(app.get('port'), function () {
    console.log('Node app is running at localhost:' + app.get('port'));
});


