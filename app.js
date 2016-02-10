var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('combined'));

app.use('/styles', express.static(__dirname + '/build/styles'));
app.use('/scripts', express.static(__dirname + '/build/scripts'));
app.use('/images', express.static(__dirname + '/build/images'));
app.use('/fonts', express.static(__dirname + '/build/fonts'));

app.use('/', function(req, res) {
    res.sendfile(__dirname + '/build/index.html');
});

app.use('*', function(req, res) {
    res.sendfile(__dirname + '/build/index.html');
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});