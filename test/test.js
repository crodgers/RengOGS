var http_mocks = require('node-mocks-http');
var expect = require('chai').expect;
var app_router = require('../app/routes');
var passport = require('passport');

//need a passport instance to use the router
passport.initialize();
initPassport = require('../config/passport/init');
initPassport(passport);

function buildRes() {
	return http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
}

describe('root route', function() {
	it('responds to /', function(done) {
		var res = buildRes();
		var req = http_mocks.createRequest({
			method: 'GET',
			url: '/'
		});

		res.on('end', function() {
			expect(res.status).to.equal(200);
		});

		app_router(passport).handle(req, res, function() {
			done();
		});
	});
});

describe('login route', function() {
	it('responds to /login post', function(done) {
		var res = buildRes();
		var req = http_mocks.createRequest({
			method: "POST",
			username: "crodgers",
			password: process.env.TEST_PASSWORD,
			url: "/login"
		});

		res.on('end', function() {
			expect(res.status).to.equal(200);
			expect(req).to.have.property('username');
			expect(req).to.have.property('access_token');
			expect(req).to.have.property('refresh_token');
		});

		app_router(passport).handle(req, res, function() {
			done();
		});
	});
});
