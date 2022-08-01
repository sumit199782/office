var WhBaseModel = require('*/cartridge/models/whBase');

const {
    updateOrderPaymentStatus
} = require('*/cartridge/scripts/paypal/helpers/authorizationAndCaptureWhHelper');
const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');

/**
 * authorizationWhMgr model
 */
function authorizationAndCaptureWhMgr() {
    WhBaseModel.apply(this, arguments);
}

authorizationAndCaptureWhMgr.prototype = Object.create(WhBaseModel.prototype);

/**
 * Voids payment on demandware sides
 * @param {w.order.Order} order Order instance
 * @param {string} paymentStatus Status of payment
 */
authorizationAndCaptureWhMgr.prototype.voidPaymentOnDwSide = function (order, paymentStatus) {
    updateOrderPaymentStatus(order, paymentStatus);
};

/**
 * Refunds payment on demandware sides
 * @param {dw.order.Order} order Order instance
 * @param {string} paymentStatus Status of payment
 */
authorizationAndCaptureWhMgr.prototype.refundPaymentOnDwSide = function (order, paymentStatus) {
    updateOrderPaymentStatus(order, paymentStatus);
};

/**
 * Completes payment on demandware sides
 * @param {dw.order.Order} order Order instance
 * @param {string} paymentStatus Status of payment
 */
authorizationAndCaptureWhMgr.prototype.completePaymentOnDwSide = function (order, paymentStatus) {
    updateOrderPaymentStatus(order, paymentStatus);
};

/**
 * Cheks if endpoint received a valid event
 * @param {string} eventType Evant type
 * @returns {boolean} True if event type is approptiate to endpoint
 */
authorizationAndCaptureWhMgr.prototype.isApproppriateEventType = function (eventType) {
    var eventTypes = [
        paypalConstants.PAYMENT_CAPTURE_REFUNDED,
        paypalConstants.PAYMENT_CAPTURE_COMPLETED,
        paypalConstants.PAYMENT_AUTHORIZATION_VOIDED
    ];

    if (eventTypes.indexOf(eventType) === -1) {
        return false;
    }

    return true;
};

module.exports = authorizationAndCaptureWhMgr;
