var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var inspect = require('util').inspect;

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.send('Welcome to Node DMX!');
});

app.get('/levels', function (req, res) {
    request('http://192.168.1.177', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        if (error) {
            res.sendStatus(500);
        } else {
            res.send(body);
        }
    });
});

app.post('/levels', function (req, res) {
    console.log('got request to post to dmx gateway');
    console.log('got body: ' + inspect(req.body));

    request.post({url:'http://192.168.1.177', form: req.body}, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        if (error) {
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });
});

app.listen(8000);
