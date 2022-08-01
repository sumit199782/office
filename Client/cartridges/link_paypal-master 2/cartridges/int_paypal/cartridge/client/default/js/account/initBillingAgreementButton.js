import { getBillingAgreementToken, createBillingAgreementCall } from '../api';

const loaderInstance = require('../loader');
let $loaderContainer = document.querySelector('.paypalLoader');
let loader = loaderInstance($loaderContainer);

/**
 *  Creates Billing Agreement
 *
 * @returns {string} returns JSON response that includes an data token
 */
function createBillingAgreement() {
    loader.show();
    let isCartFlow = true;
    return getBillingAgreementToken(isCartFlow)
        .then((data) => data.token)
        .fail(() => {
            loader.hide();
        });
}

/**
 *  Makes post call using facilitator Access Token and transfers billingToken
 *  send baID & email to saveBillingAgreement endpoint
 *
 * @param {string} billingToken - billing agreement token
 * @returns {Object} JSON response that includes the billing agreement ID and information about the payer
 */
function onApprove({ billingToken }) {
    return createBillingAgreementCall(billingToken)
        .then(({ id, payer }) => {
            let email = payer.payer_info.email;
            return $.ajax({
                url: window.paypalUrls.saveBillingAgreement,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ baID: id, email })
            });
        })
        .then(() => {
            loader.hide();
            location.reload();
        })
        .fail(() => {
            loader.hide();
        });
}

/**
 * Hides loader on paypal widget closing without errors

 */
function onCancel() {
    loader.hide();
}

/**
 * Shows errors if paypal widget was closed with errors
 *
 */
function onError() {
    loader.hide();
}

/**
 *Inits paypal Billing Agreement button on billing checkout page
 */
function initPaypalBAButton() {
    loader.show();
    window.paypal.Buttons({
        createBillingAgreement,
        onApprove,
        onCancel,
        onError
    }).render('.paypal-account-button')
        .then(() => {
            loader.hide();
        });
}

export default initPaypalBAButton;
