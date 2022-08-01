/* eslint-disable new-cap */
/* eslint-disable eol-last */
'use strict';

// node modules
var chai = require('chai');
var assert = chai.assert;
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

var ctm = proxyquire('../../../../cartridges/int_avatax_svcclient/cartridge/models/commitTransactionModel.js', {});

describe('Change transaction model', function () {
    it('should return an empty changeTransaction object', function () {
        var model = new ctm.CommitTransactionModel();
        assert.notEqual(model, null);
    });
});