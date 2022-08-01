'use strict';

var PaymentMgr = require('dw/order/PaymentMgr');

var allowedProcessorsIds = 'PAYPAL';

/**
 * Returns paypal payment method ID
 * @returns {string} active paypal payment method id
 */
function getPaypalPaymentMethodId() {
    var activePaymentMethods = PaymentMgr.getActivePaymentMethods();
    var paypalPaymentMethodID;

    Array.some(activePaymentMethods, function (paymentMethod) {
        if (paymentMethod.paymentProcessor.ID === allowedProcessorsIds) {
            paypalPaymentMethodID = paymentMethod.ID;

            return true;
        }

        return false;
    });

    return paypalPaymentMethodID;
}

/**
 * Returns PayPal order payment instrument
 * @param {dw.order.BasketMgr} basket current basket
 * @returns {dw.order.OrderPaymentInstrument} payment instrument with id PAYPAL
 */
function getPaypalPaymentInstrument(basket) {
    var paymentInstruments = basket.getPaymentInstruments(getPaypalPaymentMethodId());

    return !empty(paymentInstruments) && paymentInstruments[0];
}

module.exports = {
    getPaypalPaymentInstrument: getPaypalPaymentInstrument
};
