var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var MongoStore = require('connect-mongodb-session')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

mongoose.connect(process.env.MONGOLAB_URI);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({
	store: new MongoStore({
		uri: process.env.MONGOLAB_URI,
	}),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

initPassport = require('./config/passport/init');
initPassport(passport);
app.use('/', require('./app/routes')(passport));

app.use(express.static(__dirname + "/public"));

var server = app.listen(process.env.PORT || 5000, function() {
	console.log('Running on port %s', process.env.PORT || 5000);
});

module.exports = server;