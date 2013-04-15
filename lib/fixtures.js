var fixtures = exports;

fixtures.User = require('./fixtures/user');
fixtures.Booking = require('./fixtures/booking');
fixtures.RentalCar = require('./fixtures/rentalcar');
fixtures.RentalLocation = require('./fixtures/rentallocation');

fixtures.RentalCar.parent('rentallocation');
fixtures.Booking.parent('user');

