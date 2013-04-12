var RentalCar,
	config = require("../config"),
	Q = require('q'),
	resourceful = require('resourceful');

RentalCar = resourceful.define("rentalcar", function () {
	"use strict";
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

	this.addBooking = function () {

	};

	this.timestamps();
});


module.exports = RentalCar;