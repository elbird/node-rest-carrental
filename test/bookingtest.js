process.env.NODE_ENV = 'test';
var chai = require("chai"),
	assert = chai.assert,
	Q = require('q'),
	fixtures = require('../lib/fixtures'),
	User = fixtures.User,
	Booking = fixtures.Booking,
	RentalCar = fixtures.RentalCar,
	dfdUser = Q.ninvoke(User, "create", {
				firstname: "Test",
				lastname: "Test2",
				email: "test@test.com"
			}),
	dfdRentalCar = Q.ninvoke(RentalCar, "create", {
				make: "Audi",
				model: "A8",
				kw: 200,
				year: 2012,
				price: 250.5,
				currency: "USD"
	}),
	dfdRentalCar2 = Q.ninvoke(RentalCar, "create", {
				make: "Audi2",
				model: "A8",
				kw: 200,
				year: 2012,
				price: 250.5,
				currency: "USD"
	}),
	dfdCreateBooking = function () {
		"use strict";
		return dfdUser.then(function (user) {
			return Q.ninvoke(User, "createBooking", user.id, {
				dateFrom: "2013-03-12",
				dateTo: "2013-03-14",
				days: 3
			});
		});
	},
	dfdBookingWithCar = Q.all([dfdUser, dfdRentalCar]).then(function (values) {
		"use strict";
		var user = values[0],
			rentalCar = values[1];
		return Q.ninvoke(User, "createBooking", user.id, {
			dateFrom: "2013-03-12",
			dateTo: "2013-03-14",
			days: 3,
			rentalcar_id: rentalCar.id
		});
	});

describe('Booking', function () {
	"use strict";
	describe('#create()', function () {
		it('should fail when not all required properties where provided', function (done) {
			dfdUser.then(function (user) {
				User.createBooking(user.id, {
					currency: "USD"
				}, function (err, booking) {
					if (err) {
						done();
					} else {
						done(new Error("createBooking without required property succeeded"));
					}
				});
			}).fail(done);
		});
		it('should fail when a id of a nonexisting rentalcar was provided', function (done) {
			dfdUser.then(function (user) {
				User.createBooking(user.id, {
					dateFrom: "2013-03-12",
					dateTo: "2013-03-14",
					days: 3,
					rentalcar_id: "FAKE-RENTALCAR-ID"
				}, function (err, booking) {
					if (err) {
						done();
					} else {
						done(new Error("Booking with noenxisting rentalcar_id succeeded"));
					}
				});
			}, done);
		});
		it('should succeed when an id of a existing rentalcar was provided', function (done) {
			Q.all([dfdUser, dfdRentalCar]).then(function (values) {
				var user = values[0],
					rentalCar = values[1];
				User.createBooking(user.id, {
					dateFrom: "2013-03-12",
					dateTo: "2013-03-14",
					days: 3,
					rentalcar_id: rentalCar.id
				}, function (err, booking) {
					if (err) {
						done(err);
					} else {
						done();
					}
				});
			}, done);
		});
	});
	describe('#update()', function () {
		it('should fail when a id of a nonexisting rentalcar was provided', function (done) {
			dfdCreateBooking().then(function (booking) {
				Booking.update(booking.id, {
					rentalcar_id:  "FAKE-RENTALCAR-ID"
				}, function (err, result) {
					if (err) {
						done();
					} else {
						done(new Error("Update Booking with noenxisting rentalcar_id succeeded"));
					}
				});
			}, done);
		});
		it('should succeed when a id of a existing rentalcar was provided', function (done) {
			Q.all([dfdCreateBooking(), dfdRentalCar]).then(function (values) {
				var booking = values[0],
					rentalCar = values[1];
				Booking.update(booking.id, {
					rentalcar_id:  rentalCar.id
				}, function (err, result) {
					if (err) {
						done(err);
					} else {
						done();
					}
				});
			}, done);
		});
		it('should update the booking_ids array in the rentalcar object', function (done) {
			Q.all([dfdCreateBooking(), dfdRentalCar2]).then(function (values) {
				var booking = values[0],
					bookingId = Booking.normalizeId(booking.id),
					rentalCar = values[1];
				assert(rentalCar.booking_ids.indexOf(bookingId) === -1, "before update: the booking id is not in the rentalCars's booking_ids");
				Booking.update(booking.id, {
					rentalcar_id: rentalCar.id
				}, function (err, result) {
					if (err) {
						done(err);
					} else {
						rentalCar.reload(function (err, rentalCar) {
							assert(rentalCar.booking_ids.indexOf(bookingId) !== -1, "after update: the rentalCars's booking_ids contain the id of the current booking");
							done();
						});
					}
				});
			}, done);
		});
	});
	describe('#destroy()', function () {
		it('should remove the booking id from the rentalcar when the booking was destroyed', function (done) {
			var booking;
			dfdBookingWithCar.then(function (result) {
				booking = result;
				var rentalCarId = booking.rentalcar_id;
				return Q.ninvoke(RentalCar, 'get', booking.rentalcar_id);
			}).then(function (rentalCar) {
				var bookingId = Booking.normalizeId(booking.id);
				assert.include(rentalCar.booking_ids, bookingId, "before destroy: the rentalCars's booking_ids contain the id of the current booking");
				booking.destroy(function () {
					rentalCar.reload(function (err, rentalCar) {
						assert(rentalCar.booking_ids.indexOf(bookingId) === -1, "after destroy: the booking id is not in the rentalCars's booking_ids");
						done();
					});
				});
			}, done);
		});
	});
});
