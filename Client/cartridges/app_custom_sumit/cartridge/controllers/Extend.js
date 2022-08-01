'use strict';

	var server = require('server');

//Task 3: inherit functionality with module.superModule by using the extend method
	server.extend(module.superModule);

//Task 3: insert functionality before the Show Route using server.prepend
	server.prepend('Show',function (req, res, next){
		res.print('<html><body><h1>This information is inserted before the original Show Route.</h1></body></html>');
    	next();
	});
		

//Task 3: modify the Show Route by adding functionality using server.append
	server.append('Show', function (req, res, next){

		res.print('<html><body><h1>This information is inserted after the original Show Route.</h1></body></html>');
		next();

	});
		

//Task 4: replace the Start Route with new functionality using server.replace
	server.replace('Start', function (req, res, next){
		res.print('<html><body><h1>This information replaces the original Start Route.</h1></body></html>');
		next();
	});
		
//Note: remove comments to test task 4
module.exports = server.exports();

