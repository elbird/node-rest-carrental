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

	this.string('make', { required: true });
	this.string('model', { required: true });
	this.number('year');
	this.number('ps');
	this.number('price', { required: true });
	this.string('currency', { required: true });
	this.array('booking_ids');

	this.timestamps();
});


module.exports = RentalCar;