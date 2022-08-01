'use strict';

const {
    getPaypalPaymentInstrument
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');

const BillingAgreementModel = require('*/cartridge/models/billingAgreement');

/**
 * This function is to handle the post payment authorization customizations
 * Updating of Saving Billing Agreement to DB
 * @param {Object} result - Authorization Result
 * @param {Object} order - Current order
 * @returns {Object} response {}
 */
function postAuthorization(result, order) { // eslint-disable-line no-unused-vars
    var paypalPaymentInstrument = getPaypalPaymentInstrument(order);
    var isActiveBillingAgreement = customer.authenticated && paypalPaymentInstrument && paypalPaymentInstrument.custom.PP_API_ActiveBillingAgreement;

    if (isActiveBillingAgreement) {
        var activeBillingAgreement = JSON.parse(paypalPaymentInstrument.custom.PP_API_ActiveBillingAgreement);
        var billingAgreementModel = new BillingAgreementModel();
        var isAccountAlreadyExist = billingAgreementModel.isAccountAlreadyExist(activeBillingAgreement.email);
        if (isAccountAlreadyExist) {
            billingAgreementModel.updateBillingAgreement(activeBillingAgreement);
        } else {
            billingAgreementModel.saveBillingAgreement(activeBillingAgreement);
        }
    }

    return {};
}

exports.postAuthorization = postAuthorization;
