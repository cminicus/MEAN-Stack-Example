var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, config) {
	// Setup and use methods
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	
	app.use(logger('dev'));
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