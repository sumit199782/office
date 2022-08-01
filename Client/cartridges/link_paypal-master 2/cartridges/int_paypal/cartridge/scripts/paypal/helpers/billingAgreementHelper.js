'use strict';

/**
 * Get PayPal Billing Agreement
 *
 * @param {Object} billingForm - current customer billing Form
 * @returns {Object} billingAgreement - selected Billing Agreement
 */
function createBaFromForm(billingForm) {
    return {
        baID: billingForm.paypal.billingAgreementID.htmlValue,
        default: billingForm.paypal.makeDefaultPaypalAccount.checked,
        email: billingForm.paypal.billingAgreementPayerEmail.htmlValue,
        saveToProfile: billingForm.paypal.savePaypalAccount.checked
    };
}

/**
 * Compare form billing agreement email with saved billing agreement email under paypal Payment Instrument
 *
 * @param {string} activeBA - current saved paypal Payment Instrument ba
 * @param {Object} formBA - current customer  ba billingForm
 * @returns {boolean} true or false
 */
function isSameBillingAgreement(activeBA, formBA) {
    return activeBA.email === formBA.email &&
        activeBA.default === formBA.default &&
        activeBA.saveToProfile === formBA.saveToProfile;
}

module.exports = {
    createBaFromForm: createBaFromForm,
    isSameBillingAgreement: isSameBillingAgreement
};
