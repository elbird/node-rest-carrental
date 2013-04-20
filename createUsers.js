'use strict';

var fixtures = require('./lib/fixtures'),
	User = fixtures.User;

User.create({
	firstname: "Shveta",
	lastname: "Sohal",
	email: "whiteteardrop@hotmail.com",
	password: "rentacar"
});

User.create({
	firstname: "Sebastian",
	lastname: "Vogel",
	email: "sebvogel@gmail.com",
	password: "rentacar"
});

User.create({
	firstname: "Sonja",
	lastname: "Vollnhofer",
	email: "sunshy@gmx.at",
	password: "rentacar"
});

User.create({
	firstname: "Alexander",
	lastname: "Wagner",
	email: "wagner_alexander@gmx.at",
	password: "rentacar"
});
