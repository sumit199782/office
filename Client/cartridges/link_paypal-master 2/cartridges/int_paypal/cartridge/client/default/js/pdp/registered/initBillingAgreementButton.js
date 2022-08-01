import {
    getBillingAgreementToken,
    createBillingAgreementCall,
    createCartBillingFormData
} from '../../api';
import {
    addProductForPDPbtnFlow,
    appendToUrl
} from '../pdpHelper.js';
import {
    getPaypalButtonStyle
} from '../../helper';

const loaderInstance = require('../../loader');
let $loaderContainer = document.querySelector('.paypalLoader');
let loader = loaderInstance($loaderContainer);
var pid;
var uuid;
var removeFromCartUrl;

/**
 *  Create's Billing Agreement
 *
 * @returns {string} returns JSON response that includes an data token
 */
function createBillingAgreement() {
    loader.show();
    var res = addProductForPDPbtnFlow();
    if (res.cart) {
        uuid = res.pliUUID;
        removeFromCartUrl = res.cart.actionUrls.removeProductLineItemUrl;
        pid = res.pid;
    } else {
        loader.hide();
        throw new Error(res.message || 'Error occurs');
    }
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
            }, document.querySelector('.js_paypal_button_on_pdp_page'));

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
        .fail(() => {
            loader.hide();
            window.location.href = window.paypalUrls.cartPage;
        });
}

/**
 * Hides loader on paypal widget closing without errors
 * If PDP flow, removes product from basket on cancel
 */
function onCancel() {
    var urlParams = {
        pid: pid,
        uuid: uuid
    };

    $.ajax({
        url: appendToUrl(removeFromCartUrl, urlParams),
        type: 'get',
        dataType: 'json',
        success: function () {
            $.spinner().stop();
        },
        error: function () {
            $.spinner().stop();
        }
    });
    loader.hide();
}

/**
 * Shows errors if paypal widget was closed with errors
 * If PDP flow, removes product from basket on error
 */
function onError() {
    if (pid) {
        var urlParams = {
            pid: pid,
            uuid: uuid
        };

        $.ajax({
            url: appendToUrl(removeFromCartUrl, urlParams),
            type: 'get',
            dataType: 'json',
            success: function () {
                $.spinner().stop();
            },
            error: function () {
                $.spinner().stop();
            }
        });
    }
    loader.hide();
    window.location.href = window.paypalUrls.cartPage;
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
        style: getPaypalButtonStyle(document.querySelector('.js_paypal_button_on_pdp_page'))
    }).render('.paypal-pdp-button')
        .then(() => {
            loader.hide();
        });
}

export default initPaypalBAButton;
