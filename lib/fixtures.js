var fixtures = exports;

fixtures.User = require('./fixtures/user');
fixtures.Booking = require('./fixtures/booking');
fixtures.RentalCar = require('./fixtures/rentalcar');

fixtures.Booking.parent('user');

