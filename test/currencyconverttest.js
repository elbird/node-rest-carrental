describe('CurrencyConverter', function () {
	"use strict";
	describe('#convert()', function () {
		it('should convert without error', function (done) {
			var currencyConverter = require('../lib/currencyconverter');
			currencyConverter.convert("EUR", "USD", 10.5).then(function () {
				done();
			}, function (err) {
				throw err;
			});
		});
	});
});