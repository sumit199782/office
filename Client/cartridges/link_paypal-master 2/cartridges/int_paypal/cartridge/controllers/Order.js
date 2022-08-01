'use strict';

const page = module.superModule;
const server = require('server');

const OrderMgr = require('dw/order/OrderMgr');
const Money = require('dw/value/Money');
const formatMoney = require('dw/util/StringUtils').formatMoney;

const {
    validatePaypalPaymentInstrument
} = require('*/cartridge/scripts/paypal/middleware');

const {
    getPaypalPaymentInstrument
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');

server.extend(page);

server.append('Confirm', validatePaypalPaymentInstrument, function (req, res, next) {
    var order = OrderMgr.getOrder(req.form.orderID, req.form.orderToken);
    var paypalPaymentInstrument = getPaypalPaymentInstrument(order);
    var currency = order.getCurrencyCode();
    var amount = paypalPaymentInstrument.paymentTransaction.amount.value;
    var paypalEmail = paypalPaymentInstrument.custom.currentPaypalEmail;
    var paymentAmount = formatMoney(new Money(amount, currency));

    res.setViewData({
        paypal: {
            paypalEmail: paypalEmail,
            paymentAmount: paymentAmount
        }
    });

    next();
});

module.exports = server.exports();
