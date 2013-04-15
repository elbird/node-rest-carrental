var http        = require('http'),
    resourceful = require('resourceful'),
    restful = require('restful'),
    fixtures = require('./lib/fixtures'),
	   server;


var server = restful.createServer([fixtures.User, fixtures.RentalLocation], { strict: false, explore: true });
server.listen(8000);
