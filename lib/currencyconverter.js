var soap  = require('soap'),
	Q = require('q'),
	url = "http://localhost/currencyconverterws/CurrencyConverter?WSDL";

var deferredClient = (function () {
	"use strict";
	var dfd = Q.defer();
	soap.createClient(url, function (err, client) {
		client.setSOAPAction(function () {
			// SOAPAction http header not needed - ws can process it
			// return empty string
			return "";
		});
		if (err) {
			dfd.reject(err);
		} else {
			dfd.resolve(client);
		}
	});
	return dfd.promise;
}());

var CurrencyConverter = {
	convert: function (from, to, value) {
		"use strict";
		return deferredClient.then(function (client) {
			var dfd = Q.defer();
			client.convert({from: from, to: to, value: value}, function (err, result) {
				if (err) {
					dfd.reject(err);
				}
				dfd.resolve(parseFloat(result.result));
			});
			return dfd.promise;
		});
	}
};

module.exports = CurrencyConverter;