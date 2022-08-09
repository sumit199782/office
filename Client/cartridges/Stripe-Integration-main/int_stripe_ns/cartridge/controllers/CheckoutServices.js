"use strict";

var server = require("server");
var PaymentManager = require("dw/order/PaymentMgr");
var BasketMgr = require("dw/order/BasketMgr");
var stripeTokenHelper = require("*/cartridge/scripts/stripeTokenHelper.js");

server.extend(module.superModule);

server.append("SubmitPayment", function (req, res, next) {
    var data = res.getViewData();
    var currentBasket = BasketMgr.getCurrentBasket();
    var paymentProcessor = PaymentManager.getPaymentMethod(data.paymentMethod.value).getPaymentProcessor();

    if (paymentProcessor.ID == "STRIPE") {

        var cardDetails = {
            card_no: data.paymentInformation.cardNumber.value,
            month: data.paymentInformation.expirationMonth.value,
            year: data.paymentInformation.expirationYear.value,
            cvc: data.paymentInformation.securityCode.value,
            city: data.address.city.value,
            state: data.address.stateCode.value,
            country: data.address.countryCode.value,
            address_line1: data.address.address1.value,
            address_line2: data.address.address2.value,
            address_state: data.address.stateCode.value,
            address_zip: data.address.postalCode.value,
            name: data.address.firstName.value + " " + data.address.lastName.value,
            phone: data.phone.value,
            email: currentBasket.customerEmail,
        };
        
        var orderIntent = {
            customerEmail: currentBasket.customerEmail,
            currencyCode: currentBasket.currencyCode,
            amount: currentBasket.totalGrossPrice.value * 100,
        };

        var stripe_paymentIntent_created =
            stripeTokenHelper.createPaymentMethodAndIntent(
                cardDetails,
                orderIntent
            );

        session.custom.stripe_payment_id = JSON.stringify(stripe_paymentIntent_created.object);
    }
    next();
});

server.prepend("PlaceOrder", function (req, res, next) {
    var stripe_payment_id = JSON.parse(session.custom.stripe_payment_id);

    if (stripe_payment_id != null) {
        var result = stripeTokenHelper.confirmPaymentIntent(
            stripe_payment_id.id
        );

        var stripe_result_data = {
            receipt_url: result.object.charges.data[0].receipt_url,
            id: result.object.id,
            status: result.object.status,
        };
        session.custom.stripe_order_details =
            JSON.stringify(stripe_result_data);
    }
    next();
});

module.exports = server.exports();
