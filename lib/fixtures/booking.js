var Booking,
	config = require("../../config"),
	Q = require('q'),
	url = require('url'),
	RentalCar = require("./rentalcar"),
	//User = require("./user"),
	CurrencyConverter = require("../currencyconverter"),
	resourceful = require('resourceful');



Booking = resourceful.define("booking", function () {
	"use strict";
	var self = this;
	this.restful = true;
	this.use('couchdb', {
    	database: config.couchdb.database
  	});

  	this.parent("user");

	this.string('dateFrom', { format: 'date', required: true });
	this.string('dateTo', { format: 'date', required: true });
	this.number('days', { required: true });
	this.string('currency');
	this.string('rentalcar_id');

	this.calculatePrice = function (_id, options, callback) {
		var myBooking;
		return Q.ninvoke(self, 'get', _id).then(function (booking) {
			myBooking = booking;
			return Q.ninvoke(RentalCar, 'get', booking.rentalcar_id);
		}).then(function (rentalcar) {
			return CurrencyConverter.convert(rentalcar.currency, myBooking.currency, rentalcar.price * myBooking.days);
		}).then(function (price) {
			callback(null, price);
		}, callback);
	};
	this.calculatePrice.remote = true;

	this.calculatePriceRemote = function () {
		var query = url.parse(this.req.url, true).query,
			res = this.res;
		function errorCb(err) {
			var status = 500,
				returnValue = "";
          	if (typeof err === "object") {
                status = 422;
                returnValue = JSON.stringify(err);
        	} else if (!isNaN(parseInt(err, 10))) {
        		status = parseInt(err, 10);
        	}
			res.writeHead(status);
			res.end(returnValue);
		}
		function calculate(booking) {
			var currency, days, rentalcar_id,
				values = query;
			if(booking && booking.rentalcar_id) {
				values.rentalcar_id = booking.rentalcar_id;
				values.days = booking.days;
				values.currency = booking.currency;
			}
			Q.ninvoke(RentalCar, 'get', values.rentalcar_id).then(function (rentalcar) {
				return CurrencyConverter.convert(rentalcar.currency, values.currency, rentalcar.price * values.days);
			}).then(function (result) {
				res.writeHead(200);
				res.end(JSON.stringify({result: result}));
			}, errorCb);

		}
		if (query.id) {
			Q.ninvoke(Booking, 'get', query.id).then(calculate, errorCb);
		} else if (query.rentalcar_id && query.days && query.currency) {
			calculate();
		} else {
			errorCb(422);
		}
	};

	this.normalizeId = function (_id) {
		var array = _id.split('/');
		if (array.length > 3) {
			array.shift();
			_id = array.join('/');
		}
		return _id;
	};


	this.timestamps();
});

function prepareError(err, message) {
	"use strict";
	message = message || "";
	if(err.error && err.reason) {
		message += "\nWith error: '" + err.error + "' and reason: '" + err.reason + "'";
	}
	return new Error(message);
}

function updateRelation(booking, callback) {
	"use strict";
	if (booking.rentalcar_id) {
		RentalCar.get(booking.rentalcar_id, function (err, car) {
			if (err) {
				callback(prepareError(err, "Booking: rentalcar with id '" + booking.rentalcar_id + "' does not exist"));
				return;
			}
			var bookingId = Booking.normalizeId(booking.id);
			if (car.booking_ids.indexOf(bookingId) === -1) {
				car.booking_ids.push(bookingId);
				RentalCar.update(car.id, {
					booking_ids: car.booking_ids
				}, function (err) {
					if (err) {
						callback(prepareError(err, "Booking: booking id could not be added to rentalcar with id: '" + booking.rentalcar_id + "'"));
					} else {
						callback();
					}
				});
			} else {
				callback();
			}
		});
	} else {
		callback();
	}
}

function checkRelation(booking, callback) {
	"use strict";
	if (booking.rentalcar_id) {
		RentalCar.get(booking.rentalcar_id, function (err, car) {
			if (err) {
				callback(prepareError(err, "Booking: rentalcar with id '" + booking.rentalcar_id + " does not exist"));
			} else {
				callback();
			}
		});
	} else {
		callback();
	}
}
Booking.before('save', updateRelation);
Booking.before('update', updateRelation);


Booking.after('destroy', function (err, booking, callback) {
	"use strict";
	if (booking.rentalcar_id) {
		RentalCar.get(booking.rentalcar_id, function (err, car) {
			if (err) {
				callback(prepareError(err, "Booking: rentalcar with id '" + booking.rentalcar_id + " does not exist"));
				return;
			}
			var index = car.booking_ids.indexOf(Booking.normalizeId(booking.id));
			if (index !== -1) {
				car.booking_ids.splice(index, 1);
				RentalCar.save(car, function (err) {
					if (err) {
						callback(prepareError(err, "Booking: colud not remove booking id from rentalcar with id '" + booking.rentalcar_id + "'"));
						return;
					}
					callback();
				});
			} else {
				callback();
			}
		});
	} else {
		callback();
	}
});

module.exports = Booking;
