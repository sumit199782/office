var Resource = require('dw/web/Resource');

var paypalApi = require('*/cartridge/scripts/paypal/paypalApi/bmPaypalApi');
var ppConstants = require('*/cartridge/scripts/util/paypalConstants');
var paypalHelper = require('*/cartridge/scripts/paypal/bmPaypalHelper');
var { createErrorLog } = require('*/cartridge/scripts/paypal/bmPaypalUtils');

/**
 * Creates puchase unit data
 * @param {Object} data - customer entered data in form
 * @returns {Object} with purchase unit data
 */
function getPurchaseUnit(data) {
    var purchaseUnit = {
        description: data.desc,
        amount: {
            currency_code: data.currencycode,
            value: data.amt,
            breakdown: {
                item_total: {
                    currency_code: data.currencycode,
                    value: data.itemamt
                },
                shipping: {
                    currency_code: data.currencycode,
                    value: data.shippingamt || '0'
                },
                tax_total: {
                    currency_code: data.currencycode,
                    value: data.taxamt || '0'
                },
                handling: {
                    currency_code: data.currencycode,
                    value: '0'
                },
                insurance: {
                    currency_code: data.currencycode,
                    value: '0'
                },
                shipping_discount: {
                    currency_code: data.currencycode,
                    value: '0'
                },
                discount: {
                    currency_code: data.currencycode,
                    value: '0'
                }
            }
        },
        invoice_id: data.invnum
    };

    if (data.shiptoName && data.shiptoStreet) {
        purchaseUnit.shipping = {
            name: {
                full_name: data.shiptoName
            },
            address: {
                address_line_1: data.shiptoStreet,
                address_line_2: data.shiptoStreet2,
                admin_area_1: data.shiptoState,
                admin_area_2: data.shiptoCity,
                postal_code: data.shiptoZip,
                country_code: data.shiptoCountry
            }
        };
    }

    return purchaseUnit;
}

/**
 * PP REST SDK model
 */
function ppRestSdk() { }

/**
* Makes create transaction api call
* @param {Object} reqData request data object
* @param {string} paymentAction capture/authorize-
* @return {Object} response
*/
ppRestSdk.prototype.createOrder = function (reqData, paymentAction) {
    try {
        if (!reqData) {
            createErrorLog(Resource.msg('api.error.no.data', 'paypalbm', null));

            throw new Error();
        }

        var purchaseUnit = getPurchaseUnit(reqData);

        return paypalApi.createOrder(purchaseUnit, paymentAction);
    } catch (err) {
        return {
            err: true,
            responseData: {
                l_longmessage0: err.message
            }
        };
    }
};

/**
* Makes create transaction api call
* @param {Object} reqData request data object
* @return {Object} response
*/
ppRestSdk.prototype.createTransaction = function (reqData) {
    try {
        if (!reqData.referenceid) {
            createErrorLog(Resource.msg('api.error.no.baid', 'paypalbm', null));

            throw new Error();
        }

        var paymentAction = paypalHelper.getPaymentActionType(reqData.paymentAction);
        var { id, err, responseData } = this.createOrder(reqData, paymentAction);

        if (err) {
            createErrorLog(responseData);
        }

        var resp = paypalApi.createTransaction(reqData, id, paymentAction);

        return {
            responseData: {
                ack: ppConstants.ACTION_STATUS_SUCCESS,
                paymentstatus: resp.status,
                purchaseUnits: resp.purchase_units,
                payer: resp.payer,
                transactionid: resp.id
            }
        };
    } catch (err) {
        return {
            err: true,
            responseData: {
                l_longmessage0: err.message
            }
        };
    }
};

/**
* Makes void transaction api call
* @param {Object} reqData request data object
* @return {Object} response
*/
ppRestSdk.prototype.doVoid = function (reqData) {
    try {
        if (!reqData.authorizationId) {
            createErrorLog(Resource.msg('api.error.noid.during.voiding', 'paypalbm', null));

            throw new Error();
        }

        paypalApi.voidTransaction(reqData.authorizationId);

        return {
            responseData: {
                ack: ppConstants.ACTION_STATUS_SUCCESS
            },
            status: ppConstants.STATUS_COMPLETED
        };
    } catch (err) {
        return {
            err: true,
            responseData: {
                l_longmessage0: err.message
            }
        };
    }
};

/**
* Makes reauthorize transaction api call
* @param {Object} reqData request data object
* @return {Object} response
*/
ppRestSdk.prototype.doReauthorize = function (reqData) {
    try {
        if (!reqData.authorizationId) {
            createErrorLog(Resource.msg('api.error.noid.during.reauthorization', 'paypalbm', null));

            throw new Error();
        }

        var resp = paypalApi.reauthorizeTransaction(reqData.authorizationId);

        if (resp.status !== ppConstants.STATUS_CREATED) {
            createErrorLog(Resource.msg('api.error.not.successful.reauthorize', 'paypalbm', null));

            throw new Error();
        }

        resp.responseData = {
            ack: ppConstants.ACTION_STATUS_SUCCESS
        };

        return resp;
    } catch (err) {
        return {
            err: true,
            responseData: {
                l_longmessage0: err.message
            }
        };
    }
};

/**
* Makes refund transaction api call
* @param {Object} reqData request data object
* @return {Object} response
*/
ppRestSdk.prototype.doRefundTransaction = function (reqData) {
    try {
        if (!reqData.transactionid) {
            createErrorLog(Resource.msg('api.error.no.captureid', 'paypalbm', null));

            throw new Error();
        }

        var reqBody = {};

        if (reqData.invNum) {
            reqBody.invoice_id = reqData.invNum;
        }
        if (reqData.note) {
            reqBody.note_to_payer = reqData.note;
        }
        if (reqData.amt) {
            reqBody.amount = {
                value: reqData.amt,
                currency_code: reqData.currencyCode
            };
        }

        var resp = paypalApi.refundTransaction(reqData.transactionid, reqBody);

        if (resp.status !== ppConstants.STATUS_COMPLETED) {
            createErrorLog(Resource.msg('api.error.not.successful.refund', 'paypalbm', null));

            throw new Error();
        }

        resp.responseData = {
            ack: ppConstants.ACTION_STATUS_SUCCESS
        };

        return resp;
    } catch (err) {
        return {
            err: true,
            responseData: {
                l_longmessage0: err.message
            }
        };
    }
};

/**
* Makes capture transaction api call
* @param {Object} reqData request data object
* @return {Object} response
*/
ppRestSdk.prototype.doCapture = function (reqData) {
    try {
        if (!reqData.authorizationId) {
            createErrorLog(Resource.msg('api.error.noid.during.capturing', 'paypalbm', null));

            throw new Error();
        }

        var reqBody = {
            final_capture: false,
            amount: {
                value: reqData.amt,
                currency_code: reqData.currencyCode
            }
        };

        if (reqData.invNum) {
            reqData.invoice_id = reqData.invNum;
        }
        if (reqData.note) {
            reqData.note_to_payer = reqData.note;
        }

        var resp = paypalApi.captureTransaction(reqData.authorizationId, reqBody);

        resp.responseData = {
            ack: ppConstants.ACTION_STATUS_SUCCESS
        };

        return resp;
    } catch (err) {
        return {
            err: true,
            responseData: {
                l_longmessage0: err.message
            }
        };
    }
};

/**
 * Gets information about an order
 * @param {string} id - paypal Order ID/transaction id/ paypal token for NVP orders
 * @returns {Object} api call handling result
 */
ppRestSdk.prototype.getOrderDetails = function (id) {
    try {
        if (!id) {
            createErrorLog(Resource.msg('api.error.no.idortoken', 'paypalbm', null));

            throw new Error();
        }

        var resp = paypalApi.getOrderDetails(id);

        if (resp) {
            return resp;
        }
    } catch (err) {
        return {
            err: true,
            responseData: {
                l_longmessage0: err.message
            }
        };
    }
};

module.exports = ppRestSdk;
