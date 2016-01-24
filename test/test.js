var http_mocks = require('node-mocks-http');
var expect = require('chai').expect;
var app_router = require('../app/routes');

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

		app_router.handle(req, res, function() {
			done();
		});
	});
});
