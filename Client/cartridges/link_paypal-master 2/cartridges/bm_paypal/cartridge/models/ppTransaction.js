var Money = require('dw/value/Money');

var paypalHelper = require('*/cartridge/scripts/paypal/bmPaypalHelper');
var ppConstants = require('*/cartridge/scripts/util/paypalConstants');

/**
 * Returns shippingAmount and taxAmount
 * @param {Object} amountBreakdown transaction.purchase_units[0].amount.breakdown
 * @param {string} isCustomOrder custom order flag
 * @param {dw.order.Order} order current order
 * @returns {Object} shippingAmount and taxAmount
 */
function getTaxAndShippingAmount(amountBreakdown, isCustomOrder, order) {
    var shippingAmount;
    var taxAmount;

    if (amountBreakdown) {
        shippingAmount = amountBreakdown.shipping && amountBreakdown.shipping.value;
        taxAmount = amountBreakdown.tax_total && amountBreakdown.tax_total.value;
    } else {
        shippingAmount = !isCustomOrder ? order.shippingTotalPrice.value : 0;
        taxAmount = !isCustomOrder ? order.totalTax.value : 0;
    }
    return {
        shippingAmount: shippingAmount,
        taxAmount: taxAmount
    };
}

/**
 * Returns transaction id for transaction details view
 * @param {Object} payments transaction.purchase_units[0].payments
 * @param {string} transactionIdFromReq request.httpParameterMap.transactionId.stringValue
 * @returns {string} transaction id
 */
function getTransactionId(payments, transactionIdFromReq) {
    var transactionId;

    if (!empty(payments.captures) && !empty(transactionIdFromReq)) {
        transactionId = transactionIdFromReq;
    } else if (!empty(payments.authorizations)) {
        transactionId = payments.authorizations[0].id;
    } else {
        transactionId = payments.captures[0].id;
    }

    return transactionId;
}

/**
 * PP Transaction Model
 * @param {Object} transaction transaction data
 * @param {dw.order.orderMgr} order current order
 * @param {boolean} isCustomOrder custom order flag
 */
function TransactionModel(transaction, order, isCustomOrder) {
    var refund;
    var capture;
    var transactionIdFromReq = request.httpParameterMap.transactionId.stringValue;
    var purchaseUnits = transaction.purchase_units[0];
    var amount = purchaseUnits.amount;
    var payments = purchaseUnits.payments;
    var amountBreakdown = purchaseUnits.amount.breakdown;
    var currencyCode = amount.currency_code;
    var captures = payments.captures;
    var isCaptureStatus = transaction.intent === ppConstants.INTENT_CAPTURE && transaction.status === ppConstants.STATUS_COMPLETED && !payments.authorizations;
    var paymentStatus = isCaptureStatus ? captures[0].status : payments.authorizations[0].status;
    var timeCreateUpdate = !empty(transaction.create_time) ? transaction.create_time : transaction.update_time;
    var transactionId = getTransactionId(payments, transactionIdFromReq);
    var { taxAmount, shippingAmount } = getTaxAndShippingAmount(amountBreakdown, isCustomOrder, order);

    for (var property in transaction) { // eslint-disable-line guard-for-in, no-restricted-syntax
        this[property] = transaction[property];
    }

    if (isCustomOrder) {
        order = order.getCustom();
    }

    this.isCaptureButtonAllowed = true;
    // set refund related amounts and redund button flag
    if (!empty(payments.refunds)) {
        refund = payments.refunds;
        // id of exta transaction, for example, capture transaction (not main transaction)
        if (!empty(transactionIdFromReq)) {
            refund = Array.filter(refund, function (element) {
                var url = element.links[1].href;
                var captureID = url.substring(url.lastIndexOf('/') + 1);
                return captureID === transactionIdFromReq;
            });
            this.isRefundButtonAllowed = false;
        }

        this.refundedAmount = Array.reduce(refund, function (prev, curr) {
            var prevAmt = new Money(parseFloat(prev), amount.currency_code);
            var currAmt = new Money(parseFloat(curr.amount.value), curr.amount.currency_code);

            return (prevAmt.add(currAmt)).getValue();
        }, 0);
        this.restRefountAmount = (new Money(parseFloat(amount.value), currencyCode).subtract(new Money(parseFloat(this.refundedAmount), currencyCode))).getValue();
    }
    // set capture related amounts and capture button flag
    if (!empty(captures)) {
        // id of exta transaction, for example, capture transaction (not main transaction)
        if (!empty(transactionIdFromReq)) {
            capture = Array.filter(captures, function (element) {
                return element.id === transactionIdFromReq;
            });

            this.capturedAmount = capture[0].amount.value;
            paymentStatus = capture[0].status;
            this.captureID = capture[0].id;
            this.isCaptureButtonAllowed = false;
        // Handled case for the main transaction that was created with payment action 'Sale'
        } else if (empty(transactionIdFromReq) && isCaptureStatus) {
            this.capturedAmount = captures[0].amount.value;
            this.isCaptureButtonAllowed = false;
        } else {
            this.capturedAmount = Array.reduce(captures, function (prev, curr) {
                var prevAmt = new Money(parseFloat(prev), currencyCode);
                var currAmt = new Money(parseFloat(curr.amount.value), curr.amount.currency_code);

                return (prevAmt.add(currAmt)).getValue();
            }, 0);
            this.restCaptureAmount = (new Money(parseFloat(amount.value), currencyCode).subtract(new Money(parseFloat(this.capturedAmount), currencyCode))).getValue();
        }

        this.refundedAmount = this.refundedAmount || 0.00;
        this.restRefountAmount = (new Money(parseFloat(this.capturedAmount), currencyCode).subtract(new Money(parseFloat(this.refundedAmount), currencyCode))).getValue();
    }

    this.captures = !empty(captures) ? captures : [];
    this.purchaseUnits = purchaseUnits;
    // customer data
    this.firstname = transaction.payer.name.given_name;
    this.lastname = transaction.payer.name.surname;
    this.email = transaction.payer.email_address || ppConstants.UNKNOWN;
    // amount related
    this.amt = amount.value;
    this.currencycode = currencyCode;
    this.shippingAmount = shippingAmount;
    this.taxAmount = taxAmount;
    // ids
    this.invnum = purchaseUnits.invoice_id;
    this.mainTransactionId = isCustomOrder ? transaction.id : transactionId;
    this.transactionid = transactionId;
    this.authorizationId = !empty(payments.authorizations) && payments.authorizations[0].id;
    // order related
    this.order = order;
    this.orderTimeCreated = transaction.create_time ? paypalHelper.formatedDate(transaction.create_time) : '';
    this.orderTimeUpdated = transaction.update_time ? paypalHelper.formatedDate(transaction.update_time) : '';
    this.paymentstatus = paymentStatus;
    // flags
    this.isCaptured = this.capturedAmount === amount.value;
    this.isExpiredHonorPeriod = paypalHelper.isExpiredHonorPeriod(timeCreateUpdate);
    this.isCustomOrder = isCustomOrder;
}

module.exports = TransactionModel;
