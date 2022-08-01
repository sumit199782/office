'use strict';

const page = module.superModule;
const server = require('server');

const BasketMgr = require('dw/order/BasketMgr');

const {
    validateExpiredTransaction,
    validatePaypalOnCheckout
} = require('*/cartridge/scripts/paypal/middleware');

const {
    billingAgreementEnabled,
    paypalCartButtonConfig,
    paypalMinicartButtonConfig,
    partnerAttributionId,
    paypalStaticImageLink
} = require('*/cartridge/config/paypalPreferences');

const {
    isPaypalButtonEnabled,
    getPurchaseUnit,
    getPreparedBillingFormFields
} = require('*/cartridge/scripts/paypal/helpers/paypalHelper');

const {
    createCartSDKUrl,
    getUrls,
    encodeString
} = require('*/cartridge/scripts/paypal/paypalUtils');

const {
    getPaypalPaymentInstrument
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');

const BillingAgreementModel = require('*/cartridge/models/billingAgreement');

const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');

server.extend(page);

/**
 * General function for cart and minicart enpoints until logic are the same
 * @param  {Object} req request
 * @param  {Object} res response
 * @param  {Object} next next call
 * @returns {void}
 */
function payPalCartHandler(req, res, next) {
    var basket = BasketMgr.getCurrentBasket();
    var endpointName = this.name.toLowerCase() === 'show' ? 'cart' : 'minicart';
    var isCartButtonEnabled = isPaypalButtonEnabled(endpointName);

    var paypalPaymentInstrument = basket && getPaypalPaymentInstrument(basket) || null;
    var paypalEmail = paypalPaymentInstrument && paypalPaymentInstrument.custom.currentPaypalEmail;
    var isVenmoUsed = paypalPaymentInstrument && paypalPaymentInstrument.custom.paymentId === paypalConstants.PAYMENT_METHOD_ID_VENMO;
    var defaultBA = {};
    // for guest with paypalEmail from PI
    var showStaticImage = !!paypalEmail;

    if (customer.authenticated && billingAgreementEnabled) {
        var billingAgreementModel = new BillingAgreementModel();
        var savedPaypalBillingAgreements = billingAgreementModel.getBillingAgreements(true);

        if (!empty(savedPaypalBillingAgreements)) {
            defaultBA = billingAgreementModel.getDefaultBillingAgreement();
            showStaticImage = true;
        }
    }

    // Setting orderDataHash explisitly for route Paypal-UpdateOrderDetails when isUpdateRequired(isPaypalInstrumentExist)
    var purchase_units = [getPurchaseUnit(basket, true)];
    session.privacy.orderDataHash = encodeString(purchase_units[0]);

    res.setViewData({
        paypal: {
            sdkUrl: createCartSDKUrl(),
            partnerAttributionId: partnerAttributionId,
            cartButtonEnabled: isCartButtonEnabled,
            buttonConfig: endpointName === 'cart' ? paypalCartButtonConfig : paypalMinicartButtonConfig,
            billingFormFields: getPreparedBillingFormFields(paypalPaymentInstrument, defaultBA),
            paypalEmail: paypalEmail,
            showStaticImage: showStaticImage,
            paypalStaticImageLink: paypalStaticImageLink,
            defaultBAemail: defaultBA.email,
            isPaypalInstrumentExist: paypalPaymentInstrument && !empty(paypalPaymentInstrument),
            billingAgreementEnabled: billingAgreementEnabled,
            paypalUrls: JSON.stringify(getUrls()),
            isVenmoUsed: isVenmoUsed
        }
    });
    next();
}

server.append('Show', validatePaypalOnCheckout, validateExpiredTransaction, payPalCartHandler);

server.append('MiniCartShow', validatePaypalOnCheckout, validateExpiredTransaction, payPalCartHandler);

module.exports = server.exports();
