'use strict';
const server = require('server');

const BasketMgr = require('dw/order/BasketMgr');
const OrderMgr = require('dw/order/OrderMgr');
const PaymentMgr = require('dw/order/PaymentMgr');
const HookMgr = require('dw/system/HookMgr');
const Resource = require('dw/web/Resource');

const {
    getPaypalPaymentInstrument,
    removePaypalPaymentInstrument,
    removeNonPayPalPaymentInstrument,
    calculateNonGiftCertificateAmount
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');

const {
    isExpiredTransaction,
    isPaypalButtonEnabled
} = require('*/cartridge/scripts/paypal/helpers/paypalHelper');

const {
    createErrorMsg,
    getUrls,
    createErrorLog
} = require('*/cartridge/scripts/paypal/paypalUtils');

const {
    paypalPaymentMethodId
} = require('*/cartridge/config/paypalPreferences');

const accountHelpers = require('*/cartridge/scripts/helpers/accountHelpers');

const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');

/**
 * Middleware to check if transaction is expired on payment stage (CheckoutServices.js)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateExpiredTransaction(req, res, next) {
    var basket = BasketMgr.getCurrentBasket();

    if (empty(basket)) return next();

    var expiredTransaction = isExpiredTransaction(getPaypalPaymentInstrument(basket));

    if (!expiredTransaction) return next();

    removePaypalPaymentInstrument(basket);
    switch (this.name) {
        case 'UpdateOrderDetails':
            res.setStatusCode(500);
            res.json({
                transactionExpired: true,
                errorMsg: createErrorMsg('expiredpayment')
            });
            this.emit('route:Complete', req, res);
            break;
        case 'SubmitPayment':
            res.json({
                form: server.forms.getForm('billing'),
                fieldErrors: [],
                serverErrors: [createErrorMsg('expiredpayment')],
                error: true,
                redirectUrl: getUrls().paymentStage,
                cartError: true
            });
            this.emit('route:Complete', req, res);
            break;
        default:
            next();
            break;
    }
    return;
}

/**
 * Middleware to validate payment method and remove unnecessary
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validatePaymentMethod(req, res, next) {
    var basket = BasketMgr.getCurrentBasket();

    if (!basket) return next();

    var paymentInstruments = basket.getPaymentInstruments();
    var paypalPaymentInstrument = getPaypalPaymentInstrument(basket);
    var billingForm = server.forms.getForm('billing');

    // if change payment from paypal to different one we remove paypal as payment instrument
    if (paypalPaymentInstrument && billingForm.paymentMethod.htmlValue !== paypalPaymentMethodId) {
        removePaypalPaymentInstrument(basket);
        return next();
    }
    // if change payment method from different one to paypal we remove already existing payment instrument
    if (!empty(paymentInstruments) && !paypalPaymentInstrument && billingForm.paymentMethod.htmlValue === paypalPaymentMethodId) {
        removeNonPayPalPaymentInstrument(basket);
        return next();
    }

    return next();
}

/**
 * Middleware to validate whether paypal enabled on storefront
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateWhetherPaypalEnabled(req, res, next) {
    if (paypalPaymentMethodId) return next();

    this.emit('route:Complete', req, res);
    return;
}

/**
 * Middleware to validate if paypal data exists on product
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validatePaypalOnProduct(req, res, next) {
    if (!paypalPaymentMethodId || !isPaypalButtonEnabled('pdp')) {
        this.emit('route:Complete', req, res);
        return;
    }

    return next();
}

/**
 * Middleware to validate if paypal data exists on cart/minicart
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validatePaypalOnCheckout(req, res, next) {
    var basket = BasketMgr.getCurrentBasket();

    switch (this.name) {
        case 'Show':
            if (!basket || !paypalPaymentMethodId || !isPaypalButtonEnabled('cart')) {
                this.emit('route:Complete', req, res);
                return;
            }
            break;
        case 'MiniCartShow':
            if (!basket || !paypalPaymentMethodId || !isPaypalButtonEnabled('minicart')) {
                this.emit('route:Complete', req, res);
                return;
            }
            break;
        case 'Begin':
            if (!paypalPaymentMethodId || !basket) {
                this.emit('route:Complete', req, res);
                return;
            }
            break;
        default:
            next();
            break;
    }

    return next();
}

/**
 * Middleware to validate paypal payment instrument
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validatePaypalPaymentInstrument(req, res, next) {
    var order = OrderMgr.getOrder(req.form.orderID, req.form.orderToken);
    var paypalPaymentInstrument = getPaypalPaymentInstrument(order);
    if (!paypalPaymentInstrument) {
        this.emit('route:Complete', req, res);
        return;
    }

    return next();
}

/**
 * Middleware to parse req.body
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function parseBody(req, res, next) {
    try {
        var data = req.body && JSON.parse(req.body);
        res.parsedBody = data;
    } catch (error) {
        createErrorLog(error);
        res.setStatusCode(500);
        res.print(createErrorMsg());
        this.emit('route:Complete', req, res);
        return;
    }
    return next();
}

/**
 * Middleware to validate processor
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateProcessor(req, res, next) {
    var processor = PaymentMgr.getPaymentMethod(paypalPaymentMethodId).getPaymentProcessor();
    if (processor) return next();
    createErrorLog(Resource.msg('error.payment.processor.missing', 'checkout', null));
    res.setStatusCode(500);
    res.print(createErrorMsg());
    this.emit('route:Complete', req, res);
    return;
}

/**
 * Middleware to remove non paypal payment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function removeNonPaypalPayment(req, res, next) {
    var basket = BasketMgr.getCurrentBasket();

    if (!basket) return next();

    if (!empty(basket.paymentInstruments)) removeNonPayPalPaymentInstrument(basket);

    return next();
}

/**
 * Middleware to validate handle hook
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateHandleHook(req, res, next) {
    var processor = PaymentMgr.getPaymentMethod(paypalPaymentMethodId).getPaymentProcessor();
    if (HookMgr.hasHook('app.payment.processor.' + processor.ID.toLowerCase())) return next();

    createErrorLog(Resource.msg('paypal.error.processoremisssing', 'paypalerrors', null));
    res.setStatusCode(500);
    res.print(createErrorMsg());

    this.emit('route:Complete', req, res);
    return;
}

/**
 * Check if existed giftCert payment instruments fully cover total price of the order
* @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateGiftCertificateAmount(req, res, next) {
    var basket = BasketMgr.getCurrentBasket();
    var calculatedNonGiftCertificateAmount = calculateNonGiftCertificateAmount(basket);

    if (calculatedNonGiftCertificateAmount.value !== 0) return next();

    if (basket.giftCertificatePaymentInstruments.length && calculatedNonGiftCertificateAmount.value === 0) return next();

    switch (this.name) {
        case 'SubmitPayment':
            res.json({
                form: server.forms.getForm('billing'),
                fieldErrors: [],
                serverErrors: [createErrorMsg('order_covered_by_gift_ertificate')],
                error: true,
                redirectUrl: getUrls().paymentStage
            });
            this.emit('route:Complete', req, res);
            break;
        case 'ReturnFromCart':
            res.setStatusCode(500);
            res.print(createErrorMsg('order_covered_by_gift_ertificate'));
            this.emit('route:Complete', req, res);
            break;
        default:
            next();
            break;
    }
}
/**
 * Checks if 'connect with paypal window' was cancelled by buyer
* @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateConnectWithPaypalUrl(req, res, next) {
    var error = request.httpParameterMap.get('error_description');

    if (!error.empty) {
        if (error.value === paypalConstants.CONNECT_WITH_PAYPAL_CONSENT_DENIED) {
            createErrorLog(error.value);

            // Sets redirect endpoint depands of 'Connect with paypal' button location
            // req.querystring.state - oAuth reentry endpoint(1 or 2)
            res.redirect(accountHelpers.getLoginRedirectURL(req.querystring.state, req.session.privacyCache, false));

            this.emit('route:Complete', req, res);
            return;
        }
    }

    return next();
}

module.exports = {
    validateExpiredTransaction: validateExpiredTransaction,
    validatePaymentMethod: validatePaymentMethod,
    validatePaypalPaymentInstrument: validatePaypalPaymentInstrument,
    validateWhetherPaypalEnabled: validateWhetherPaypalEnabled,
    validatePaypalOnCheckout: validatePaypalOnCheckout,
    validatePaypalOnProduct: validatePaypalOnProduct,
    parseBody: parseBody,
    validateProcessor: validateProcessor,
    removeNonPaypalPayment: removeNonPaypalPayment,
    validateHandleHook: validateHandleHook,
    validateGiftCertificateAmount: validateGiftCertificateAmount,
    validateConnectWithPaypalUrl: validateConnectWithPaypalUrl
};
