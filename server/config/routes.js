var auth = require('./auth');

module.exports = function(app) {
	app.get('/partials/*', function(request, response) {
		// get whatever the star is
		response.render('../../public/app/' + request.params[0]);
	});

	app.post('/login', auth.authenticate);

	// client side takes care of page routing, this just always gives the index page
	app.get('*', function(request, response) {
		response.render('index');
	});
}
