/* eslint-disable new-cap */
/* eslint-disable eol-last */
'use strict';

// node modules
var chai = require('chai');
var assert = chai.assert;
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

var avinfo = proxyquire('../../../../cartridges/int_avatax_svcclient/cartridge/models/addressValidationInfo.js', {});

describe('Address validation model', function () {
    it('should return an empty object', function () {
        var model = new avinfo();
        assert.notEqual(model, null);
    });

    it('should return an object with default values', function () {
        var model = new avinfo().createAddressValidatioObject('addressObject');
        assert.notEqual(model, null);
    });

    it('should return an object with default values - case 1', function () {
        var addressObject = {
            address1: 'address1',
            address2: 'address2',
            address3: 'address3',
            city: 'city',
            stateCode: 'stateCode',
            countryCode: 'countryCode',
            postalCode: 'postalCode',
            latitude: 'latitude',
            longitude: 'longitude'
        };

        var model = new avinfo().createAddressValidatioObject(addressObject);
        assert.notEqual(model, null);
    });

    it('should return an object with default values - case 2', function () {

        var addressObject = {
            address1: 'address1',
            address2: 'address2',
            address3: 'address3',
            city: 'city',
            stateCode: 'stateCode',
            country: 'country',
            postalCode: 'postalCode',
            latitude: 'latitude',
            longitude: 'longitude'
        };

        var model = new avinfo().createAddressValidatioObject(addressObject);
        assert.notEqual(model, null);
    });
});