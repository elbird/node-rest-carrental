var chai = require("chai"),
	assert = chai.assert,
	RentalCar = require('../lib/rentalcar');

describe('RentalCar', function () {
	"use strict";
	describe('#create()', function () {
		it('should create a RentalCar without an error and get it again', function (done) {
			RentalCar.create({
				make: "Audi",
				model: "A8",
				kw: 200,
				year: 2012,
				price: 250.5
			}, function (err, car) {
				if (err) {
					done(err);
				}
				RentalCar.get(car.id, function (err, sameCar) {
					if (err) {
						done(err);
					}
					assert.strictEqual(sameCar.id, car.id, "the car ids are the same");
					done();
				});
			});
		});
	});
});