var chai = require("chai"),
	assert = chai.assert,
	Q = require('q'),
	fixtures = require('../lib/fixtures'),
	RentalCar = fixtures.RentalCar,	
	dfdTestCar = Q.defer();

describe('RentalCar', function () {
	"use strict";
	describe('#create()', function () {
		it('should create a RentalCar without an error and get it again', function (done) {
			RentalCar.create({
				make: "Audi",
				model: "A8",
				kw: 200,
				year: 2012,
				price: 250.5,
				currency: "USD"
			}, function (err, car) {
				if (err) {
					dfdTestCar.reject(err);
					done(err);
				} else {
					dfdTestCar.resolve(car);
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
	describe('#update()', function () {
		it('should update a RentalCar without an error and get it again', function (done) {
			var testCar;
			dfdTestCar.promise.then(function (result){
				testCar = result;
				RentalCar.update(testCar.id, {
					make: "VW",
					model: "Golf",
					kw: 200,
					year: 2012,
					price: 250.5
				}, function (err, result) {
					if (err) {
						done(err);
					}
					RentalCar.get(result.id, function (err, updatedCar) {
						if (err) {
							done(err);
						}
						assert.strictEqual(testCar.id, updatedCar.id, "the car ids are the same");
						assert.notEqual(testCar.make, updatedCar.make, "the cars make are not the same");
						done();
					});
				});
			}).fail(done);
		});
	});
});
