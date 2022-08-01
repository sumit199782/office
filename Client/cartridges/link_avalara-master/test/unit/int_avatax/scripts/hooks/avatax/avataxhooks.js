'use strict';

/* eslint-disable eol-last */

// node modules
var chai = require('chai');
var assert = chai.assert;
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

var avatax = {
    calculateTax: function (basket, orderNo) {
        return {
            OK: true
        };
    }
};

var avataxHooks = proxyquire('../../../../../../cartridges/int_avatax/cartridge/scripts/hooks/avatax/avataxhooks.js', {
    'dw/system/Status': require('../../../../../mocks/dw/system/Status'),
    'dw/system/Logger': require('../../../../../mocks/dw/system/Logger'),
    'dw/order/BasketMgr': require('../../../../../mocks/dw/order/BasketMgr'),
    'dw/order/OrderMgr': require('../../../../../mocks/dw/order/OrderMgr'),
    '*/cartridge/scripts/avatax/avautil/avaTax': avatax
});



describe('AvaTax Hook should accept transaction', function () {
    // var basket = createBasket([createShipment([createLineItem(false, 0.5, 'id'), createLineItem(false, 2, 'id2')], 'address')]);
    var status = avataxHooks.createOrderNo();
    assert.notEqual(status, null);
});