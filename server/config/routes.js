var passport = require('passport');

module.exports = function(app) {
	app.get('/partials/*', function(request, response) {
		// get whatever the star is
		response.render('../../public/app/' + request.params[0]);
	});

	app.post('/login', function(request, response, next) {
		var auth = passport.authenticate('local', function(error, user) {
			if (error) { return next(error); }
			if (!user) { response.send({success: false}); }
			request.logIn(user, function(error) {
				if (error) { return next(error); }
				response.send({success: true, user: user});
			});
		});
		auth(request, response, next);
	});

	// client side takes care of page routing, this just always gives the index page
	app.get('*', function(request, response) {
		response.render('index');
	});
}
