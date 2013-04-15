'use strict';

var fixtures = require('./lib/fixtures'),
	RentalLocation = fixtures.RentalLocation;

RentalLocation.create({
	name: "Flughafen Wien",
	adress: "Flughafenstraße 123",
	city: "Wien",
	zip: "1240",
	phone: "01/1234567",
	mail: "airport-vienna@carrental.com",
	hours: "tägl. 07:00-22:00"
});

RentalLocation.create({
	name: "Wien Zentrum",
	adress: "Babenbergerstraße 1",
	city: "Wien",
	zip: "1010",
	phone: "01/1234589",
	mail: "vienna-central@carrental.com",
	hours: "Mo-Sa 08:00-20:00"
});


RentalLocation.create({
	name: "Linz",
	adress: "Taubenmarkt 23",
	city: "Linz",
	zip: "4020",
	phone: "0732/987654",
	mail: "linz@carrental.com",
	hours: "tägl. 07:00-22:00"
});

RentalLocation.create({
	name: "Flughafen Graz",
	adress: "Thalerhof 4",
	city: "Graz",
	zip: "8010",
	phone: "0360/567891",
	mail: "graz@carrental.com",
	hours: "tägl. 07:00-22:00"
});