var SystemObjectMgr = require('dw/object/SystemObjectMgr');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ArrayList = require('dw/util/ArrayList');
var StringUtils = require('dw/util/StringUtils');
var PropertyComparator = require('dw/util/PropertyComparator');
var Money = require('dw/value/Money');
var Calendar = require('dw/util/Calendar');
var Order = require('dw/order/Order');
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var Resource = require('dw/web/Resource');

var paymentInstrumentHelper = require('*/cartridge/scripts/paypal/bmPaymentInstrumentHelper');
var paypalHelper = require('*/cartridge/scripts/paypal/bmPaypalHelper');
var paypalUtils = require('*/cartridge/scripts/paypal/bmPaypalUtils');
var ppConstants = require('*/cartridge/scripts/util/paypalConstants');

var PPOrderModel = require('*/cartridge/models/ppOrder');
var PPRestApiWrapper = require('*/cartridge/scripts/paypal/paypalApi/ppRestApiWrapper');
var ppOrderModel = new PPOrderModel();
var ppRestApiWrapper = new PPRestApiWrapper();

/**
 * Combine orders and PayPalNewTransactions Custom Objects into one array for pagination
 *
 * @param {string} orderNo Order number
 * @returns {dw.util.ArrayList} Combined array with all orders
 */
function getOrders(orderNo) {
    var systemOrders = SystemObjectMgr.querySystemObjects('Order', 'orderNo LIKE {0} AND custom.paypalPaymentMethod = \'express\' AND status != {1}', 'creationDate desc', orderNo, Order.ORDER_STATUS_FAILED);
    var paypalOrders = CustomObjectMgr.queryCustomObjects('PayPalNewTransactions', 'custom.orderNo LIKE {0}', 'custom.orderDate desc', orderNo);
    var orders = new ArrayList(); // eslint-disable-line no-shadow
    var order;
    var paymentInstrument;
    var orderDate;
    var orderTotal;
    var obj;

    var orderIndex = 0;
    var maxSystemOrdersCount = 9000;
    var maxPaypalOrdersCount = 9000;
    var paypalOrdersCount = paypalOrders.getCount();

    if (paypalOrdersCount < maxPaypalOrdersCount) {
        maxSystemOrdersCount = 18000 - paypalOrdersCount;
    }

    while (systemOrders.hasNext()) {
        orderIndex++;

        if (orderIndex > maxSystemOrdersCount) {
            break;
        }

        order = systemOrders.next();
        paymentInstrument = paymentInstrumentHelper.getPaypalPaymentInstrument(order);

        if (paymentInstrument === null) {
            continue; // eslint-disable-line no-continue
        }

        orderDate = new Date(order.creationDate);
        obj = {
            orderToken: order.orderToken,
            orderNo: order.orderNo,
            orderDate: StringUtils.formatCalendar(new Calendar(orderDate), 'M/dd/yy h:mm a'),
            createdBy: order.createdBy,
            isRegestered: order.customer.registered,
            customer: order.customerName,
            email: order.customerEmail,
            orderTotal: order.totalGrossPrice,
            currencyCode: order.getCurrencyCode(),
            paypalAmount: paymentInstrument.getPaymentTransaction().getAmount(),
            status: paymentInstrument.custom.paypalPaymentStatus,
            dateCompare: orderDate.getTime(),
            isCustom: false
        };
        orders.push(obj);
    }

    orderIndex = 0;

    while (paypalOrders.hasNext()) {
        orderIndex++;

        if (orderIndex > maxSystemOrdersCount) {
            break;
        }

        order = paypalOrders.next().custom;
        orderDate = new Date(order.orderDate.replace('Z', '.000Z'));
        orderTotal = new Money(order.orderTotal, order.currencyCode);
        obj = {
            orderNo: order.orderNo,
            orderDate: StringUtils.formatCalendar(new Calendar(orderDate), 'M/dd/yy h:mm a'),
            createdBy: 'Merchant',
            isRegestered: 'Unknown',
            customer: order.firstName + ' ' + order.lastName,
            email: order.email,
            orderTotal: orderTotal,
            currencyCode: order.currencyCode,
            paypalAmount: orderTotal,
            status: order.paymentStatus,
            isCustom: true,
            dateCompare: orderDate.getTime()
        };
        orders.push(obj);
    }

    orders.sort(new PropertyComparator('dateCompare', false));

    return orders;
}

/**
 * Updates order custom payment status of a PayPalNewTransactions Custom Object
 * @param {string} orderNo Order number
 */
function updateCustomOrderStatus(orderNo) {
    var order = CustomObjectMgr.getCustomObject('PayPalNewTransactions', orderNo);
    var transactionDetailsResult = ppRestApiWrapper.getOrderDetails(order.custom.transactionId);

    if (transactionDetailsResult.err) {
        paypalUtils.createErrorLog(transactionDetailsResult.responseData);

        throw new Error(Resource.msg('transaction.details.error', 'paypalbm', null));
    }

    order.custom.paymentStatus = paypalHelper.getPaymentStatus(transactionDetailsResult);
}

/**
 * Updates order and custom paypal payment status
 * @param {string} orderNo Order number
 * @param {string} orderToken Order token
 */
function updateOrderStatus(orderNo, orderToken) {
    var order = OrderMgr.getOrder(orderNo, orderToken);
    var paymentInstrument = paymentInstrumentHelper.getPaypalPaymentInstrument(order);
    var paymentInstrumentCustomEl = paymentInstrument.getCustom();
    var transactionDetailsResult = ppRestApiWrapper.getOrderDetails(paymentInstrumentCustomEl.paypalOrderID);

    if (transactionDetailsResult.err) {
        paypalUtils.createErrorLog(transactionDetailsResult.responseData);

        throw new Error(Resource.msg('transaction.details.error', 'paypalbm', null));
    }

    var paymentStatus = paypalHelper.getPaymentStatus(transactionDetailsResult);

    paymentInstrument.custom.paypalPaymentStatus = paymentStatus;

    if (paymentStatus === ppConstants.STATUS_COMPLETED || paymentStatus === ppConstants.STATUS_REFUNDED) {
        order.setPaymentStatus(Order.PAYMENT_STATUS_PAID);
    }
}

/**
 * PP Order Mgr Model
 */
function OrderMgrModel() { }

/**
 * @param {string} orderNo order number
 * @returns {dw.util.ArrayList} orders list
 */
OrderMgrModel.prototype.getOrderByOrderNo = function (orderNo) {
    return getOrders(orderNo);
};

/**
 * @param {string} transactionId transaction id
 * @returns {dw.util.ArrayList} orders list
 */
OrderMgrModel.prototype.getOrderByTransactionId = function (transactionId) {
    var orderNo;
    var systemOrder = SystemObjectMgr.querySystemObjects('Order', 'custom.paypalPaymentMethod = \'express\' AND custom.PP_API_TransactionID LIKE {0} AND status != {1}', 'creationDate desc', transactionId, Order.ORDER_STATUS_FAILED);
    var paypalOrder = CustomObjectMgr.queryCustomObjects('PayPalNewTransactions', 'custom.transactionId = {0}', null, transactionId);

    if (paypalOrder.count) {
        orderNo = new ArrayList(paypalOrder).toArray()[0].custom.orderNo;
    } else if (systemOrder.count) {
        orderNo = new ArrayList(systemOrder).toArray()[0].orderNo;
    }

    return getOrders(orderNo);
};

/**
 * @returns {dw.util.ArrayList} orders list
 */
OrderMgrModel.prototype.getAllOrders = function () {
    return getOrders('*');
};

/**
 * Get PayPalNewTransactions Custom Object with given order number
 *
 * @param {string} orderNo Order number
 * @returns {Object} (transactionIdFromOrder: String - Transaction ID from order, order: dw.object.CustomObject - Custom Object that matched with order number)
 */
OrderMgrModel.prototype.getCustomOrderInfo = function (orderNo) {
    var order;
    var transactionId;

    try {
        order = CustomObjectMgr.getCustomObject('PayPalNewTransactions', orderNo);
        transactionId = order.custom.transactionId;
    } catch (error) {
        paypalUtils.createErrorLog(error);
    }

    return {
        transactionIdFromOrder: transactionId,
        order: order
    };
};

/**
 * @param {boolean} isCustomOrder custom order flag
 * @param {string} orderNo Order number
 * @param {string} orderToken OrderToken
 * @returns {Object} (transactionIdFromOrder: String - Transaction ID from order, order: dw.object.CustomObject - Custom Object that matched with order number)
 */
OrderMgrModel.prototype.getOrderData = function (isCustomOrder, orderNo, orderToken) {
    var order;
    var transactionIdFromOrder;

    try {
        if (isCustomOrder) {
            var orderData = this.getCustomOrderInfo(orderNo);
            order = orderData.order;
            transactionIdFromOrder = orderData.transactionIdFromOrder;
        } else {
            order = OrderMgr.getOrder(orderNo, orderToken);
            transactionIdFromOrder = ppOrderModel.getTransactionIdFromOrder(order);
        }

        if (!order || !transactionIdFromOrder) {
            throw new Error();
        }
    } catch (error) {
        paypalUtils.createErrorLog(error);

        throw new Error();
    }

    return {
        order: order,
        transactionIdFromOrder: transactionIdFromOrder
    };
};

/**
 * Updates order/custom order payment status
 * @param {string} orderNo order number
 * @param {boolean} isCustomOrder flag if current order is Custom Object
 * @param {string} orderToken Order Token
 * @returns {boolean} true in case of success and false when error
 */
OrderMgrModel.prototype.updateOrderData = function (orderNo, isCustomOrder, orderToken) {
    try {
        Transaction.wrap(function () {
            if (JSON.parse(isCustomOrder)) {
                updateCustomOrderStatus(orderNo);
            } else {
                updateOrderStatus(orderNo, orderToken);
            }
        });
    } catch (error) {
        paypalUtils.createErrorLog(error);

        return false;
    }

    return true;
};

/**
 * Create new PayPalNewTransactions Custom Object with data from a new transaction
 * @param {string} transactionId apiResponse.responseData.transactionid
 */
OrderMgrModel.prototype.createNewTransactionCustomObject = function (transactionId) {
    var transaction = ppRestApiWrapper.getOrderDetails(transactionId);

    if (transaction.err) {
        paypalUtils.createErrorLog(transaction.responseData);

        throw new Error();
    }

    Transaction.wrap(function () {
        var invNum = transaction.purchase_units[0].invoice_id;
        var newOrder = CustomObjectMgr.createCustomObject('PayPalNewTransactions', invNum);
        // update transaction payment status
        transaction.status = paypalHelper.getPaymentStatus(transaction);

        // create order custom object
        newOrder.custom.orderDate = transaction.create_time;
        newOrder.custom.orderTotal = transaction.purchase_units[0].amount.value;
        newOrder.custom.paymentStatus = transaction.status || ppConstants.UNKNOWN;
        newOrder.custom.transactionId = transaction.id;
        newOrder.custom.firstName = transaction.payer.name.given_name;
        newOrder.custom.lastName = transaction.payer.name.surname;
        newOrder.custom.email = transaction.payer.email_address || ppConstants.UNKNOWN;
        newOrder.custom.currencyCode = transaction.purchase_units[0].amount.currency_code;
        newOrder.custom.transactionsHistory = [transaction.id];
    });
};

module.exports = OrderMgrModel;
