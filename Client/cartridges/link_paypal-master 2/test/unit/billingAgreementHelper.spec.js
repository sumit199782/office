/* eslint-disable no-underscore-dangle */
const { billingAgreementHelperPath } = require('./path');
const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');

require('dw-api-mock/demandware-globals');
require('babel-register')({
    plugins: ['babel-plugin-rewire']
});

const billingAgreementHelper = proxyquire(billingAgreementHelperPath, {});

describe('billingAgreementHelper file', () => {
    describe('createBaFromForm', () => {
        const createBaFromForm = billingAgreementHelper.__get__('createBaFromForm');
        it('should return BA object with data', () => {
            let billingForm = {
                paypal: {
                    billingAgreementID: {
                        htmlValue: 'B-31J59452XL217381K'
                    },
                    billingAgreementPayerEmail: {
                        htmlValue: 'epamtester@pptest.com'
                    },
                    makeDefaultPaypalAccount: {
                        checked: true
                    },
                    savePaypalAccount: {
                        checked: true
                    }
                }
            };
            let createdBa = {
                baID: 'B-31J59452XL217381K',
                email: 'epamtester@pptest.com',
                default: true,
                saveToProfile: true
            };
            expect(createBaFromForm(billingForm)).to.deep.equals(createdBa);
        });
    });

    describe('isSameBillingAgreement', () => {
        const isSameBillingAgreement = billingAgreementHelper.__get__('isSameBillingAgreement');
        describe('if billing agreements are the same', () => {
            it('should return true', () => {
                let activeBA = {
                    email: 'epamtester@pptest.com',
                    default: true,
                    saveToProfile: true
                };
                let formBA = {
                    email: 'epamtester@pptest.com',
                    default: true,
                    saveToProfile: true
                };
                expect(isSameBillingAgreement(activeBA, formBA)).to.be.equals(true);
            });
        });
        describe('if billing agreements are different', () => {
            it('should return false', () => {
                let activeBA = {
                    email: 'test@test.com',
                    default: false,
                    saveToProfile: true
                };
                let formBA = {
                    email: 'epamtester@pptest.com',
                    default: true,
                    saveToProfile: true
                };
                expect(isSameBillingAgreement(activeBA, formBA)).to.be.equals(false);
            });
        });
    });
});
