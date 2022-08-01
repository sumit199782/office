'use strict';

const page = module.superModule;
const server = require('server');

const BasketMgr = require('dw/order/BasketMgr');

const {
    validateExpiredTransaction,
    validatePaypalOnProduct
} = require('*/cartridge/scripts/paypal/middleware');

const {
    paypalPdpButtonConfig,
    billingAgreementEnabled,
    paypalStaticImageLink,
    partnerAttributionId
} = require('*/cartridge/config/paypalPreferences');

const {
    isPaypalButtonEnabled,
    getPreparedBillingFormFields
} = require('*/cartridge/scripts/paypal/helpers/paypalHelper');

const {
    getPaypalPaymentInstrument
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');

const {
    createCartSDKUrl,
    getUrls
} = require('*/cartridge/scripts/paypal/paypalUtils');

const BillingAgreementModel = require('*/cartridge/models/billingAgreement');

server.extend(page);

server.append('Show', validatePaypalOnProduct, validateExpiredTransaction, function (_, res, next) {
    var basket = BasketMgr.getCurrentBasket();
    var isPdpButtonEnabled = isPaypalButtonEnabled('pdp');
    var paypalPaymentInstrument = basket && getPaypalPaymentInstrument(basket) || null;
    var paypalEmail = paypalPaymentInstrument && paypalPaymentInstrument.custom.currentPaypalEmail;
    var defaultBA = {};
    var showStaticImage = false;

    if (customer.authenticated && billingAgreementEnabled) {
        var billingAgreementModel = new BillingAgreementModel();
        var savedPaypalBillingAgreements = billingAgreementModel.getBillingAgreements(true);

        if (!empty(savedPaypalBillingAgreements)) {
            defaultBA = billingAgreementModel.getDefaultBillingAgreement();
            // for PDP page static image is shown only in case when user has saved paypal acounts
            showStaticImage = true;
        }
    }

    res.setViewData({
        paypal: {
            sdkUrl: createCartSDKUrl(),
            partnerAttributionId: partnerAttributionId,
            pdpButtonEnabled: isPdpButtonEnabled,
            buttonConfig: paypalPdpButtonConfig,
            billingFormFields: getPreparedBillingFormFields(paypalPaymentInstrument, defaultBA),
            paypalEmail: paypalEmail,
            showStaticImage: showStaticImage,
            paypalStaticImageLink: paypalStaticImageLink,
            defaultBAemail: defaultBA.email,
            billingAgreementEnabled: billingAgreementEnabled,
            paypalUrls: JSON.stringify(getUrls())
        }
    });
    next();
});

module.exports = server.exports();
