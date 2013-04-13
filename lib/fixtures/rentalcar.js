var RentalCar,
	config = require("../../config"),
	Q = require('q'),
	resourceful = require('resourceful');

RentalCar = resourceful.define("rentalcar", function () {
	"use strict";
	this.restful = true;
	this.use('couchdb', {
    	database: config.couchdb.database
  	});

	this.string('make');
	this.string('model');
	this.number('year');
	this.number('ps');
	this.number('price');
	this.string('currency', { required: true });
	this.string('location');
	this.array('booking_ids');

	this.timestamps();
});


module.exports = RentalCar;