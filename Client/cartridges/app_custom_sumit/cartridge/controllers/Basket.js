'use strict';

var server = require('server');
//in the code below  require BasketMgr
var  BasketMgr = require('dw/order/BasketMgr');
server.get('Start', function (req, res, next) {
	
 //in the code below use BasketMgr to get a basket 
  
	var basket = BasketMgr.getCurrentOrNewBasket();
   
    res.render('showBasket', {Basket:basket});
    next();
	
});

module.exports = server.exports();