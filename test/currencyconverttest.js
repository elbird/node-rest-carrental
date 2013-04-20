process.env.NODE_ENV = 'test';
var chai = require("chai"),
	assert = chai.assert,
	currencyConverter = require('../lib/currencyconverter');

describe('CurrencyConverter', function () {
	"use strict";
	describe('#convert()', function () {
		it('should convert without error', function (done) {
			currencyConverter.convert("EUR", "USD", 10.5).then(function () {
				done();
			}, done);
		});
		it('should return a number which is greater than 0', function (done) {
			currencyConverter.convert("GBP", "USD", 10.5).then(function (result) {
				assert.isNumber(result, "the result is a number");
				assert(!isNaN(result), "the result is not NaN");
				assert(result > 0, "the result is greater than 0");
				done();
			}, done).fail(done);
		});
	});
});
