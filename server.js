var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

// Setup and use methods
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

// MongoDB methods
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('multivision db opened');
});

var messageSchema = mongoose.Schema({
	message: String
});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(error, messageDocument) {
	mongoMessage = messageDocument.message;
});

// routing methods
app.get('/partials/:partialPath', function(request, response) {
	response.render('partials/' + request.params.partialPath);
});

// client side takes care of page routing, this just always gives the index page
app.get('*', function(request, response) {
	response.render('index', {
		mongoMessage: mongoMessage
	});
});

// connection
var port = 3030;
app.listen(port);

console.log("Listening on port " + port + " ...");