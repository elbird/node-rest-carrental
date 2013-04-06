var Booking,
	config = require("../config"),
	Q = require('q'),
	RentalCar = require("./rentalcar"),
	User = require("./user"),
	CurrencyConverter = require("./currencyconverter"),
	resourceful = require('resourceful');



Booking = resourceful.define("rentalcar", function () {
	"use strict";
	var self = this;
	this.use('couchdb', {
    	database: config.couchdb.database
  	});

  	this.parent(User);

	this.string('dateFrom', { required: true });
	this.string('dateTo', { required: true });
	this.number('days', { required: true });
	this.string('currency');
	this.string('rentalcar_id');

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

function checkRelation(booking, callback) {
	"use strict";
	if (booking.rentalcar_id) {
		RentalCar.get(booking.rentalcar_id, function (err, car) {
			if (err) {
				throw err;
			}
			callback();
		});
	}
	callback();
}
Booking.before('create', checkRelation);
Booking.before('update', checkRelation);

module.exports = Booking;
