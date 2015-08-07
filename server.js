var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();


app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
			compile: function(string, path) {
			return stylus(string).set('filename', path);
		}
	}
));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('multivision db opened');
});

app.get('/partials/:partialPath', function(request, response) {
	response.render('partials/' + request.params.partialPath);
});

// client side takes care of page routing, this just always gives the index page
app.get('*', function(request, response) {
	response.render('index');
});

var port = 3030;
app.listen(port);

console.log("Listening on port " + port + " ...");