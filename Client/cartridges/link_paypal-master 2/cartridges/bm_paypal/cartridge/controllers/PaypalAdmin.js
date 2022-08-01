/* global dw request response empty */

var Resource = require('dw/web/Resource');
var CSRFProtection = require('dw/web/CSRFProtection');
var currentSite = require('dw/system/Site').getCurrent();

var paypalUtils = require('*/cartridge/scripts/paypal/bmPaypalUtils');
var paypalHelper = require('*/cartridge/scripts/paypal/bmPaypalHelper');
var ppConstants = require('*/cartridge/scripts/util/paypalConstants');
var responseHelper = require('*/cartridge/scripts/paypal/responseHelper');

var PPOrderMgrModel = require('*/cartridge/models/ppOrderMgr');
var PPOrdersPagingModel = require('*/cartridge/models/ppOrdersPaging');
var PPTransactionMgrModel = require('*/cartridge/models/ppTransactionMgr');
var PPTransactionModel = require('*/cartridge/models/ppTransaction');
var PPTransactionActions = require('*/cartridge/models/ppTransactionActions');

var hm = request.httpParameterMap;

/**
 * Show template with create new transaction form
 */
function renderNewTransactionForm() {
    var invNum = paypalHelper.createCustomTransactionInvNum();
    var isCapture = currentSite.getCustomPreferenceValue('PP_API_PaymentAction');
    var allCurrencies = currentSite.getAllowedCurrencies();
    var defaultCurrency = currentSite.getDefaultCurrency();
    var countries = paypalHelper.getCountriesLabelsAndCodes();

    responseHelper.render('paypalbm/components/newTransaction', {
        CSRFProtection: CSRFProtection,
        invNum: invNum,
        isCapture: isCapture,
        allCurrencies: allCurrencies,
        defaultCurrency: defaultCurrency,
        countries: countries
    });
}

/**
 * Get orders list. Can be filtered by order number or transaction ID
 * @returns {Function} template render function call with required data
 */
function orders() {
    var orderPagingModel;
    var orderPagingModelParameters;
    var ordersList;
    var isSearchByOrderNo = hm.orderNo.submitted;
    var isSearchByTransaction = hm.transactionId.submitted;
    var ppOrderMgrModel = new PPOrderMgrModel();
    var ppOrdersPagingModel = new PPOrdersPagingModel();

    try {
        // if search query inputs are empty get full orders list
        if (paypalHelper.isSearchQueryEmpty(hm.transactionId, hm.orderNo)) {
            ordersList = ppOrderMgrModel.getAllOrders();
        } else {
            // define search type based on submitted search query
            var searchType = paypalHelper.getSearchType(hm.transactionId);

            switch (searchType) {
                case ppConstants.SEARCH_BY_TRANSACTION_ID:
                    ordersList = ppOrderMgrModel.getOrderByTransactionId(hm.transactionId.stringValue);

                    break;
                case ppConstants.SEARCH_BY_ORDER_NUMBER:
                    ordersList = ppOrderMgrModel.getOrderByOrderNo(hm.orderNo.stringValue);

                    break;
                default:
                    break;
            }
        }

        orderPagingModel = ppOrdersPagingModel.createPagingModel(ordersList, hm.page, hm.pagesize);
        orderPagingModelParameters = ppOrdersPagingModel.createOrderPagingModelParameters(orderPagingModel, hm);
    } catch (error) {
        paypalUtils.createErrorLog(error);

        return responseHelper.render('paypalbm/components/serverError');
    }

    // set which tab must be shown in case of first list render
    if (!isSearchByOrderNo && !isSearchByTransaction) {
        isSearchByOrderNo = true;
    }

    responseHelper.render('paypalbm/orderList', {
        PagingModel: orderPagingModel,
        orderPagingModelParameters: orderPagingModelParameters,
        isSearchByOrderNo: isSearchByOrderNo,
        isSearchByTransaction: isSearchByTransaction
    });
}

/**
 * Get order transaction details
 * @returns {Function} template render function call with required data
 */
function orderTransaction() {
    var ppTransactionModel;
    // order transaction created via "New Transaction" form in BM
    var isCustomOrder = hm.isCustomOrder && !empty(hm.isCustomOrder.stringValue);
    var ppOrderMgrModel = new PPOrderMgrModel();
    var ppTransactionMgrModel = new PPTransactionMgrModel();

    try {
        var { order, transactionIdFromOrder } = ppOrderMgrModel.getOrderData(isCustomOrder, hm.orderNo.stringValue, hm.orderToken.stringValue);

        var transaction = ppTransactionMgrModel.getTransactionData(hm, transactionIdFromOrder);

        // expand transaction object with required data for actions and transaction view
        ppTransactionModel = new PPTransactionModel(transaction, order, isCustomOrder);
    } catch (error) {
        return responseHelper.render('paypalbm/components/serverError');
    }

    responseHelper.render('paypalbm/orderTransaction', {
        transaction: ppTransactionModel
    });
}

/**
 * Do some action, like DoAuthorize, DoCapture, DoRefund and etc
 * @returns {Function} template render function call with required data
 */
function action() {
    var reqData = {};
    var callApiResponse = {};
    var responseResult = 'Success';

    if (!CSRFProtection.validateRequest()) {
        var errorMsg = {
            l_longmessage0: Resource.msg('transaction.action.token.mismatch', 'paypalbm', null)
        };
        return responseHelper.renderJson('Error', errorMsg);
    }

    var methodName = hm.methodName.stringValue;
    var ppTransactionActions = new PPTransactionActions();

    for (var name in hm) { // eslint-disable-line guard-for-in, no-restricted-syntax
        reqData[name] = hm[name].toString();
    }

    switch (methodName) {
        // case via "New Transaction" form in BM
        case ppConstants.ACTION_CREATE_TRANSACTION:
            callApiResponse = ppTransactionActions.createTransactionAction(reqData);

            break;
        case ppConstants.ACTION_VOID:
            callApiResponse = ppTransactionActions.voidAction(reqData);

            break;
        case ppConstants.ACTION_REAUTHORIZE:
            callApiResponse = ppTransactionActions.reauthorizeAction(reqData);

            break;
        case ppConstants.ACTION_REFUND:
            callApiResponse = ppTransactionActions.refundTransactionAction(reqData);

            break;
        case ppConstants.ACTION_CAPTURE:
            callApiResponse = ppTransactionActions.captureAction(reqData);

            break;
        default:
            break;
    }

    if (callApiResponse.err) {
        responseResult = 'Error';
    }

    return responseHelper.renderJson(responseResult, callApiResponse.responseData);
}

orders.public = true;
orderTransaction.public = true;
action.public = true;
renderNewTransactionForm.public = true;

exports.Orders = orders;
exports.OrderTransaction = orderTransaction;
exports.Action = action;
exports.RenderNewTransactionForm = renderNewTransactionForm;
