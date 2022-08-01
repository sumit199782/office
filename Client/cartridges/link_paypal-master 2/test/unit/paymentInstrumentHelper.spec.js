/* eslint-disable no-underscore-dangle */
const { paymentInstrumentHelperPath } = require('./path');
const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');
const { stub } = require('sinon');


require('dw-api-mock/demandware-globals');
require('babel-register')({
    plugins: ['babel-plugin-rewire']
});
const paypalProcessorId = 'PAYPAL';
const paypalPaymentMethodId = 'PayPal';

const paymentInstrumentHelper = proxyquire(paymentInstrumentHelperPath, {
    '*/cartridge/config/paypalPreferences': {
        paypalProcessorId,
        paypalPaymentMethodId
    }
});

describe('paymentInstrmentHelper file', () => {
    describe('getPaypalPaymentInstrument', () => {
        const getPaypalPaymentInstrument = paymentInstrumentHelper.__get__('getPaypalPaymentInstrument');
        let basket;
        let paymentInstruments;
        describe('if paymentInstrument with paypal as payment method id is not empty', () => {
            before(() => {
                paymentInstruments = [{ Array: {} }];
                basket = {
                    getPaymentInstruments: () => {
                        return paymentInstruments;
                    }
                };
            });
            after(() => {
                basket = {};
                paymentInstruments = null;
            });
            it('return paypal payment instrument', () => {
                expect(getPaypalPaymentInstrument(basket)).to.be.equal(paymentInstruments[0]);
            });
        });

        describe('if payment instrument is empty', () => {
            before(() => {
                paymentInstruments = [{}];
                basket = {
                    getPaymentInstruments: () => {
                        () => {
                            return paymentInstruments;
                        };
                    }
                };
            });
            after(() => {
                basket = {};
                paymentInstruments = null;
            });
            it('return false', () => {
                expect(getPaypalPaymentInstrument(basket)).to.be.equal(false);
            });
        });
    });
});

describe('calculateNonGiftCertificateAmount', () => {
    const calculateNonGiftCertificateAmount = paymentInstrumentHelper.__get__('calculateNonGiftCertificateAmount');
    let Decimal = function (value) {
        this.value = value;
    };
    Decimal.prototype.subtract = function (money) {
        return new Decimal(this.value - money.value);
    };
    Decimal.prototype.value = null;

    let getAmount = new dw.value.Money(20);
    const gcPaymentInstrs = {
        iterator: () => {
            return new dw.util.Iterator([{
                getPaymentTransaction: () => ({
                    getAmount: () => {
                        return getAmount;
                    }
                })
            }]);
        }
    };

    let lineItemCtnr = {
        currencyCode: 'USD',
        getGiftCertificatePaymentInstruments: () => gcPaymentInstrs,
        totalGrossPrice: new dw.value.Money(100)
    };

    it('should return amount after discount', () => {
        expect(calculateNonGiftCertificateAmount(lineItemCtnr).value).to.be.equal(80);
    });
});

describe('removePaypalPaymentInstrument', () => {
    describe('if payment instrument of basket was not provided', () => {
        const basket = {
            getPaymentInstruments: stub()
        };

        before(() => {
            basket.getPaymentInstruments.returns(null);
        });

        it('should return undefined', () => {
            expect(paymentInstrumentHelper.removePaypalPaymentInstrument(basket)).to.be.undefined;
        });
    });
});

describe('getPaymentInstrumentAction', () => {
    const responseKeys = ['noOrderIdChange', 'isOrderIdChanged', 'checkBillingAgreement'];
    const paymentInstrument = {
        custom: {
            paypalOrderID: 'id',
            PP_API_ActiveBillingAgreement: 'agreement'
        }
    };
    const paypalForm = {
        paypalOrderID: {
            htmlValue: 'id'
        }
    };

    it('should return an object', () => {
        expect(paymentInstrumentHelper.getPaymentInstrumentAction(paymentInstrument, paypalForm)).to.be.a('object');
    });

    it('should return not empty object', () => {
        expect(paymentInstrumentHelper.getPaymentInstrumentAction(paymentInstrument, paypalForm)).to.not.be.empty;
    });

    it('should return object with isOrderIdChanged key and false value', () => {
        expect(paymentInstrumentHelper.getPaymentInstrumentAction(paymentInstrument, paypalForm).isOrderIdChanged).to.be.false;
    });

    responseKeys.forEach((key) => {
        it(`should return ${key} key`, () => {
            expect(paymentInstrumentHelper.getPaymentInstrumentAction(paymentInstrument, paypalForm)).to.contain.key(key);
        });
    });

    describe('if id of payment instrument and form is different', () => {
        before(() => {
            paymentInstrument.custom.paypalOrderID = 'newId';
        });

        it('should return object with isOrderIdChanged key and true value', () => {
            expect(paymentInstrumentHelper.getPaymentInstrumentAction(paymentInstrument, paypalForm).isOrderIdChanged).to.be.true;
        });
    });

    describe('createPaymentInstrument', () => {
        let getPaymentMethod;
        let amount = new dw.value.Money(10);
        const instrument = {
            paymentTransaction: {
                setPaymentProcessor: stub()
            }
        };
        const basket = {
            totalGrossPrice: new dw.value.Money(20),
            getGiftCertificatePaymentInstruments: () => ({
                iterator: () => {
                    return new dw.util.Iterator([{
                        getPaymentTransaction: () => ({
                            getAmount: () => {
                                return amount;
                            }
                        })
                    }]);
                }
            }),
            createPaymentInstrument: () => (instrument)
        };
        const paymentType = 'PayPal';

        before(() => {
            getPaymentMethod = stub(dw.order.PaymentMgr, 'getPaymentMethod');
            getPaymentMethod.returns({
                getPaymentProcessor: () => ({})
            });
        });

        after(() => {
            getPaymentMethod.reset();
        });

        it('should be an object', () => {
            expect(paymentInstrumentHelper.createPaymentInstrument(basket, paymentType)).to.be.a('object');
        });

        it('should return not empty object', () => {
            expect(paymentInstrumentHelper.getPaymentInstrumentAction(paymentInstrument, paypalForm)).to.not.be.empty;
        });

        it('should create and return payment instruments', () => {
            expect(paymentInstrumentHelper.createPaymentInstrument(basket, paymentType)).to.deep.equal(instrument);
        });
    });

    describe('removeNonPayPalPaymentInstrument', () => {
        let paymentInstruments = [
            {
                paymentMethod: 'PayPal'
            },
            {
                paymentMethod: 'CREDIT_CARD'
            },
            {
                paymentMethod: 'GIFT_CERTIFICATE'
            }
        ];
        const basket = {
            getPaymentInstruments: () => ({
                iterator: () => {
                    return new dw.util.Iterator(paymentInstruments);
                }
            }),
            removePaymentInstrument: (instrument) => {
                paymentInstruments.forEach((inst) => {
                    paymentInstruments.splice(paymentInstruments.indexOf(inst.paymentMethod === instrument.paymentMethod), 1);
                });
            }
        };

        beforeEach(() => {
            paymentInstrumentHelper.removeNonPayPalPaymentInstrument(basket);
        });

        afterEach(() => {
            paymentInstruments = [
                {
                    paymentMethod: 'PayPal'
                },
                {
                    paymentMethod: 'CREDIT_CARD'
                },
                {
                    paymentMethod: 'GIFT_CERTIFICATE'
                }
            ];
        });

        describe('should delete instruments except \'GIFT_CERTIFICATE\'', () => {
            it('should return true', () => {
                expect(paymentInstruments.length === 1).to.be.true;
            });
        });

        describe('should delete all instruments if \'GIFT_CERTIFICATE\' was not provided', () => {
            before(() => {
                paymentInstruments = [
                    {
                        paymentMethod: 'PayPal'
                    },
                    {
                        paymentMethod: 'CREDIT_CARD'
                    }
                ];
                paymentInstrumentHelper.removeNonPayPalPaymentInstrument(basket);
            });

            it('should return true', () => {
                expect(paymentInstruments.length === 0).to.be.true;
            });
        });
    });
});
