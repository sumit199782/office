'use strict';
/* global empty dw request session customer */

var Resource = require('dw/web/Resource');
var OrderMgr = require('dw/order/OrderMgr');
var StringUtils = require('dw/util/StringUtils');
var Calendar = require('dw/util/Calendar');

var ppConstants = require('*/cartridge/scripts/util/paypalConstants');
var paypalUtils = require('*/cartridge/scripts/paypal/bmPaypalUtils');

var paypalHelper = {};

/**
 * Creates invoice number for custom transaction (created via 'create transaction' button in BM)
 * @returns {string} invoice number
 */
paypalHelper.createCustomTransactionInvNum = function () {
    var invNum = OrderMgr.createOrderSequenceNo();

    try {
        if (!empty(OrderMgr.queryOrder('orderNo = {0}', invNum))) {
            invNum = OrderMgr.createOrderSequenceNo();
        }
    } catch (error) {
        paypalUtils.createErrorLog(error);
    }

    return 'pp_' + invNum;
};

/**
 * Creates an array of objects with countries. Each object contains a label and a value of separate country.
 * @returns {Array} Array of objects.
 */
paypalHelper.getCountriesLabelsAndCodes = function () {
    var countriesCode = require('*/countriesCodes');

    return countriesCode.map(function (code) {
        return {
            value: code,
            label: Resource.msg('country.' + code.toLocaleLowerCase(), 'paypalbm', null)
        };
    });
};

/**
 * Returns boolean value whether search query inputs are empty or not
 * @param {string} transactionId transaction Id
 * @param {string} orderNo order No
 * @returns {boolean} value
 */
paypalHelper.isSearchQueryEmpty = function (transactionId, orderNo) {
    return empty(transactionId.stringValue) && empty(orderNo.stringValue);
};

/**
 * Gets search type based on submitted search query
 * @param {string} transactionId transaction Id
 * @returns {string} search type
 */
paypalHelper.getSearchType = function (transactionId) {
    return transactionId.submitted ? ppConstants.SEARCH_BY_TRANSACTION_ID : ppConstants.SEARCH_BY_ORDER_NUMBER;
};

/**
 * Returns Formated Date
 * @param {string} isoString - iso time String
 * @returns {dw.util.StringUtils} formated creation date
 */
paypalHelper.formatedDate = function (isoString) {
    var formatedString = isoString.replace('Z', '.000Z');

    return StringUtils.formatCalendar(new Calendar(new Date(formatedString)), 'M/dd/yy h:mm a');
};

/**
 * Returns transaction end time, result
 * (min) transaction lifetime (by default 72h or 4320min)
 * @param {string} creationDate  date
 * @returns {boolean} true or false
 */
paypalHelper.isExpiredHonorPeriod = function (creationDate) {
    var min = 4320;
    // var min = 300; // For testing after 3 mins reauthorize button appears.
    return Date.now() >= new Date(creationDate.replace('Z', '.000Z')).getTime() + min * 60000;
};

/**
 * Returns transaction payment status
 * @param  {Object} transactionResponse transaction details
 * @returns {string} payment status
 */
paypalHelper.getPaymentStatus = function (transactionResponse) {
    var payments = transactionResponse.purchase_units[0].payments;
    var paymentStatus = payments.captures ? payments.captures[0].status : payments.authorizations[0].status;

    return paymentStatus;
};

/**
 * Returns payment action: authorize/capture
 * @param  {string} paymentAction Authorization/Sale
 * @returns {string} payment action for api call
 */
paypalHelper.getPaymentActionType = function (paymentAction) {
    return paymentAction === ppConstants.PAYMENT_ACTION_AUTHORIZATION ?
        ppConstants.PAYMENT_ACTION_AUTHORIZE : ppConstants.PAYMENT_ACTION_CAPTURE;
};

module.exports = paypalHelper;
