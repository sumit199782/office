'use strict';
var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var BasketMgr = require('dw/order/BasketMgr');
var service = require('*/cartridge/services/auth');

/**
 * Verifies the required information for billing form is provided.
 * @param {Object} req - The request object
 * @param {Object} paymentForm - the payment form
 * @param {Object} viewFormData - object contains billing form data
 * @returns {Object} an object that has error information or payment information
 */
function processForm(req, paymentForm, viewFormData) {
    var array = require('*/cartridge/scripts/util/array');
    var viewData = viewFormData;
    var creditCardErrors = {};
    var currentBasket = BasketMgr.getCurrentBasket();
    // var qty = currentBasket.productQuantityTotal;
    var quantityTotal = currentBasket.productQuantityTotal;
    // var cusID = currentBasket.customer.ID;
    // var cardNumber = paymentForm.creditCardFields.cardNumber.htmlValue;
    // var expMonth = paymentForm.creditCardFields.expirationMonth.htmlValue;
    // var expYear = parseInt(paymentForm.creditCardFields.expirationYear.htmlValue.replace(',',''));
    // var cardExpire = expYear+"-"+expMonth;
    var cvv = paymentForm.creditCardFields.securityCode.htmlValue;
    var postData =  "{\n    \"createTransactionRequest\": {\n        \"merchantAuthentication\": {\n            \"name\": \"8r9u6A7Fx\",\n            \"transactionKey\": \"2U3u64YBthCbY273\"\n        },\n        \"refId\": \"123478\",\n        \"transactionRequest\": {\n            \"transactionType\": \"authCaptureTransaction\",\n            \"amount\": "+quantityTotal+",\n            \"payment\": {\n                \"creditCard\": {\n                    \"cardNumber\": "+paymentForm.creditCardFields.cardNumber.htmlValue+",\n                    \"expirationDate\": \"2025-01\",\n                    \"cardCode\": "+cvv+"\n                }\n            },\n            \"transactionSettings\": {\n                \"setting\": {\n                    \"settingName\": \"testRequest\",\n                    \"settingValue\": \"false\"\n                }\n            },\n            \"userFields\": {\n                \"userField\": [\n                    {\n                        \"name\": \"MerchantDefinedFieldName1\",\n                        \"value\": \"MerchantDefinedFieldValue1\"\n                    }\n                ]\n            },\n        }\n    }\n}";
    var svcResult = service.authorizeAPIService.call(postData);
    // var obj = svcResult.object
    if (svcResult.status === 'OK') {
        // var resultfromservice
        // var k=0;
    }
    if (!req.form.storedPaymentUUID) {
        // verify credit card form data
        creditCardErrors = COHelpers.validateCreditCard(paymentForm);
    }
    if (Object.keys(creditCardErrors).length) {
        return {
            fieldErrors: creditCardErrors,
            error: true
        };
    }
    viewData.paymentMethod = {
        value: paymentForm.paymentMethod.value,
        htmlName: paymentForm.paymentMethod.value
    };
    viewData.paymentInformation = {
        cardType: {
            value: paymentForm.creditCardFields.cardType.value,
            htmlName: paymentForm.creditCardFields.cardType.htmlName
        },
        cardNumber: {
            value: paymentForm.creditCardFields.cardNumber.value,
            htmlName: paymentForm.creditCardFields.cardNumber.htmlName
        },
        securityCode: {
            value: paymentForm.creditCardFields.securityCode.value,
            htmlName: paymentForm.creditCardFields.securityCode.htmlName
        },
        expirationMonth: {
            value: parseInt(
                paymentForm.creditCardFields.expirationMonth.selectedOption,
                10
            ),
            htmlName: paymentForm.creditCardFields.expirationMonth.htmlName
        },
        expirationYear: {
            value: parseInt(paymentForm.creditCardFields.expirationYear.value, 10),
            htmlName: paymentForm.creditCardFields.expirationYear.htmlName
        }
    };
    if (req.form.storedPaymentUUID) {
        viewData.storedPaymentUUID = req.form.storedPaymentUUID;
    }
    viewData.saveCard = paymentForm.creditCardFields.saveCard.checked;
    // process payment information
    if (viewData.storedPaymentUUID
        && req.currentCustomer.raw.authenticated
        && req.currentCustomer.raw.registered
    ) {
        var paymentInstruments = req.currentCustomer.wallet.paymentInstruments;
        var paymentInstrument = array.find(paymentInstruments, function (item) {
            return viewData.storedPaymentUUID === item.UUID;
        });
        viewData.paymentInformation.cardNumber.value = paymentInstrument.creditCardNumber;
        viewData.paymentInformation.cardType.value = paymentInstrument.creditCardType;
        viewData.paymentInformation.securityCode.value = req.form.securityCode;
        viewData.paymentInformation.expirationMonth.value = paymentInstrument.creditCardExpirationMonth;
        viewData.paymentInformation.expirationYear.value = paymentInstrument.creditCardExpirationYear;
        viewData.paymentInformation.creditCardToken = paymentInstrument.raw.creditCardToken;
    }
    return {
        error: false,
        viewData: viewData
    };
}
/**
 * Save the credit card information to login account if save card option is selected
 * @param {Object} req - The request object
 * @param {dw.order.Basket} basket - The current basket
 * @param {Object} billingData - payment information
 */
function savePaymentInformation(req, basket, billingData) {
    var CustomerMgr = require('dw/customer/CustomerMgr');
    if (!billingData.storedPaymentUUID
        && req.currentCustomer.raw.authenticated
        && req.currentCustomer.raw.registered
        && billingData.saveCard
        && (billingData.paymentMethod.value === 'CREDIT_CARD')
    ) {
        var customer = CustomerMgr.getCustomerByCustomerNumber(
            req.currentCustomer.profile.customerNo
        );
        var saveCardResult = COHelpers.savePaymentInstrumentToWallet(
            billingData,
            basket,
            customer
        );
        req.currentCustomer.wallet.paymentInstruments.push({
            creditCardHolder: saveCardResult.creditCardHolder,
            maskedCreditCardNumber: saveCardResult.maskedCreditCardNumber,
            creditCardType: saveCardResult.creditCardType,
            creditCardExpirationMonth: saveCardResult.creditCardExpirationMonth,
            creditCardExpirationYear: saveCardResult.creditCardExpirationYear,
            UUID: saveCardResult.UUID,
            creditCardNumber: Object.hasOwnProperty.call(
                saveCardResult,
                'creditCardNumber'
            )
                ? saveCardResult.creditCardNumber
                : null,
            raw: saveCardResult
        });
    }
}
exports.processForm = processForm;
exports.savePaymentInformation = savePaymentInformation;