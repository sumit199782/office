import {
    getBillingAgreementToken,
    createBillingAgreementCall,
    showCartErrorHtml,
    createCartBillingFormData
} from '../../api';
import {
    getPaypalButtonStyle
} from '../../helper';

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
    let isCartFlow = true;
    return getBillingAgreementToken(isCartFlow)
        .then((data) => data.token)
        .fail(() => {
            loader.hide();
        });
}

/**
 *  Makes post call and transfers billingToken to returnFromCart endpoint, triggers checkout (stage = place order)
 *
 * @param {string} billingToken - billing agreement token
 * @returns {Object} JSON response that includes the billing agreement ID and information about the payer
 */
function onApprove({ billingToken }) {
    return createBillingAgreementCall(billingToken)
        .then(({ id, payer }) => {
            let cartBillingFormData = createCartBillingFormData({
                billingAgreementID: id,
                billingAgreementPayerEmail: payer.payer_info.email
            }, document.querySelector('.js_paypal_button_on_cart_page'));

            return $.ajax({
                type: 'POST',
                url: window.paypalUrls.returnFromCart,
                data: cartBillingFormData,
                contentType: false,
                processData: false,
                dataType: 'json'
            });
        })
        .then(() => {
            loader.hide();
            window.location.href = window.paypalUrls.placeOrderStage;
        })
        .fail((err) => {
            loader.hide();
            if (window.location.href !== window.paypalUrls.cartPage) {
                window.location.href = window.paypalUrls.cartPage;
            }
            showCartErrorHtml(err.responseText);
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
 */
function onError() {
    loader.hide();
    if (window.location.href !== window.paypalUrls.cartPage) {
        window.location.href = window.paypalUrls.cartPage;
    }
    showCartErrorHtml('An internal server error has occurred. \r\nRetry the request later.');
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
        style: getPaypalButtonStyle(document.querySelector('.js_paypal_button_on_cart_page'))
    }).render('.paypal-cart-button')
        .then(() => {
            loader.hide();
        });
}

export default initPaypalBAButton;
