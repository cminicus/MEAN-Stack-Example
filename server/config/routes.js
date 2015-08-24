var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = require('../controllers/users')

module.exports = function(app) {

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users', users.createUser);

	app.get('/partials/*', function(request, response) {
		// get whatever the star is
		response.render('../../public/app/' + request.params[0]);
	});

	app.post('/login', auth.authenticate);
	app.post('/logout', function(request, response) {
		request.logout();
		response.end();
	});

	// client side takes care of page routing, this just always gives the index page
	app.get('*', function(request, response) {
		response.render('index', {
			bootstrappedUser: request.user
		});
	});
}
