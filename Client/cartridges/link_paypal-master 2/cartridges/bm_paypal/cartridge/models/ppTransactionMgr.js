var paypalUtils = require('*/cartridge/scripts/paypal/bmPaypalUtils');

var PPRestApiWrapper = require('*/cartridge/scripts/paypal/paypalApi/ppRestApiWrapper');
var ppRestApiWrapper = new PPRestApiWrapper();
/**
 * Gets transaction id for api call to get details for correspondent transaction
 * @param {dw.web.HttpParameterMap} hm request.httpParameterMap
 * @param {string} transactionIdFromOrder transaction id from current order
 * @returns {string} transaction id
 */
function getTransactionID(hm, transactionIdFromOrder) {
    var transactionID;

    if (!empty(hm.transactionId.stringValue) && !empty(transactionIdFromOrder) &&
        hm.transactionId.stringValue !== transactionIdFromOrder || empty(hm.transactionId.stringValue)) {
        transactionID = transactionIdFromOrder;
    } else {
        transactionID = hm.transactionId.stringValue;
    }

    return transactionID;
}

/**
 * PP Transaction Mgr Model
 */
function TransactionMgrModel() { }

TransactionMgrModel.prototype.getTransactionData = function (hm, transactionIdFromOrder) {
    var orderDetails;

    try {
        var transactionID = getTransactionID(hm, transactionIdFromOrder);
        orderDetails = ppRestApiWrapper.getOrderDetails(transactionID);

        if (orderDetails.err) {
            paypalUtils.createErrorLog(orderDetails.err);

            throw new Error();
        }
    } catch (error) {
        paypalUtils.createErrorLog(error);

        throw new Error();
    }

    return orderDetails;
};

module.exports = TransactionMgrModel;
