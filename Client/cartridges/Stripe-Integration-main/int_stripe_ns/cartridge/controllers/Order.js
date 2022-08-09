'use strict';

var server = require("server");
var Transaction = require('dw/system/Transaction');
var OrderMgr = require('dw/order/OrderMgr');

server.extend(module.superModule);

server.prepend('Confirm', function (req, res, next) {

    //store record in payment tab of order
    if(session.custom.stripe_order_details != null) {
        if (!req.form.orderToken || !req.form.orderID) {
            res.render('/error', {
                message: Resource.msg('error.confirmation.error', 'confirmation', null)
            });

            return next();
        }

        var order = OrderMgr.getOrder(req.form.orderID, req.form.orderToken);

        var stripe_order_details = JSON.parse(session.custom.stripe_order_details)

        Transaction.wrap(function () {
            order.paymentInstruments[0].custom.receipt_url = stripe_order_details.receipt_url;
            order.paymentInstruments[0].custom.stripe_ID = stripe_order_details.id;
            order.paymentInstruments[0].custom.transaction_Status = stripe_order_details.status;
        })
        session.custom.stripe_order_details = '';
    }
    next();
})

module.exports = server.exports();
