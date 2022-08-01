var PPOrderMgrModel = require('*/cartridge/models/ppOrderMgr');
var PPRestApiWrapper = require('*/cartridge/scripts/paypal/paypalApi/ppRestApiWrapper');
var ppOrderMgrModel = new PPOrderMgrModel();
var ppRestApiWrapper = new PPRestApiWrapper();

/**
 * PP Transaction Actions model
 */
function ppTransactionActions() { }

/**
* Makes create reference transaction api call and updates corresponding order data
* @param {Object} reqData request data object
* @return {Object} response
*/
ppTransactionActions.prototype.createTransactionAction = function (reqData) {
    var callApiResponse = ppRestApiWrapper.createTransaction(reqData);

    if (callApiResponse.err) {
        return callApiResponse;
    }

    try {
        ppOrderMgrModel.createNewTransactionCustomObject(callApiResponse.responseData.transactionid);
    } catch (error) {
        return { err: true };
    }

    return callApiResponse;
};

/**
* Makes void transaction api call and updates corresponding order data
* @param {Object} reqData request data object
* @return {Object} response
*/
ppTransactionActions.prototype.voidAction = function (reqData) {
    var callApiResponse = ppRestApiWrapper.doVoid(reqData);

    if (callApiResponse.err) {
        return callApiResponse;
    }

    var orderTransactionResult = ppOrderMgrModel.updateOrderData(reqData.orderNo, reqData.isCustomOrder, reqData.orderToken);

    if (!orderTransactionResult) {
        return { err: true };
    }
    return callApiResponse;
};

/**
* Makes reauthorize transaction api call and updates corresponding order data
* @param {Object} reqData request data object
* @return {Object} response
*/
ppTransactionActions.prototype.reauthorizeAction = function (reqData) {
    var callApiResponse = ppRestApiWrapper.doReauthorize(reqData);

    if (callApiResponse.err) {
        return callApiResponse;
    }

    var orderTransactionResult = ppOrderMgrModel.updateOrderData(reqData.orderNo, reqData.isCustomOrder, reqData.orderToken);

    if (!orderTransactionResult) {
        return { err: true };
    }

    return callApiResponse;
};

/**
* Makes refund transaction api call and updates corresponding order data
* @param {Object} reqData request data object
* @return {Object} response
*/
ppTransactionActions.prototype.refundTransactionAction = function (reqData) {
    var callApiResponse = ppRestApiWrapper.doRefundTransaction(reqData);

    if (callApiResponse.err) {
        return callApiResponse;
    }

    var orderTransactionResult = ppOrderMgrModel.updateOrderData(reqData.orderNo, reqData.isCustomOrder, reqData.orderToken);

    if (!orderTransactionResult) {
        return { err: true };
    }

    return callApiResponse;
};

/**
* Makes capture transaction api call and updates corresponding order data
* @param {Object} reqData request data object
* @return {Object} response
*/
ppTransactionActions.prototype.captureAction = function (reqData) {
    var callApiResponse = ppRestApiWrapper.doCapture(reqData);

    if (callApiResponse.err) {
        return callApiResponse;
    }

    var orderTransactionResult = ppOrderMgrModel.updateOrderData(reqData.orderNo, reqData.isCustomOrder, reqData.orderToken);

    if (!orderTransactionResult) {
        return { err: true };
    }

    return callApiResponse;
};

module.exports = ppTransactionActions;
