/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import { getBillingAgreementToken, createBillingAgreementCall, showCheckoutErrorHtml } from '../../api';
import { clearSessionOption, updateSessionOption, setBAFormValues } from './billingAgreementHelper';
import { getPaypalButtonStyle } from '../../helper';

const loaderInstance = require('../../loader');
let $loaderContainer = document.querySelector('.paypalLoader');
let loader = loaderInstance($loaderContainer);

/**
 *  Create's Billing Agreement
 *
 * @returns {string} returns JSON response that includes an data token
 */
function createBillingAgreement() {
    loader.show();
    return getBillingAgreementToken()
        .then((data) => data.token)
        .fail(() => {
            loader.hide();
        });
}

/**
 *  Makes post call using facilitator Access Token and transfers billingToken
 *  save's billingAgreementID & billingAgreementPayerEmail to input field
 *  and triggers checkout place order stage
 *
 * @param {string} billingToken - billing agreement token
 * @returns {Object} JSON response that includes the billing agreement ID and information about the payer
 */
function onApprove({ billingToken }) {
    return createBillingAgreementCall(billingToken)
        .then(({ id, payer }) => {
            let payerInfo = payer.payer_info;
            let billingAddress = payerInfo.billing_address;
            let $restPaypalAccountsList = document.querySelector('#restPaypalAccountsList');
            let hasDefaultPaymentMethod = JSON.parse($restPaypalAccountsList.getAttribute('data-has-default-account'));
            let hasPPSavedAccount = JSON.parse($restPaypalAccountsList.getAttribute('data-has-saved-account'));
            document.querySelector('#sessionPaypalAccount').setAttribute('data-ba-id', id);
            setBAFormValues(id, payerInfo.email);

            if (hasDefaultPaymentMethod && !hasPPSavedAccount) {
                $restPaypalAccountsList.setAttribute('data-has-default-account', false);
                $('#restPaypalAccountsList').data('data-has-default-account', false); // MFRA jquery hack
            }

            let billingAddressFields = [];
            let contactInfoFields = [].slice.call(document.querySelectorAll('.contact-info-block input[required]'));

            var keysValues = {
                email: payerInfo.email,
                phoneNumber: payerInfo.phone,
                billingFirstName: payerInfo.first_name,
                billingLastName: payerInfo.last_name,
                billingAddressOne: billingAddress.line1,
                billingCountry: billingAddress.country_code,
                billingState: billingAddress.state,
                billingAddressCity: billingAddress.city,
                billingZipCode: billingAddress.postal_code
            };
            let $billinAddressBlock = document.querySelector('.billing-address-block');
            if ($billinAddressBlock.querySelector('#billingAddressSelector option:checked').value === 'new') {
                billingAddressFields = [].slice.call($billinAddressBlock.querySelectorAll('input[required], select[required]'));
            }

            (contactInfoFields.concat(billingAddressFields)
                .filter(el => el.value.trim() === ''))
                .forEach(function (el) {
                    el.value = keysValues[el.id];
                });

            document.querySelector('button.submit-payment').click();
            var sameAttribute = [].slice.call($restPaypalAccountsList.options)
                    .find(el => el.value === payerInfo.email);

            (sameAttribute && sameAttribute.id !== 'sessionPaypalAccount') ?
                clearSessionOption() :
                updateSessionOption(payerInfo.email);

            loader.hide();
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
    showCheckoutErrorHtml('An internal server error has occurred. \r\nRetry the request later.');
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
        onError,
        style: getPaypalButtonStyle(document.querySelector('.paypal-checkout-ba-button'))
    }).render('.paypal-checkout-ba-button')
        .then(() => {
            loader.hide();
        });
}

export default initPaypalBAButton;
