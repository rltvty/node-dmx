var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var inspect = require('util').inspect;

var app = express();

var colors = {
    "red" : {r: 255},
    "orange" : {r:255, g:127},
    "yellow": {r:255, g:255},
    "lime": {r:127, g: 255},
    "green": {g:255},
    "turquoise": {g:255, b:127},
    "cyan": {g:255, b:255},
    "ocean": {g:127, b:255},
    "blue": {b:255},
    "violet": {r:127, b:255},
    "magenta": {r:255, b:255},
    "raspberry": {r:255, b:127}
};

var pastels = {
    "red" : {r: 255, w:127},
    "orange" : {r:255, g:127, w:127},
    "yellow": {r:255, g:255, w:127},
    "lime": {r:127, g: 255, w:127},
    "green": {g:255, w:127},
    "turquoise": {g:255, b:127, w:127},
    "cyan": {g:255, b:255, w:127},
    "ocean": {g:127, b:255, w:127},
    "blue": {b:255, w:127},
    "violet": {r:127, b:255, w:127},
    "magenta": {r:255, b:255, w:127},
    "raspberry": {r:255, b:127, w:127}
};

var moreColors = {
    "magma": {r:255, a:255},
    "sunset": {r:255, a:127},
    "goldenrod": {r:209, g:148, a:161},
    "copper flame": {r:109, g: 178, a: 79, w: 23},
    "periwinkle": {r:83, g:106, b:255, a:110, w:27},
    "iris": {r:127, b:171, a:66},
    "lilac": {r:255, b:255, a:64, w:180},
    "salmon": {r:217, g:73, b:38, a:173, w:103},
}

var temps = {
    "1000" : {r:255},
    "2000" : {r:191, a:191},
    "3000" : {a:255},
    "4000" : {a:255, g: 63},
    "5000" : {a:127, g: 63, w:255},
    "6000" : {b:63, g:255, a:127, w:127},
    "7000" : {b:127, w: 255},
    "8000" : {b:191, g:63, w: 191},
    "9000" : {b:255, g:127, w:127}
}

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

app.post('/fixture/:id/:color/', function (req, res) {
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
