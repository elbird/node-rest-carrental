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
	this.string('currency');
	this.string('location');

	this.timestamps();
});

module.exports = RentalCar;