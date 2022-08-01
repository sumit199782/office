/* eslint-disable no-underscore-dangle */
const { paypalRestServicePath } = require('./path');
const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();
const { stub } = require('sinon');

require('dw-api-mock/demandware-globals');
require('babel-register')({
    plugins: ['babel-plugin-rewire']
});

const get = stub();
const put = stub();
const emptyFunction = () => { };

const paypalRestService = proxyquire(paypalRestServicePath, {
    'dw/system/CacheMgr': {
        getCache: () => ({
            get,
            put
        })
    },
    '~/cartridge/scripts/paypal/logger': {
        getLogger: emptyFunction
    },
    'dw/svc/LocalServiceRegistry': {
        createService: emptyFunction
    },
    '*/cartridge/scripts/paypal/paypalUtils': {
        createErrorLog: emptyFunction
    },
    'dw/svc/ServiceCredential': {},
    '*/cartridge/scripts/paypal/helpers/paypalHelper': {}
});

describe('getUrlPath function', () => {
    const credential = {
        URL: null
    };
    describe('if URL has / at the end', () => {
        before(() => {
            credential.URL = 'api.sandbox.paypal.com/';
        });
    });
    describe('if URL do not has / at the end', () => {
        before(() => {
            credential.URL = 'api.sandbox.paypal.com';
        });
    });
});

describe('getToken', function () {
    const getToken = paypalRestService.__get__('getToken');
    const access_token = 'lotr2003';
    let error_description;
    const service = {
        setThrowOnError: () => ({
            call: () => {
                service.response = {
                    access_token,
                    error_description
                };
            }
        })
    };

    describe('if token was cached', function () {
        let result;
        before(function () {
            get.withArgs('token').returns(access_token);
            result = getToken(service);
        });

        it('should return token', function () {
            expect(result).to.be.equals(`Bearer ${access_token}`);
        });
    });

    describe('if error was returned in response', function () {
        before(function () {
            get.withArgs('token').returns(null);
            error_description = 'Invalid credentials';
        });

        it('should throw an error with description', function () {
            expect(getToken.bind(null, service)).to.throw();
        });
    });
});
