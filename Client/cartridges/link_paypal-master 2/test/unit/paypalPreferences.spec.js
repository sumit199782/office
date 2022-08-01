/* eslint-disable no-underscore-dangle */
const { paypalPreferencesPath } = require('./path');
const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');
const { stub } = require('sinon');

require('dw-api-mock/demandware-globals');
require('babel-register')({
    plugins: ['babel-plugin-rewire']
});

const emptyFunction = () => { };

const current = {
    getCustomPreferenceValue: () => (
        { getValue: emptyFunction }
    )
};

const paypalPreferences = proxyquire(paypalPreferencesPath, {
    'dw/system/Site': {
        current
    },
    '../scripts/paypal/configuration/paypalButtonConfigs': {
        paypalButtonConfigs: {}
    },
    '../scripts/paypal/paypalUtils': {
        createSDKUrl: () => { }
    },
    'dw/system/CacheMgr': {
        getCache: () => ({
            get: () => ({})
        })
    },
    './sdkConfig': {}
});

describe('paypalPreferences file', () => {
    describe('getPaypalPaymentMethodId', () => {
        const getPaypalPaymentMethodId = paypalPreferences.__get__('getPaypalPaymentMethodId');
        let getActivePaymentMethods;
        let activePaymentMethods = [{
            paymentProcessor: {
                ID: 'PAYPAL'
            },
            ID: 'PayPal'
        }];
        before(() => {
            Array.some = function (a, b) {
                return Array.prototype.some.call(a, b);
            };
            getActivePaymentMethods = stub(dw.order.PaymentMgr, 'getActivePaymentMethods');
            dw.order.PaymentMgr.getActivePaymentMethods.returns(activePaymentMethods);
        });

        after(() => {
            getActivePaymentMethods.restore();
        });

        describe('if PAYPAL is active payment method', () => {
            it('should return PayPal as payment method id', () => {
                expect(getPaypalPaymentMethodId()).to.be.equals('PayPal');
            });
        });

        describe('if payment method doesn`t exist', () => {
            before(() => {
                dw.order.PaymentMgr.getActivePaymentMethods.returns([]);
            });

            it('should return undefined', () => {
                expect(getPaypalPaymentMethodId()).to.be.undefined;
            });
        });
    });
});
