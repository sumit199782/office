'use strict';
var Status = require('dw/system/Status');

//script includes
var AvaTax = require('*/cartridge/scripts/avatax/avautil/avaTax');

//Logger includes
var LOGGER = require('dw/system/Logger').getLogger("Avalara", "AvaTax");

/**
 * Creates an order and send it across to AvaTax service to be recorded.
 */
exports.createOrderNo = function () {
    try {
        var basket = require('dw/order/BasketMgr').currentBasket,
            orderNo = require('dw/order/OrderMgr').createOrderSequenceNo();
        session.privacy.NoCall = false;
        session.privacy.sitesource = "sgjc";
        AvaTax.calculateTax(basket, orderNo);
        return orderNo;
    } catch (e) {
        LOGGER.warn('Error while generating order no. File - avataxhooks.js | ' + e.message);
        return new Status(Status.ERROR);
    }
}