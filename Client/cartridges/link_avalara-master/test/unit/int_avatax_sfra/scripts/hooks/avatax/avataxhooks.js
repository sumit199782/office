/* eslint-disable eol-last */
'use strict';

// node modules
var chai = require('chai');
var assert = chai.assert;
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();


var ArrayList = require('../../../../../mocks/dw.util.Collection');
// API includes
var Status = require('../../../../../mocks/dw/system/Status');

// Logger includes
// var LOGGER = dw.system.Logger.getLogger('Avalara', 'AvaTax');
var LOGGER = require('../../../../../mocks/dw/system/Logger');

// AvaTax setting preference
// var settingsObject = JSON.parse(dw.system.Site.getCurrent().getCustomPreferenceValue('ATSettings')); 
var Site = require('../../../../../mocks/dw/system/Site');

function createBasket(shipments) {
    return {
        getShipments: function () {
            return new ArrayList(shipments);
        },
        getAllLineItems: function () {
            return shipments[0].getAllLineItems();
        },
        defaultShipment: {
            shippingAddress: function () {
                return 'address';
            }
        }
    };
}

function createShipment(lineItems, address) {
    return {
        shippingAddress: address,
        getAllLineItems: function () {
            return new ArrayList(lineItems);
        }
    };
}

function createLineItem(shipment, taxClassId, uuid) {
    return {
        lineItemText: '',
        taxClassID: taxClassId,
        taxRate: 1,
        UUID: uuid,
        setTax: function (a) {},
        updateTax: function (a) {}
    };
}

var failTaxJurisdictionID = false;
var failTaxClassID = false;


var productLineItems1 = new ArrayList([{
    product: {
        online: true,
        availabilityModel: {
            getAvailabilityLevels: function () {
                return {
                    notAvailable: {
                        value: 0
                    }
                };
            }
        }
    },
    custom: {},
    productID: 'someID',
    quantityValue: 2
}]);

var productLineItems2 = new ArrayList([{
    product: {
        online: false,
        availabilityModel: {
            getAvailabilityLevels: function () {
                return {
                    notAvailable: {
                        value: 0
                    }
                };
            }
        }
    },
    custom: {},
    productID: 'someID',
    quantityValue: 2
}]);

var productLineItems3 = new ArrayList([{
    product: {
        online: true,
        availabilityModel: {
            getAvailabilityLevels: function () {
                return {
                    notAvailable: {
                        value: 0
                    }
                };
            }
        }
    },
    custom: {
        fromStoreId: new ArrayList([{}])
    },
    productID: 'someID',
    quantityValue: 2
}]);

var lineItemContainer = {
    totalTax: {
        available: false
    },
    merchandizeTotalPrice: {
        available: true
    },
    productLineItems: productLineItems1,
    couponLineItems: new ArrayList([{
        valid: true
    }])
};

var avatax = {
    calculateTax: function (basket, orderNo) {
        return {
            OK: true
        };
    }
};

global.empty = function (variable) {
    var isEmpty = true;
    if (variable) {
        isEmpty = false;
    }
    return isEmpty;
};

var avataxHooks = proxyquire('../../../../../../cartridges/int_avatax_sfra/cartridge/scripts/hooks/avatax/avataxhooks.js', {
    'dw/system/Status': Status,
    '*/cartridge/scripts/avaTax': avatax,
    'dw/system/Logger': LOGGER,
    'dw/system/Site': Site,
    'dw/order/BasketMgr': require('../../../../../mocks/dw/order/BasketMgr'),
    'dw/order/OrderMgr': require('../../../../../mocks/dw/order/OrderMgr'),
    'dw/value/Money': require('../../../../../mocks/dw/value/Money')
});

describe('avataxHooks', function () {
    it('should return an order number', function () {
        var orderNo = avataxHooks.createOrderNo();
        assert.notEqual(orderNo, null);
    });

    it('should calculate taxes', function () {
        var basket = createBasket([createShipment([createLineItem(false, 0.5, 'id'), createLineItem(false, 2, 'id2')], 'address')]);
        var status = avataxHooks.calculateTax(basket);
        assert.notEqual(status, null);
    });

    it('should not calculate taxes if basket has no shipment', function () {
        var basket = createBasket([createShipment([createLineItem(false, 0.5, 'id'), createLineItem(false, 2, 'id2')], 'address')]);
        basket.defaultShipment = null;
        // basket.defaultShipment.shippingAddress = null;
        var status = avataxHooks.calculateTax(basket);
        assert.notEqual(status, null);
    });
});