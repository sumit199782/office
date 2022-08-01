/* eslint-disable new-cap */
/* eslint-disable eol-last */
'use strict';

// node modules
var chai = require('chai');
var assert = chai.assert;
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

var getURL = function () {
    return 'sandbox';
};

var LocalServiceRegistry = {
    createService: function (serviceName, config) {
        return {
            getConfiguration: function () {
                return {
                    getCredential: function () {
                        return {
                            getURL: getURL,
                            getUser: function () {},
                            getPassword: function () {}
                        };
                    }
                };
            },
            addHeader: function (key, val) {},
            setURL: function (url) {},
            setRequestMethod: function (method) {},
            call: function () {
                return {
                    status: 'OK',
                    object: JSON.stringify({
                        value: ['@nextLink', 'b', 'c'],
                        status: 'OK'
                    })
                };
            }
        };
    }
};

global.dw = {
    util: {
        StringUtils: require('../../../mocks/dw/util/stringUtils')
    }
};

global.session = {
    privacy: {
        sitesource: ''
    }
};

global.empty = function (variable) {
    var isEmpty = true;
    if (variable) {
        isEmpty = false;
    }
    return isEmpty;
};


var avaTaxClient = proxyquire('../../../../cartridges/int_avatax_svcclient/cartridge/scripts/avaTaxClient.js', {
    'dw/svc/LocalServiceRegistry': LocalServiceRegistry,
    'dw/system/Logger': require('../../../mocks/dw/system/Logger'),
    'dw/util/StringUtils': require('../../../mocks/dw/util/stringUtils'),
    'dw/util/SortedMap': require('../../../mocks/dw/util/SortedMap')
});

describe('AvaTax Service Client', function () {
    it('should initialize Avatax service', function () {
        var res = avaTaxClient.testConnection();
        assert.equal(res.status, 'OK');
    });

    it('should return address validation result', function () {
        var res = avaTaxClient.resolveAddressPost({});
        assert.equal(res.status, 'OK');
    });

    it('should return tax calculation result', function () {
        var res = avaTaxClient.createTransaction({}, {});
        assert.equal(res.status, 'OK');
    });

    it('should return commit transaction result', function () {
        var res = avaTaxClient.commitTransaction({}, {}, {}, {});
        assert.equal(res.status, 'OK');
    });

    it('should return create or adjust transaction result', function () {
        var res = avaTaxClient.createOrAdjustTransaction({}, {});
        assert.equal(res.status, 'OK');
    });

    it('should return void transaction result', function () {
        var res = avaTaxClient.voidTransaction({}, {}, {});
        assert.equal(res.status, 'OK');
    });

    it('should return adjust transaction result', function () {
        var res = avaTaxClient.adjustTransaction({}, {}, {});
        assert.equal(res.status, 'OK');
    });

    it('should return tax content result', function () {
        var res = avaTaxClient.buildTaxContent({}, {}, {}, {});
        assert.equal(res.status, undefined);
    });

    it('should return transactions by company', function () {
        var res = avaTaxClient.getTransactions({}, {}, {});
        assert.equal(res.status, undefined);
    });

    it('should retrieve auth info from the system', function () {
        global.session = {
            privacy: {
                sitesource: 'sgjc'
            }
        };
        var res = avaTaxClient.getAuthInfo();
        assert.notEqual(res.url, null);
    });

    it('should retrieve auth info from the system', function () {
        getURL = function () {
            return '';
        };
        var res = avaTaxClient.getAuthInfo();
        assert.notEqual(res.url, null);
    });

    it('should retrieve auth info from the system', function () {
        var res = avaTaxClient.leLog({});
        assert.equal(res.success, true);
    });

});