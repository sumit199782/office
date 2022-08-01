'use strict';

const page = module.superModule;
const server = require('server');

const BasketMgr = require('dw/order/BasketMgr');

server.extend(page);

server.append('Show', function (req, res, next) {
    var basket = BasketMgr.getCurrentBasket();
    if (!basket) {
        return next();
    }

    res.setViewData({
        paypalCalculatedCost: basket.totalGrossPrice
    });
    next();
});

module.exports = server.exports();
