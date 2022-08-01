/* eslint-disable new-cap */
/* eslint-disable eol-last */
'use strict';

// node modules
var chai = require('chai');
var assert = chai.assert;
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

var ctm = proxyquire('../../../../cartridges/int_avatax_svcclient/cartridge/models/createTransactionModel.js', {});

describe('Create transaction model', function () {
    it('should create an empty LineItemModel model', function () {
        ctm.LineItemModel();
    });

    it('should create an empty AddressLocationInfo model', function () {
        ctm.AddressLocationInfo();
    });

    it('should create an empty AddressesModel model', function () {
        ctm.AddressesModel();
    });

    it('should create an empty TaxOverrideModel model', function () {
        ctm.TaxOverrideModel();
    });

    it('should create an empty CreateTransactionModel model', function () {
        ctm.CreateTransactionModel();
    });
});