var cardTokenService = require("../services/card_token.js");
var chargeAPIService = require("../services/chargeAPIService.js");
var paymentMethodService = require("../services/stripePaymentMethodService.js");
var paymentIntentService = require("../services/stripePaymentIntent.js");
var BasketMgr = require('dw/order/BasketMgr');
var Site = require("dw/system/Site");

var currentBasket = BasketMgr.getCurrentBasket();
var description = '';

//confirm paymentIntent by service call
function confirmPaymentIntent(stripe_payment_id) {
    var url = paymentIntentService.paymentIntent.getURL();

    var stripe_payment_intent_confirm = paymentIntentService.paymentIntent.setURL(url + '/' + stripe_payment_id + '/confirm').call();

    return stripe_payment_intent_confirm;
}

//created payment method and payment intent by service call
function createPaymentMethodAndIntent(data, orderIntent) {
    var stripe_TestCustomer_ID = Site.getCurrent().getCustomPreferenceValue("Stripe_Test_Customer_ID");

    var body = {
        "type": "card",
        "card[number]": data.card_no,
        "card[exp_month]": data.month,
        "card[exp_year]": data.year,
        "card[cvc]": data.cvc,
        "billing_details[address][city]": data.city,
        "billing_details[address][country]": data.country,
        "billing_details[address][line1]": data.address_line1,
        "billing_details[address][line2]": data.address_line2,
        "billing_details[address][postal_code]": data.address_zip,
        "billing_details[address][state]": data.state,
        "billing_details[email]": data.email,
        "billing_details[name]": data.name,
        "billing_details[phone]": data.phone
    };

    if(currentBasket.allProductLineItems.length > 1){
        for(let i = 0 ; i < currentBasket.allProductLineItems.length ; i++){    
            description += currentBasket.allProductLineItems[i].productID + ' | ' 
                        + currentBasket.allProductLineItems[i].productName + ' | ' 
                        + data.name + ', ';
        }
        description = description.slice(0, -1);
    }
    else{
        description = currentBasket.allProductLineItems[0].productID + ' | ' 
                    + currentBasket.allProductLineItems[0].productName + ' | ' 
                    + data.name;
    }

    var paymentMethod = paymentMethodService.payment_method.call(body);
    var paymentIntentBody = {
        "amount": orderIntent.amount,
        "currency": orderIntent.currencyCode.toLowerCase(),
        "payment_method_types[]": "card",
        "receipt_email": orderIntent.customerEmail,
        "customer": stripe_TestCustomer_ID,
        "payment_method": paymentMethod.object.id,
        "description": description
    };
    var stripe_payment_intent = paymentIntentService.paymentIntent.call(paymentIntentBody);

    return stripe_payment_intent;
}

//create card token by service call
function getCardToken(data) {
    var body = {
        "card[number]": data.card_no,
        "card[exp_month]": data.month,
        "card[exp_year]": data.year,
        "card[cvc]": data.cvc,
        "card[address_city]": data.city,
        "card[address_country]": data.country,
        "card[address_line1]": data.address_line1,
        "card[address_state]": data.address_line2,
        "card[address_zip]": data.address_zip,
        "card[name]": data.name,
    };
    var result = cardTokenService.card_token.call(body);
    return result;
}

//create charge and confirm payment by service call
function chargePayment(token, customerData) {

    if(currentBasket.allProductLineItems.length > 1){
        for(let i = 0 ; i < currentBasket.allProductLineItems.length ; i++){    
            description += currentBasket.allProductLineItems[i].productID + ' | ' 
                        + currentBasket.allProductLineItems[i].productName + ', ';
        }
        description = description.slice(0, -1);
    }
    else{
        description = currentBasket.allProductLineItems[0].productID + ' | ' 
                    + currentBasket.allProductLineItems[0].productName;
    }
    
    var body = {
        source: token.id,
        amount: customerData.amount,
        currency: customerData.currencyCode.toLowerCase(),
        description: description,
        receipt_email: customerData.customerEmail,
    };

    var result = chargeAPIService.chargeAPI.call(body);
    return result;
}
module.exports = {
    getCardToken: getCardToken,
    chargePayment: chargePayment,
    createPaymentMethodAndIntent: createPaymentMethodAndIntent,
    confirmPaymentIntent: confirmPaymentIntent
};
