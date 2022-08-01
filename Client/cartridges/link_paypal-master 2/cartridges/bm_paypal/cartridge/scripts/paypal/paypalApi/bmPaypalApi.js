var Resource = require('dw/web/Resource');

var { createErrorLog } = require('*/cartridge/scripts/paypal/bmPaypalUtils');
var ppConstants = require('*/cartridge/scripts/util/paypalConstants');

/**
 * Call API request
 *
 * @param {Object} requestData Request data
 * @returns {Object} Response data
 */
function call(requestData) {
    var createPaypalRestService = require('*/cartridge/scripts/service/bmPaypalRestService');
    var service = null;
    var result = null;

    try {
        service = createPaypalRestService();
    } catch (error) {
        createErrorLog(Resource.msgf('service.generalerror', 'paypalbm', null, ppConstants.SERVICE_NAME));

        throw new Error(error);
    }

    try {
        result = service.call(requestData);
    } catch (error) {
        throw new Error(Resource.msg('service.generalerror', 'paypalbm', null));
    }

    if (!result.isOk()) {
        if (!result.errorMessage) {
            createErrorLog(Resource.msgf('service.wrongendpoint', 'paypalerrors', null, requestData.path));

            throw new Error();
        }

        var errorName;
        var errorDescription;
        var errorData = JSON.parse(result.errorMessage);
        // For type error ex -> {"error", "error_description"}
        if (errorData.error) {
            errorName = errorData.error;
            errorDescription = errorData.error_description;
        } else {
            // For error details with issue -> {"name", "message", "details": [{"issue", "description"}]}
            errorName = errorData.details ? errorData.details[0].issue : errorData.name;
            errorDescription = errorData.details ? errorData.details[0].description : errorData.message;
        }

        (errorName.toLowerCase() === ppConstants.INVALID_CLIENT) ?
            createErrorLog(Resource.msgf('service.wrongcredentials', 'paypalbm', null, ppConstants.SERVICE_NAME)) :
            createErrorLog(errorDescription);

        throw new Error(errorDescription);
    }

    return service.getResponse();
}

/**
 * Function to get information about an order
 *
 * @param {string} id - paypal Order ID or paypal token for NVP orders
 * @returns {Object} Call handling result
 */
function getOrderDetails(id) {
    return call({
        path: 'v2/checkout/orders/' + id,
        method: 'GET',
        body: {}
    });
}

/**
 * Function to create order if BA exists
 * If BA exists it is used as payment source in body
 *
 * @param {Object} purchaseUnit purchaseUnit
 * @param {string} paymentAction action to perform
 * @returns {Object} Call handling result
 */
function createOrder(purchaseUnit, paymentAction) {
    return call({
        path: 'v2/checkout/orders',
        body: {
            intent: paymentAction.toUpperCase(),
            purchase_units: [purchaseUnit]
        },
        partnerAttributionId: ppConstants.PARTNER_ATTRIBUTION_ID
    });
}
/**
 * Function to processes a payment from a buyer's account, which is identified by a previous transaction
 *
 * @param {Object} reqData Object with Request Fields
 * @param {string} id order id
 * @param {string} paymentAction capture/authorize
 * @returns {Object} Call handling result
 */
function createTransaction(reqData, id, paymentAction) {
    return call({
        path: 'v2/checkout/orders/' + id + '/' + paymentAction,
        body: {
            payment_source: {
                token: {
                    id: reqData.referenceid,
                    type: ppConstants.TOKEN_TYPE_BILLING_AGREEMENT
                }
            }
        }
    });
}

/**
 * Voids, or cancels, an authorized payment, by ID.
 * You cannot void an authorized payment that has been fully captured.
 * NOT Captured Payment !!!
 *
 * TRANSACTIONID(authorization_id) - purchase_units[0].payments.authorizations[0].id
 *
 * @param {string} authorizationId authorization Id
 * @returns {Object} Call handling result
 */
function voidTransaction(authorizationId) {
    // A successful request returns the HTTP 204 No Content status code with no JSON response body
    return call({
        path: 'v2/payments/authorizations/' + authorizationId + '/void',
        method: 'POST',
        body: {}
    });
}

/**
 * Reauthorizes an existing authorization transaction
 *
 * TRANSACTIONID(authorization_id) - purchase_units[0].payments.authorizations[0].id
 *
 * @param {string} authorizationId authorization Id
 * @returns {Object} Call handling result
 */
function reauthorizeTransaction(authorizationId) {
        // A successful request returns the HTTP 201 and body that contains a new authorization ID you can use to capture the payment
    return call({
        path: 'v2/payments/authorizations/' + authorizationId + '/reauthorize',
        method: 'POST',
        body: {}
    });
}


/**
 * Refunds a captured payment, by ID.
 * For a full refund, include an empty payload in the JSON request body.
 * For a partial refund, include an amount object in the JSON request body
 *
 * TRANSACTIONID(capture_id) - purchase_units[0].payments.captures[0].id
 * { "amount": { "value": "999.99", "currency_code": "USD"} } || {}
 *
 * @param {string} transactionid transaction id
 * @param {Object} reqBody prepared request body object
 * @returns {Object} Call handling result
 */
function refundTransaction(transactionid, reqBody) {
    return call({
        path: 'v2/payments/captures/' + transactionid + '/refund',
        body: reqBody
    });
}

/**
 * Captures an authorized payment, by ID.
 *
 * @param {string} authorizationId authorization Id
 * @param {Object} reqBody prepared request body object
 * @returns {Object} Call handling result
 */
function captureTransaction(authorizationId, reqBody) {
    return call({
        path: 'v2/payments/authorizations/' + authorizationId + '/capture',
        body: reqBody
    });
}

module.exports = {
    getOrderDetails: getOrderDetails,
    createOrder: createOrder,
    // transaction actions
    createTransaction: createTransaction,
    voidTransaction: voidTransaction,
    reauthorizeTransaction: reauthorizeTransaction,
    refundTransaction: refundTransaction,
    captureTransaction: captureTransaction
};
