'use strict';

const Transaction = require('dw/system/Transaction');
const Money = require('dw/value/Money');
const paypalRestService = require('*/cartridge/scripts/service/paypalRestService');
const paypalTokenService = require('*/cartridge/scripts/service/paypalTokenService');

const {
    isCapture,
    partnerAttributionId
} = require('*/cartridge/config/paypalPreferences');

const {
    createErrorLog,
    createErrorMsg
} = require('*/cartridge/scripts/paypal/paypalUtils');
const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');

// A paypalTokenService instance
var service = paypalTokenService();

/**
 * Function to get information about an order
 *
 * @param {Object} paymentInstrument - paypalPaymentInstrument
 * @returns {Object} Call handling result
 */
function getOrderDetails(paymentInstrument) {
    try {
        if (!paymentInstrument.custom.paypalOrderID) {
            createErrorLog('No paypalOrderID was found in payment instrument');
            throw new Error();
        }
        var resp = paypalRestService.call({
            path: 'v2/checkout/orders/' + paymentInstrument.custom.paypalOrderID,
            method: 'GET',
            body: {}
        });

        if (resp) {
            Transaction.wrap(function () {
                paymentInstrument.custom.currentPaypalEmail = resp.payer.email_address;
            });
            return {
                payer: resp.payer,
                purchase_units: resp.purchase_units
            };
        }
        createErrorLog('No payer info was found. Order ID ' + paymentInstrument.custom.paypalOrderID);
        throw new Error();
    } catch (err) {
        return { err: createErrorMsg(err.message) };
    }
}

/**
 * Function to update information about an order
 *
 * @param {Object} paymentInstrument - paypalPaymentInstrument
 * @param {Object} purchase_unit - purchase unit
 * @returns {Object} Call handling result
 */
function updateOrderDetails(paymentInstrument, purchase_unit) {
    try {
        if (!paymentInstrument.custom.paypalOrderID) {
            createErrorLog('No paypalOrderID was found in payment instrument');
            throw new Error();
        }
        paypalRestService.call({
            path: 'v2/checkout/orders/' + paymentInstrument.custom.paypalOrderID,
            method: 'PATCH',
            body: [
                {
                    op: 'replace',
                    path: "/purchase_units/@reference_id=='default'",
                    value: purchase_unit
                }
            ]
        });

        if (paymentInstrument.paymentTransaction.amount.value !== purchase_unit.amount.value) {
            Transaction.wrap(function () {
                paymentInstrument.paymentTransaction.setAmount(new Money(purchase_unit.amount.value, purchase_unit.amount.currency_code));
            });
        }

        return { isOkUpdate: true };
    } catch (err) {
        return { err: createErrorMsg(err.message) };
    }
}

/**
 * Function to create transaction
 * If BA exists it is used as payment source in body
 *
 * @param {Object} paymentInstrument - paypalPaymentInstrument
 * @param {Object} bodyObj - payment source with BA id if BA exists
 * @returns {Object} Call handling result
 */
function createTransaction(paymentInstrument, bodyObj) {
    try {
        if (!paymentInstrument.custom.paypalOrderID) {
            createErrorLog('No paypalOrderID was found in payment instrument');
            throw new Error();
        }
        var actionType = isCapture ? 'capture' : 'authorize';
        var response = paypalRestService.call({
            path: 'v2/checkout/orders/' + paymentInstrument.custom.paypalOrderID + '/' + actionType,
            body: bodyObj || {}
        });
        return {
            response: response
        };
    } catch (err) {
        return { err: createErrorMsg(err.message) };
    }
}

/**
 * Create a billing agreement token
 * Pass the agreement details including the description, payer, and billing plan in the JSON request body.
 *
 * @param {Object} restRequestData data
 * @returns {Object} Call returns the HTTP 201 Created status code and a JSON response that includes an approval URL:
 */
function getBillingAgreementToken(restRequestData) {
    try {
        var resp = paypalRestService.call(restRequestData);
        if (resp) {
            return { billingAgreementToken: resp.token_id };
        }

        createErrorLog('No billing agreement-tokens was found');
        throw new Error();
    } catch (err) {
        return { err: createErrorMsg(err.message) };
    }
}

/**
 * Makes post call using facilitator Access Token and transfers billingToken
 *  save's billingAgreementID & billingAgreementPayerEmail to input field
 *  and triggers checkout place order stage
 *
 * @param {string} billingToken - billing agreement token
 * @returns {Object} JSON response that includes the billing agreement ID and information about the payer
 */
function createBillingAgreement(billingToken) {
    try {
        if (!billingToken) {
            createErrorLog('No billing Token provided');
            throw new Error();
        }
        var resp = paypalRestService.call({
            path: 'v1/billing-agreements/agreements',
            method: 'POST',
            body: {
                token_id: billingToken
            }
        });
        if (resp) {
            return resp;
        }

        createErrorLog('No billing agreement ID was found');
        throw new Error();
    } catch (err) {
        return { err: createErrorMsg(err.message) };
    }
}

/**
 * Function to create order if BA exists
 * If BA exists it is used as payment source in body
 *
 * @param {Object} purchaseUnit - purchaseUnit
 * @returns {Object} Call handling result
 */
function createOrder(purchaseUnit) {
    try {
        if (!purchaseUnit) {
            createErrorLog('No purchaseUnit was found');
            throw new Error();
        }
        var resp = paypalRestService.call({
            path: 'v2/checkout/orders',
            body: {
                intent: isCapture ? 'CAPTURE' : 'AUTHORIZE',
                purchase_units: [purchaseUnit]
            },
            partnerAttributionId: partnerAttributionId
        });
        return {
            resp: resp
        };
    } catch (err) {
        return { err: createErrorMsg(err.message) };
    }
}

/**
 * Function to get BA details
 * If BA exists it is used as payment source in body
 *
 * @param {Object} paymentInstrument - paymentInstrument
 * @returns {Object} Call handling result
 */
function getBADetails(paymentInstrument) {
    try {
        if (!paymentInstrument.custom.PP_API_ActiveBillingAgreement) {
            createErrorLog('No active billing agreement was found');
            throw new Error();
        }
        var baID;
        try {
            baID = JSON.parse(paymentInstrument.custom.PP_API_ActiveBillingAgreement).baID;
        } catch (error) {
            createErrorLog(error);
            return new Error(error);
        }

        var resp = paypalRestService.call({
            path: '/v1/billing-agreements/agreements/' + baID,
            method: 'GET'
        });
        if (resp.state !== 'ACTIVE') {
            return { active: false };
        }
        return {
            id: resp.id,
            billing_info: resp.payer.payer_info,
            shipping_address: resp.shipping_address,
            active: true
        };
    } catch (err) {
        return { err: createErrorMsg(err.message) };
    }
}

/**
 * Function to cancel BA
 * If BA exists it is used as payment source in body
 *
 * @param {Object} baID - billing agreement ID to cancel
 * @returns {Object} Call handling result
 */
function cancelBillingAgreement(baID) {
    try {
        if (!baID) {
            createErrorLog('No billing agreement ID provided');
            throw new Error();
        }
        paypalRestService.call({
            path: '/v1/billing-agreements/agreements/' + baID + '/cancel',
            method: 'POST'
        });
    } catch (err) {
        return { err: createErrorMsg(err.message) };
    }
}

/**
 * Gets access token according a paypal user autherization code
 * @param {string} authCode Autherization code of paypal user
 * @returns {string} access token
 */
function exchangeAuthCodeForAccessToken(authCode) {
    var result = service.setThrowOnError().call({
        code: authCode,
        requestType: paypalConstants.ACCESS_TOKEN,
        path: 'oauth2/token',
        method: paypalConstants.METHOD_POST
    });

    if (!result.ok) {
        var errorObject = JSON.parse(result.errorMessage);
        var error = errorObject.error_description;

        createErrorLog(error);
        throw error;
    }

    return result.object.access_token;
}

/**
 * Gets paypal customer info according access token
 * @param {string} accessToken Access Token
 * @returns {Object} Object with the customer info
 */
function getPaypalCustomerInfo(accessToken) {
    var result = service.setThrowOnError().call({
        accessToken: accessToken,
        requestType: paypalConstants.USER_INFO,
        path: 'identity/oauth2/userinfo?schema=paypalv1.1',
        method: paypalConstants.METHOD_GET
    });

    if (!result.ok) {
        var errorObject = JSON.parse(result.errorMessage);
        var error = errorObject.error_description;

        createErrorLog(error);
        throw error;
    }

    return result.object;
}

module.exports = {
    createTransaction: createTransaction,
    updateOrderDetails: updateOrderDetails,
    getOrderDetails: getOrderDetails,
    getBillingAgreementToken: getBillingAgreementToken,
    createBillingAgreement: createBillingAgreement,
    createOrder: createOrder,
    getBADetails: getBADetails,
    cancelBillingAgreement: cancelBillingAgreement,
    exchangeAuthCodeForAccessToken: exchangeAuthCodeForAccessToken,
    getPaypalCustomerInfo: getPaypalCustomerInfo
};
