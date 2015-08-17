var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, config) {
	// Setup and use methods
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');

	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(session({secret: 'multi vision unicorns', resave:false, saveUninitialized:false}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware(
		{
			src: config.rootPath  + '/public',
				compile: function(string, path) {
				return stylus(string).set('filename', path);
			}
		}
	));
	app.use(express.static(config.rootPath  + '/public'));
}
