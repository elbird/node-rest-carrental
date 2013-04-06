var chai = require("chai"),
	assert = chai.assert,
	Q = require('q'),
	User = require('../lib/user'),
	Booking = require('../lib/booking'),
	RentalCar = require('../lib/rentalcar'),
	dfdUser = Q.nfcall(User.create, {
				firstname: "Test",
				lastname: "Test2",
				email: "test@test.com"
	}),
	dfdRentalCar = Q.nfcall(RentalCar.create, {

	});

describe('Booking', function () {
	"use strict";
	describe('#create()', function () {
		it('should fail when not all required properties where provided', function (done) {
			dfdUser.then(function (user) {
				user.createBooking({

				}, function (err, booking) {
					if (err) {
						done(err);
					} else {
						done();
					}
				});
			});
		});
		it('should fail when a id of a nonexisting rentalcar was provided', function (done) {
			dfdUser.then(function (user) {
				user.createBooking({

				}, function (err, booking) {
					if (err) {
						done();
					} else {
						done(new Error("Booking with false rentalcar_id succeeded"));
					}
				});
			}).fail(done);
		});
	});
	describe('#update()', function () {
		it('should fail when a id of a nonexisting rentalcar was provided', function (done) {
			
		});
	});
});
