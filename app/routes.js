var router = require('express').Router()

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport) {
	router.get('/', function(req, res) {
		if (req.session.username) {
			res.redirect("/home");
		}
		res.render('index.ejs', {
			title: "Notify.gs"
		});
	});

	router.get('/home', function(req, res) {
		res.render('home.ejs', {
			title: "Home",
			username: req.session.username
		});
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
	}));

	return router;
}

