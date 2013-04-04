var Booking,
	config = require("../config"),
	Q = require('q'),
	RentalCar = require("./rentalcar"),
	CurrencyConverter = require("./currencyconverter"),
	resourceful = require('resourceful');

Booking = resourceful.define("rentalcar", function () {
	"use strict";
	var self = this;
	this.use('couchdb', {
    	database: config.couchdb.database
  	});

  	this.parent(RentalCar);

	this.string('dateFrom');
	this.string('dateTo');
	this.number('days');
	this.string('currency');

	this.calculatePrice = function (_id, options, callback) {
		var myBooking;
		return Q.nfcall(self.get, _id).then(function (booking) {
			myBooking = booking;
			return Q.fncall(RentalCar.get, booking.rentalcar_id);
		}).then(function (rentalcar) {
			return CurrencyConverter.convert(rentalcar.currency, myBooking.currency, rentalcar.price * myBooking.days);
		}).then(function (price) {
			callback(null, price);
		}, callback);
	};

	this.timestamps();
});

module.exports = Booking;