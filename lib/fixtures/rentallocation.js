var RentalLocation,
	config = require("../../config"),
	Q = require('q'),
	resourceful = require('resourceful');

RentalLocation = resourceful.define("rentallocation", function () {
	"use strict";
	this.restful = true;
	this.use('couchdb', {
    	database: config.couchdb.database
  	});

	this.string('city');
	this.string('zip');
	this.string('address');
	this.string('phone');
	this.string('mail');
	this.string('hours');

	this.timestamps();
});


module.exports = RentalLocation;