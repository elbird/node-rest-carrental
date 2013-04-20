var User,
	config = require("../../config"),
	Q = require('q'),
	resourceful = require('resourceful');

User = resourceful.define("user", function () {
	"use strict";
	this.restful = true;
	this.use('couchdb', {
    	database: config.couchdb.database
  	});

	this.string('firstname', { required: true });
	this.string('lastname', { required: true });
	this.string('email', { format: 'email', required: true });
	this.string('password', { required: true });

	this.timestamps();
});

module.exports = User;