var router = require('express').Router()

var isAuthenticated = function (req, res, next) {
	// if user is authenticated, continue to routing
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect to root page
	res.redirect('/');
}

router.use(isAuthenticated);

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

