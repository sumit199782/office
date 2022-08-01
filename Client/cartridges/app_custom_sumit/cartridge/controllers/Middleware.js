'use strict';

var server = require('server');
//Define a variable named userLoggedIn that requires the userLoggedIn script

var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

server.get('Start', userLoggedIn.validateLoggedIn,    //Invoke the middleware step that validates login 
	function (req, res, next) {

	res.print('<html><body><h1>You are now a logged in user!</h1></body></html>');
    next();
	 
});

module.exports = server.exports();