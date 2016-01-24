var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema({
	username:  String,
	ogs_id: Number,
	notifications: Array,
	following: Array
})

module.exports = mongoose.model('Users', schema);

