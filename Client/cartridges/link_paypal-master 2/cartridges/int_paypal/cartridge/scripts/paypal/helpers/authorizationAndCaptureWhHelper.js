'use strict';

const Transaction = require('dw/system/Transaction');
const {
    getPaypalPaymentInstrument
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');
const CustomObject = require('dw/object/CustomObject');

var autorizationAndCaptureWhHelper = {};

/**
 * Updates payment status of order in the Business manager
 * @param {dw.order.Order} order Order instance
 * @param {string} paymentStatus Payment Status
 */
autorizationAndCaptureWhHelper.updateOrderPaymentStatus = function (order, paymentStatus) {
    Transaction.wrap(function () {
        // If the transaction was created through business manager - updates a custom object, through storefront - DW Payment Instrument.
        if (order instanceof CustomObject) {
            // Updates order custom payment status of a PayPalNewTransactions Custom Object
            order.custom.paymentStatus = paymentStatus;
        } else {
            var paymentInstrument = getPaypalPaymentInstrument(order);

             // Updates order paypal payment status
            paymentInstrument.custom.paypalPaymentStatus = paymentStatus;
        }
    });
};

module.exports = autorizationAndCaptureWhHelper;
