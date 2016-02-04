var mongoose = require('mongoose');

var schema = mongoose.Schema({
	username:  String,
	ogs_id: Number,
	ogs_access_token: String,
	ogs_refresh_token: String,
	notifications: Array,
	following: Array
});

module.exports = mongoose.model('Users', schema);

