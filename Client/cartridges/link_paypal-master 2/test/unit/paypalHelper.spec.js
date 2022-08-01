/* eslint-disable no-underscore-dangle */
const { paypalHelperPath } = require('./path');
const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');
const { stub, assert } = require('sinon');

require('dw-api-mock/demandware-globals');
require('babel-register')({
    plugins: ['babel-plugin-rewire']
});

const encodeString = stub();
const paypalPaymentMethodId = 'PayPal';
const billingAgreementDescription = 'billingAgreementDescription';
const getShippingAddress = stub();
const currentBasket = {
    getDefaultShipment: () => ({
        getShippingAddress
    }),
    giftCertificateLineItems: [],
    productLineItems: {}
};
const paypalButtonLocation = 'CartMinicart';
const getBAShippingAddress = stub();

const paypalHelper = proxyquire(paypalHelperPath, {
    '*/cartridge/config/paypalPreferences': {
        paypalPaymentMethodId,
        billingAgreementDescription,
        paypalButtonLocation
    },
    '*/cartridge/scripts/paypal/paypalUtils': {
        encodeString
    },
    '*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper': {},
    '*/cartridge/scripts/paypal/helpers/addressHelper': {
        getBAShippingAddress
    },
    'dw/order/BasketMgr': {
        currentBasket
    },
    'server': {},
    '*/cartridge/scripts/util/paypalConstants' : {}
});

describe('paypalHelper file', () => {
    describe('isExpiredTransaction', () => {
        const isExpiredTransaction = paypalHelper.__get__('isExpiredTransaction');
        let creationDate;
        let dateNow = Date.parse(new Date());
        let getTime = 1584088139000;

        /* eslint-disable */
        Date = function () {
            return {
                getTime: function () {
                    return getTime;
                }
            };
        };
        /* eslint-enable */

        Date.now = stub().returns(dateNow);
        Date.parse = stub().returns(creationDate);

        describe('Transaction Expired', () => {
            before(() => {
                creationDate = 1584087421000;
            });

            it('returns true', () => {
                expect(isExpiredTransaction(creationDate)).to.be.equals(true);
            });
        });

        describe('Transaction Valid', () => {
            before(() => {
                creationDate = dateNow;
                getTime = dateNow + 1584347339000;
            });

            it('returns false', () => {
                expect(isExpiredTransaction(creationDate)).to.be.equals(false);
            });
        });
    });

    describe('isPurchaseUnitChanged', () => {
        const isPurchaseUnitChanged = paypalHelper.__get__('isPurchaseUnitChanged');
        let purchaseUnit = {
            amount: {
                currecy_code: 'USD',
                value: '244.23'
            },
            address: {}
        };
        describe('if orderDataHash is undefined', () => {
            before(() => {
                encodeString.withArgs(purchaseUnit).returns('123');
                session.privacy.orderDataHash = undefined;
            });
            after(() => {
                encodeString.reset();
                session.privacy.orderDataHash = undefined;
            });
            it('should return true', () => {
                expect(isPurchaseUnitChanged(purchaseUnit)).to.be.equals(true);
            });
        });

        describe('if encoded purchaseUnit equals to orderDataHash', () => {
            before(() => {
                encodeString.withArgs(purchaseUnit).returns('123');
                session.privacy.orderDataHash = '123';
            });
            after(() => {
                encodeString.reset();
                session.privacy.orderDataHash = undefined;
            });
            it('should return false', () => {
                expect(isPurchaseUnitChanged(purchaseUnit)).to.be.equals(false);
            });
        });

        describe('if encoded purchaseUnit is not equal to orderDataHash', () => {
            before(() => {
                encodeString.withArgs(purchaseUnit).returns('123');
                session.privacy.orderDataHash = '321';
            });
            after(() => {
                encodeString.reset();
                session.privacy.orderDataHash = undefined;
            });
            it('should return true', () => {
                expect(isPurchaseUnitChanged(purchaseUnit)).to.be.equals(true);
            });
        });
    });

    describe('cartPaymentForm', () => {
        const cartPaymentForm = paypalHelper.__get__('cartPaymentForm');
        let data = {};

        describe('if billing agreement is disabled and paypalOrderID exists', () => {
            before(() => {
                data = {
                    paypalData: {
                        paypalOrderID: '9D681170216583748',
                        payerEmail: undefined,
                        billingAgreementId: undefined
                    }
                };
            });
            after(() => {
                data = {};
            });
            it('should return payment form object with order id', () => {
                expect(cartPaymentForm(data)).to.deep.equal({
                    billingForm: {
                        paymentMethod: {
                            value: 'PayPal'
                        },
                        paypal: {
                            paypalOrderID: {
                                value: '9D681170216583748'
                            },
                            paypalActiveAccount: {
                                htmlValue: undefined
                            },
                            billingAgreementID: {
                                htmlValue: undefined
                            },
                            makeDefaultPaypalAccount: {
                                checked: true
                            },
                            savePaypalAccount: {
                                checked: true
                            }
                        }
                    }
                });
            });
        });

        describe('if billing agreement is enabled and BA id exists', () => {
            before(() => {
                data = {
                    paypalData: {
                        paypalOrderID: undefined,
                        payerEmail: 'epamtester@pptest.com',
                        billingAgreementId: 'B-36731823N9661964X'
                    }
                };
            });
            after(() => {
                data = {};
            });
            it('should return payment form object with BA id', () => {
                expect(cartPaymentForm(data)).to.deep.equal({
                    billingForm: {
                        paymentMethod: {
                            value: 'PayPal'
                        },
                        paypal: {
                            paypalOrderID: {
                                value: undefined
                            },
                            paypalActiveAccount: {
                                htmlValue: 'epamtester@pptest.com'
                            },
                            billingAgreementID: {
                                htmlValue: 'B-36731823N9661964X'
                            },
                            makeDefaultPaypalAccount: {
                                checked: true
                            },
                            savePaypalAccount: {
                                checked: true
                            }
                        }
                    }
                });
            });
        });

        describe('if billing agreement is enabled and BA email exists', () => {
            before(() => {
                data = {
                    paypalData: {
                        paypalOrderID: undefined,
                        payerEmail: 'epamtester@pptest.com',
                        billingAgreementId: undefined
                    }
                };
            });
            after(() => {
                data = {};
            });
            it('should return payment form object with BA email', () => {
                expect(cartPaymentForm(data)).to.deep.equal({
                    billingForm: {
                        paymentMethod: {
                            value: 'PayPal'
                        },
                        paypal: {
                            paypalOrderID: {
                                value: undefined
                            },
                            paypalActiveAccount: {
                                htmlValue: 'epamtester@pptest.com'
                            },
                            billingAgreementID: {
                                htmlValue: undefined
                            },
                            makeDefaultPaypalAccount: {
                                checked: true
                            },
                            savePaypalAccount: {
                                checked: true
                            }
                        }
                    }
                });
            });
        });
    });

    describe('getBARestData', () => {
        const getBARestData = paypalHelper.__get__('getBARestData');
        let isCartFlow;
        let tokenData;
        let shipping_address = {
            line1: 'test address',
            city: 'test city',
            state: 'test state',
            postal_code: 'test postal code',
            country_code: 'US',
            recipient_name: 'Mike Test'
        };
        let basketShippingAddress = {
            getAddress1: () => 'test address',
            getCity: () => 'test city',
            getStateCode: () => 'test state',
            getPostalCode: () => 'test postal code',
            getCountryCode: () => ({
                getValue: () => 'US'
            }),
            getFullName: () => 'Mike Test'
        };

        describe('if isCartFlow is true', () => {
            before(() => {
                isCartFlow = true;
            });
            after(() => {
                isCartFlow = undefined;
            });
            it('should return object with rest data', () => {
                tokenData = {
                    path: 'v1/billing-agreements/agreement-tokens',
                    method: 'POST',
                    body: {
                        description: 'billingAgreementDescription',
                        payer:
                        {
                            payment_method: 'PAYPAL'
                        },
                        plan:
                        {
                            type: 'MERCHANT_INITIATED_BILLING_SINGLE_AGREEMENT',
                            merchant_preferences:
                            {
                                return_url: '1',
                                cancel_url: '2',
                                accepted_pymt_type: 'INSTANT',
                                skip_shipping_address: false,
                                immutable_shipping_address: false
                            }
                        }
                    }
                };
                expect(getBARestData(isCartFlow)).to.deep.equal(tokenData);
            });
        });

        describe('if isCartFlow is false', () => {
            before(() => {
                isCartFlow = false;
                getShippingAddress.returns(basketShippingAddress);
                getBAShippingAddress.withArgs(basketShippingAddress).returns(shipping_address);
            });
            after(() => {
                isCartFlow = undefined;
            });
            it('should return object with rest data', () => {
                tokenData = {
                    path: 'v1/billing-agreements/agreement-tokens',
                    method: 'POST',
                    body: {
                        description: 'billingAgreementDescription',
                        payer:
                        {
                            payment_method: 'PAYPAL'
                        },
                        plan:
                        {
                            type: 'MERCHANT_INITIATED_BILLING_SINGLE_AGREEMENT',
                            merchant_preferences:
                            {
                                return_url: '1',
                                cancel_url: '2',
                                accepted_pymt_type: 'INSTANT',
                                skip_shipping_address: false,
                                immutable_shipping_address: true
                            }
                        },
                        shipping_address: {
                            line1: 'test address',
                            city: 'test city',
                            state: 'test state',
                            postal_code: 'test postal code',
                            country_code: 'US',
                            recipient_name: 'Mike Test'
                        }
                    }
                };
                expect(getBARestData(isCartFlow)).to.deep.equal(tokenData);
            });
        });
    });

    describe('updateCustomerPhone', () => {
        const updateCustomerPhone = paypalHelper.__get__('updateCustomerPhone');
        let billingData;
        const basket = {
            getBillingAddress: stub(),
            billingAddress: {
                phone: '4084842211'
            }
        };
        const billingAddress = {
            setPhone: stub()
        };
        basket.getBillingAddress.returns(billingAddress);
        describe('if phone is entered by user, email was not already set to basket and data form is without errors', () => {
            before(() => {
                billingData = {
                    phone: {
                        value: '6505895223'
                    }
                };
                updateCustomerPhone(basket, billingData);
            });
            after(() => {
                billingData = {};
            });
            it('should set customer`s phone to basket', () => {
                assert.calledWith(billingAddress.setPhone, '6505895223');
            });
        });

        describe('if phone is entered by user and data form is with errors', () => {
            before(() => {
                billingData = {
                    form: {
                        contactInfoFields: {
                            phone: {
                                htmlValue: '6505895223'
                            }
                        }
                    }
                };
                updateCustomerPhone(basket, billingData);
            });
            after(() => {
                billingData = {};
            });
            it('should set customer`s phone to basket', () => {
                assert.calledWith(billingAddress.setPhone, '6505895223');
            });
        });
    });

    describe('updatePayPalEmail', () => {
        const updatePayPalEmail = paypalHelper.__get__('updatePayPalEmail');
        describe('if paypalPayerEmail exists in session and is equal to currentPaypalEmail', () => {
            before(() => {
                session.privacy.paypalPayerEmail = 'epamtester@pptest.com';
            });
            after(() => {
                session.privacy.paypalPayerEmail = null;
            });
            it('should be written to basketModel from session', () => {
                let params = {
                    paypalPI: {
                        custom: {
                            currentPaypalEmail: 'epamtester@pptest.com'
                        }
                    },
                    basketModel: {}
                };
                updatePayPalEmail(params);
                expect(params.basketModel.paypalPayerEmail).to.equals('epamtester@pptest.com');
            });
        });

        describe('if paypalPayerEmail exists in session and is not equal to currentPaypalEmail', () => {
            before(() => {
                session.privacy.paypalPayerEmail = 'epamtester@pptest.com';
            });
            after(() => {
                session.privacy.paypalPayerEmail = null;
            });
            it('should be written to basketModel and paypal email should be changed in payment instrument', () => {
                let params = {
                    paypalPI: {
                        custom: {
                            currentPaypalEmail: 'test@test.com'
                        }
                    },
                    basketModel: {}
                };
                updatePayPalEmail(params);
                expect(params.paypalPI.custom.currentPaypalEmail).to.equals('epamtester@pptest.com');
            });
        });

        describe('if paypalPayerEmail does not exist in session', () => {
            it('should be written to basketModel from params', () => {
                let params = {
                    paypalPI: {
                        custom: {
                            currentPaypalEmail: 'test@test.com'
                        }
                    },
                    basketModel: {}
                };
                updatePayPalEmail(params);
                expect(params.basketModel.paypalPayerEmail).to.equals('test@test.com');
            });
        });
        describe('if paypalPayerEmail does not exist in session and in params', () => {
            it('should be written to basketModel as empty string', () => {
                let params = {
                    paypalPI: {
                        custom: {}
                    },
                    basketModel: {}
                };
                updatePayPalEmail(params);
                expect(params.basketModel.paypalPayerEmail).to.equals('');
            });
        });
    });

    describe('getItemsDescription', () => {
        const getItemsDescription = paypalHelper.__get__('getItemsDescription');
        const nameLength = 127;
        let productLineItems = [];
        describe('if was provided empty array', () => {
            it('should return empty string', () => {
                expect(getItemsDescription(productLineItems)).to.equals('');
            });
        });

        describe('if provided array with products', () => {
            before(() => {
                Array.map = function (a, b) {
                    return Array.prototype.map.call(a, b);
                };
                productLineItems = [
                    {
                        productName: 'name'
                    },
                    {
                        productName: 'longName'.repeat(nameLength)
                    }
                ];
            });
            it(`should return string of length not more than ${nameLength}`, () => {
                expect(getItemsDescription(productLineItems).length <= nameLength).to.be.true;
            });
        });
    });

    describe('hasGiftCertificates', () => {
        currentBasket.giftCertificateLineItems = [
            {
                giftCertificateID: 'id'
            }
        ];

        it('should return true if basket includes one or more certificate', () => {
            expect(paypalHelper.hasGiftCertificates(currentBasket)).to.be.true;
        });

        describe('if gift certificate was not found in basket', () => {
            before(() => {
                currentBasket.giftCertificateLineItems.length = 0;
            });

            it('should return false', () => {
                expect(paypalHelper.hasGiftCertificates(currentBasket)).to.be.false;
            });
        });
    });

    describe('isPaypalButtonEnabled', () => {
        let targetPage = 'cart';

        it('should return true if \'paypalButtonLocation\' include target page', () => {
            expect(paypalHelper.isPaypalButtonEnabled(targetPage)).to.be.true;
        });

        describe('if \'paypalButtonLocation\' doesn\'t include target page', () => {
            it('should return false', () => {
                targetPage = 'pdp';
                expect(paypalHelper.isPaypalButtonEnabled(targetPage)).to.be.false;
            });
        });
    });

    describe('getGiftCertificateDescription', () => {
        const getGiftCertificateDescription = paypalHelper.__get__('getGiftCertificateDescription');
        const giftCertificateLineItems = [
            {
                lineItemText: 'text',
                recipientEmail: 'customer@mail.com'
            },
            {
                lineItemText: 'text'.repeat(200),
                recipientEmail: 'customer@mail.com'
            }
        ];
        const desctriptionLength = 127;

        it('should return string', () => {
            expect(getGiftCertificateDescription(giftCertificateLineItems)).to.be.a('string');
        });

        it(`should return description string not longer than ${desctriptionLength}`, () => {
            expect(getGiftCertificateDescription(giftCertificateLineItems).length <= desctriptionLength).to.be.true;
        });

        describe('if provided empty certificate description', () => {
            it('should return empty string', () => {
                giftCertificateLineItems.length = 0;
                expect(getGiftCertificateDescription(giftCertificateLineItems)).to.deep.equal('');
            });
        });
    });
});
