import {
    showCartErrorHtml,
    createCartBillingFormData
} from '../api';
import {
    getPaypalButtonStyle
} from '../helper';

var loaderInstance = require('../loader');
var $loaderContainer = document.querySelector('.paypalLoader');
var loader = loaderInstance($loaderContainer);
var usedPaymentMethod;

/**
 * Saves used payment method to variable
 *
 * @param {Object} data - object with data
 */
function onClick(data) {
    if (data.fundingSource === 'venmo') {
        usedPaymentMethod = 'Venmo';
    }
}

/**
 *  Gets purchase units object, creates order and returns object with data
 *
 * @param {Object} _ - arg
 * @param {Object} actions - paypal actions
 * @returns {Object} with purchase units data and application context
 */
function createOrder(_, actions) {
    loader.show();
    return $
        .get(window.paypalUrls.getCartPurchaseUnit)
        .then(function ({ purchase_units }) {
            let parsedPurchaseUnit = purchase_units[0];
            if (JSON.parse(parsedPurchaseUnit.amount.value) === 0) {
                showCartErrorHtml('Order total 0 is not allowed for PayPal');
            }
            const application_context = {
                shipping_preference: parsedPurchaseUnit.shipping_preference
            };
            loader.hide();
            return actions.order.create({
                purchase_units,
                application_context
            });
        });
}

/**
 *  Makes post call and transfers order ID to returnFromCart endpoint, goes to checkout place order stage
 *
 * @param {Object} orderID - order id
 */
function onApprove({ orderID }) {
    let cartBillingFormData = createCartBillingFormData({
        paypalOrderID: orderID,
        usedPaymentMethod: usedPaymentMethod
    }, document.querySelector('.js_paypal_button_on_cart_page'));

    $.ajax({
        type: 'POST',
        url: window.paypalUrls.returnFromCart,
        contentType: false,
        data: cartBillingFormData,
        processData: false,
        success: () => {
            loader.hide();
            window.location.href = window.paypalUrls.placeOrderStage;
        },
        error: function () {
            loader.hide();
            if (window.location.href !== window.paypalUrls.cartPage) {
                window.location.href = window.paypalUrls.cartPage;
            }
            if (!document.querySelector('.cartError')) {
                showCartErrorHtml('An internal server error has occurred. \r\nRetry the request later.');
            }
        }
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
    if (!document.querySelector('.cartError')) {
        showCartErrorHtml('An internal server error has occurred. \r\nRetry the request later.');
    }
}

/**
 *Inits paypal button on cart page
 */
function initPaypalButton() {
    loader.show();
    window.paypal.Buttons({
        onClick,
        createOrder,
        onApprove,
        onCancel,
        onError,
        style: getPaypalButtonStyle(document.querySelector('.js_paypal_button_on_cart_page'))
    }).render('.paypal-cart-button')
        .then(() => {
            loader.hide();
        });
}

export default initPaypalButton;
