'use strict';

const page = module.superModule;
const server = require('server');

const Money = require('dw/value/Money');
const BasketMgr = require('dw/order/BasketMgr');
const StringUtils = require('dw/util/StringUtils');
const Resource = require('dw/web/Resource');

const {
    validateExpiredTransaction,
    validatePaypalOnCheckout
} = require('*/cartridge/scripts/paypal/middleware');

const {
    getPaypalPaymentInstrument
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');

const {
    createBillingSDKUrl,
    getUrls,
    createConnectWithPaypalUrl
} = require('*/cartridge/scripts/paypal/paypalUtils');

const BillingAgreementModel = require('*/cartridge/models/billingAgreement');
const prefs = require('*/cartridge/config/paypalPreferences');
const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');

server.extend(page);


server.append('Begin', validatePaypalOnCheckout, validateExpiredTransaction, function (_, res, next) {
    var basket = BasketMgr.getCurrentBasket();
    var currency = basket.getCurrencyCode();
    var paypalPaymentInstrument = getPaypalPaymentInstrument(basket);
    var paymentAmount = new Money(0, currency);
    var paypalOrderID = '';
    var amount;
    var isBALimitReached;
    var hasDefaultPaymentMethod;
    var savedPaypalBillingAgreements;
    var paypalEmail;
    var isAccountAlreadyExist = false;
    var activeBAEmail;
    var activeBAID;
    var isVenmoUsed = false;

    if (customer.authenticated && prefs.billingAgreementEnabled) {
        var billingAgreementModel = new BillingAgreementModel();
        savedPaypalBillingAgreements = billingAgreementModel.getBillingAgreements(true);
        isBALimitReached = billingAgreementModel.isBaLimitReached();
        hasDefaultPaymentMethod = !empty(savedPaypalBillingAgreements);
        if (paypalPaymentInstrument) {
            isAccountAlreadyExist = billingAgreementModel.isAccountAlreadyExist(paypalPaymentInstrument.custom.currentPaypalEmail);
        }
    }

    if (paypalPaymentInstrument) {
        if (!empty(paypalPaymentInstrument.custom.PP_API_ActiveBillingAgreement)) {
            var activeBillingAgreement = JSON.parse(paypalPaymentInstrument.custom.PP_API_ActiveBillingAgreement);
            activeBAEmail = activeBillingAgreement.email;
            activeBAID = activeBillingAgreement.baID;
            // Checkout from PDP/Minicart/Cart
            if (activeBillingAgreement.default && activeBillingAgreement.saveToProfile) {
                hasDefaultPaymentMethod = true;
            }
        }
        amount = paypalPaymentInstrument.paymentTransaction.amount.value;
        paymentAmount = new Money(amount, currency);
        paypalEmail = paypalPaymentInstrument.custom.currentPaypalEmail;
        isVenmoUsed = paypalPaymentInstrument.custom.paymentId === paypalConstants.PAYMENT_METHOD_ID_VENMO;
        if (paypalPaymentInstrument.custom.paypalOrderID) {
            paypalOrderID = paypalPaymentInstrument.custom.paypalOrderID;
        }
    }

    res.setViewData({
        paypal: {
            paymentAmount: StringUtils.formatMoney(paymentAmount),
            prefs: prefs,
            paypalEmail: paypalEmail,
            partnerAttributionId: prefs.partnerAttributionId,
            buttonConfig: prefs.paypalBillingButtonConfig,
            customerPaypalPaymentInstruments: savedPaypalBillingAgreements,
            hasDefaultPaymentMethod: hasDefaultPaymentMethod,
            paypalOrderID: paypalOrderID,
            isBALimitReached: isBALimitReached,
            sdkUrl: createBillingSDKUrl(),
            paypalUrls: JSON.stringify(getUrls()),
            isAccountAlreadyExist: isAccountAlreadyExist,
            activeBAEmail: activeBAEmail,
            activeBAID: activeBAID,
            // Used only for 'Connect with Paypal' feature
            connectWithPaypalButtonUrl: createConnectWithPaypalUrl(res.viewData.oAuthReentryEndpoint),
            connectWithPaypalStaticImageLink: prefs.connectWithPaypalStaticImageLink,
            connectWithPaypalStaticImageAlt: Resource.msg('paypal.connect.with.paypal.image.alt', 'locale', null),
            isVenmoUsed: isVenmoUsed
        }
    });
    next();
});

module.exports = server.exports();
