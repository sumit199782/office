'use strict';

const server = require('server');

const OrderMgr = require('dw/order/OrderMgr');
const Transaction = require('dw/system/Transaction');
const Order = require('dw/order/Order');
const Money = require('dw/value/Money');
const StringUtils = require('dw/util/StringUtils');
const TaxMgr = require('dw/order/TaxMgr');
const BasketMgr = require('dw/order/BasketMgr');
const Encoding = require('dw/crypto/Encoding');
const Bytes = require('dw/util/Bytes');
const CustomObjectMgr = require('dw/object/CustomObjectMgr');

const {
    encodeString
} = require('*/cartridge/scripts/paypal/paypalUtils');

const {
    paypalPaymentMethodId,
    billingAgreementDescription,
    paypalButtonLocation,
    billingAgreementEnabled
} = require('*/cartridge/config/paypalPreferences');

const {
    calculateNonGiftCertificateAmount
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');

const {
    createShippingAddress,
    getBAShippingAddress
} = require('*/cartridge/scripts/paypal/helpers/addressHelper');

const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');

/**
 * Create purchase unit description based on items in the basket
 * @param  {dw.order.ProductLineItem} productLineItems Items in the basket
 * @returns {string} item description
 */
function getItemsDescription(productLineItems) {
    if (productLineItems.length === 0) {
        return '';
    }
    return Array.map(productLineItems, function (productLineItem) {
        return productLineItem.productName;
    }).join(',').substring(0, 127);
}

/**
 * Create purchase unit description based on gifts in the basket
 * @param  {dw.order.LineItemCtnr} giftCertificateLineItems Items in the basket
 * @returns {string} gift description
 */
function getGiftCertificateDescription(giftCertificateLineItems) {
    if (giftCertificateLineItems.length === 0) {
        return '';
    }
    return Array.map(giftCertificateLineItems, function (giftCertLineItem) {
        return giftCertLineItem.lineItemText + ' for ' + giftCertLineItem.recipientEmail;
    }).join(',').substring(0, 127);
}

/**
 * @param  {dw.value.Money} acc current basket order + product discount
 * @param  {dw.order.OrderPaymentInstrument} giftCertificate GC from the basket
 * @returns {dw.value.Money} Gift certificate cotal
 */
function getAppliedGiftCertificateTotal(acc, giftCertificate) {
    return acc.add(giftCertificate.paymentTransaction.amount);
}

/**
 * Creates puchase unit data
 * PayPal amount should equal: item_total + tax_total + shipping + handling + insurance - shipping_discount - discount
 *
 * @param {dw.order.Basket} currentBasket - user's basket
 * @param {boolean} isCartFlow - whether from cart or no
 * @returns {Object} with purchase unit data
 */
function getPurchaseUnit(currentBasket, isCartFlow) {
    var {
        currencyCode,
        defaultShipment,
        productLineItems,
        shippingTotalPrice,
        adjustedShippingTotalPrice,
        merchandizeTotalPrice,
        adjustedMerchandizeTotalPrice,
        giftCertificateLineItems,
        giftCertificateTotalPrice,
        totalTax
    } = currentBasket;
    var orderNo;
    var handling;
    var insurance;

    Transaction.wrap(function () {
        orderNo = currentBasket instanceof Order ?
            currentBasket.orderNo :
            OrderMgr.createOrderNo();
    });
    var nonShippingDiscount = Array.reduce(
        currentBasket.giftCertificatePaymentInstruments,
        getAppliedGiftCertificateTotal,
        merchandizeTotalPrice.subtract(adjustedMerchandizeTotalPrice)
    );
    var description = getItemsDescription(productLineItems) + ' ' + getGiftCertificateDescription(giftCertificateLineItems);

    var purchaseUnit = {
        description: description.trim(),
        amount: {
            currency_code: currencyCode,
            value: calculateNonGiftCertificateAmount(currentBasket).value.toString(),
            breakdown: {
                item_total: {
                    currency_code: currencyCode,
                    value: merchandizeTotalPrice.add(giftCertificateTotalPrice).value.toString()
                },
                shipping: {
                    currency_code: currencyCode,
                    value: shippingTotalPrice.value.toString()
                },
                tax_total: {
                    currency_code: currencyCode,
                    value: TaxMgr.getTaxationPolicy() === TaxMgr.TAX_POLICY_GROSS ? '0' : totalTax.value.toString()
                },
                handling: {
                    currency_code: currencyCode,
                    value: !empty(handling) ? handling : '0'
                },
                insurance: {
                    currency_code: currencyCode,
                    value: !empty(insurance) ? insurance : '0'
                },
                shipping_discount: {
                    currency_code: currencyCode,
                    value: shippingTotalPrice
                        .subtract(adjustedShippingTotalPrice)
                        .value.toString()
                },
                discount: {
                    currency_code: currencyCode,
                    value: nonShippingDiscount.value.toString()
                }
            }
        },
        invoice_id: orderNo
    };

    purchaseUnit.shipping_preference = 'GET_FROM_FILE';
    if (!isCartFlow && defaultShipment && defaultShipment.getShippingAddress()) {
        purchaseUnit.shipping = createShippingAddress(defaultShipment.getShippingAddress());
        purchaseUnit.shipping_preference = 'SET_PROVIDED_ADDRESS';
    }
    if (empty(productLineItems) && !empty(giftCertificateLineItems)) {
        purchaseUnit.shipping_preference = 'NO_SHIPPING';
    }
    return purchaseUnit;
}

/**
 * Returns transaction end time, result
 * (min) transaction lifetime (by default 72h or 4320min)
 * @param {dw.order.PaymentInstrument} paymentInstrument - PayPal payment instrument from basket
 * @returns {boolean} expired status
 */
function isExpiredTransaction(paymentInstrument) {
    if (!paymentInstrument) return false;

    var min = 4320;
    return Date.now() >= new Date(Date.parse(paymentInstrument.creationDate) + min * 60000).getTime();
}

/**
 * Returns whether purchase unit has changed
 * @param {Object} purchaseUnit - purchase unit
 * @returns {boolean}  true or false
 */
function isPurchaseUnitChanged(purchaseUnit) {
    if (!session.privacy.orderDataHash) return true;
    return session.privacy.orderDataHash !== encodeString(purchaseUnit);
}

/**
 * Returns whether basket has giftCertificates
 * @param {dw.order.Basket} currentBasket - user's basket
 * @returns {boolean}  true or false
 */
function hasGiftCertificates(currentBasket) {
    return currentBasket.giftCertificateLineItems.length > 0;
}

/**
 * Returns whether basket has only giftCertificates
 * @param {dw.order.Basket} currentBasket - user's basket
 * @returns {boolean}  true or false
 */
function hasOnlyGiftCertificates(currentBasket) {
    return currentBasket && currentBasket.giftCertificateLineItems.length > 0 && currentBasket.productLineItems.length === 0;
}

/**
 * The hack renders right mock data for updatePaymentInformation(order)
 * @param {Object} basketModel - order data
 * @param {string} currencyCode - currencyCode
 * @param {Object} ppPaymentInstrumentCustomProps - custom properties of paypal payment instrument
 */
function basketModelHack(basketModel, currencyCode, ppPaymentInstrumentCustomProps) {
    var {
        resources,
        billing
    } = basketModel;
    resources.cardType = '';
    resources.cardEnding = '';
    var paypalAmount = billing.payment.selectedPaymentInstruments[0].amount;

    billing.payment.selectedPaymentInstruments.forEach(function (pi) {
        if (pi.paymentMethod === paypalPaymentMethodId) {
            pi.type = '';
            pi.maskedCreditCardNumber = basketModel.paypalPayerEmail || '';
            pi.expirationMonth = ppPaymentInstrumentCustomProps.paymentId === paypalConstants.PAYMENT_METHOD_ID_VENMO ?
                paypalConstants.PAYMENT_METHOD_ID_VENMO + ' ' : paypalConstants.PAYMENT_METHOD_ID_PAYPAL + ' ';
            pi.expirationYear = ' ' + StringUtils.formatMoney(new Money(paypalAmount, currencyCode));
        }
    });
}

/**
 * Creates payment form for cart checkout
 * @param  {Object} data - paypal data from req
 * @returns {Object} object with payment form
 */
function cartPaymentForm(data) {
    return {
        billingForm: {
            paymentMethod: {
                value: paypalPaymentMethodId
            },
            paypal: {
                paypalOrderID: {
                    value: data.paypalData && data.paypalData.paypalOrderID
                },
                paypalActiveAccount: {
                    htmlValue: data.paypalData && data.paypalData.payerEmail
                },
                billingAgreementID: {
                    htmlValue: data.paypalData && data.paypalData.billingAgreementId
                },
                makeDefaultPaypalAccount: {
                    checked: true
                },
                savePaypalAccount: {
                    checked: true
                }
            }
        }
    };
}

/**
 * Returns needed REST API data for Create a billing agreement token requst
 *
 * @param {boolean} isCartFlow - is billing agreement flow from cart
 * @returns {Object} with token creation request data
 */
function getBARestData(isCartFlow) {
    var baTokenData = {
        path: 'v1/billing-agreements/agreement-tokens',
        method: 'POST',
        body: {
            description: billingAgreementDescription || '',
            payer: {
                payment_method: 'PAYPAL'
            },
            plan: {
                type: 'MERCHANT_INITIATED_BILLING_SINGLE_AGREEMENT',
                merchant_preferences: {
                    return_url: '1',
                    cancel_url: '2',
                    accepted_pymt_type: 'INSTANT',
                    skip_shipping_address: false,
                    immutable_shipping_address: !isCartFlow
                }
            }
        }
    };

    var {
        currentBasket
    } = BasketMgr;

    if (hasOnlyGiftCertificates(currentBasket)) {
        baTokenData.body.plan.merchant_preferences.skip_shipping_address = true;
    } else if (!isCartFlow) {
        var shippingAddress = currentBasket.getDefaultShipment().getShippingAddress();
        baTokenData.body.shipping_address = getBAShippingAddress(shippingAddress);
    }

    return baTokenData;
}

/**
 * Sets customer's phone to basket if user filled up or changed email on storefront
 *
 * @param {Object} basket - current user's basket
 * @param {Object} billingData - billing data from billing form
 */
function updateCustomerPhone(basket, billingData) {
    var billing = basket.getBillingAddress();
    if (billingData.phone && !empty(billingData.phone.value) &&
        basket.billingAddress.phone !== billingData.phone.value) {
        Transaction.wrap(function () {
            billing.setPhone(billingData.phone.value);
        });
    } else if (billingData.form && billingData.form.contactInfoFields.phone &&
        (!empty(billingData.form.contactInfoFields.phone.htmlValue) &&
            basket.billingAddress.phone !== billingData.form.contactInfoFields.phone.htmlValue)) {
        Transaction.wrap(function () {
            billing.setPhone(billingData.form.contactInfoFields.phone.htmlValue);
        });
    }
}

/**
 * Updates PayPal email
 *
 * @param {Object} params data object with basketModel and paypalPaymentInstrument
 */
function updatePayPalEmail(params) {
    if (session.privacy.paypalPayerEmail) {
        params.basketModel.paypalPayerEmail = session.privacy.paypalPayerEmail;
        if (params.paypalPI && params.paypalPI.custom.currentPaypalEmail !== session.privacy.paypalPayerEmail) {
            Transaction.wrap(function () {
                params.paypalPI.custom.currentPaypalEmail = session.privacy.paypalPayerEmail;
            });
        }
    } else {
        params.basketModel.paypalPayerEmail = params.paypalPI.custom.currentPaypalEmail || '';
    }
    session.privacy.paypalPayerEmail = null;
}

/**
 * Check if Paypal button is enabled
 * @param {string} targetPage prefs value
 * @return {boolean} disabled or enabled
 */
function isPaypalButtonEnabled(targetPage) {
    var displayPages = paypalButtonLocation.toLowerCase();
    if (displayPages === 'billing' || !targetPage) {
        return false;
    }
    return displayPages.indexOf(targetPage) !== -1;
}

/**
 * Get Billing Form Fields
 * @param {dw.order.PaymentInstrument} paypalPaymentInstrument active paypal payment instrument, if exist
 * @param {Object} defaultBA default BA from customer profile, if exist
 * @return {Object} of form fields
 */
function getPreparedBillingFormFields(paypalPaymentInstrument, defaultBA) {
    var billingForm = server.forms.getForm('billing');
    var paypalEmail = paypalPaymentInstrument && paypalPaymentInstrument.custom.currentPaypalEmail;
    var paypalOrderID = paypalPaymentInstrument && paypalPaymentInstrument.custom.paypalOrderID;
    var usedPaymentMethod = billingForm.paypal.usedPaymentMethod.htmlValue;

    billingForm.clear();
    var data = {};

    if (billingAgreementEnabled) {
        data.savePaypalAccount = true;
        data.makeDefaultPaypalAccount = true;
        data.billingAgreementID = defaultBA.baID;
        data.billingAgreementPayerEmail = defaultBA.email;
    } else {
        data.paypalActiveAccount = paypalEmail;
        data.paypalOrderID = paypalOrderID;
        data.usedPaymentMethod = usedPaymentMethod;
    }

    var ppFields = {
        paymentMethod: {
            name: billingForm.paymentMethod.htmlName,
            value: paypalPaymentMethodId
        }
    };
    Object.keys(data).forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(billingForm.paypal, key)) {
            ppFields[key] = {
                name: billingForm.paypal[key].htmlName,
                value: !empty(data[key]) ? data[key] : ''
            };
        }
    });

    return ppFields;
}

/**
 * Create URL for a call
 * @param  {dw.svc.ServiceCredential} credential current service credential
 * @param  {string} path REST action endpoint
 * @returns {string} url for a call
 */
function getUrlPath(credential, path) {
    var url = credential.URL;
    if (!url.match(/.+\/$/)) {
        url += '/';
    }
    url += path;
    return url;
}
/**
 * Encoding the paased credentials to Base64 string
 * @param {dw.svc.ServiceCredential} credentials Service credentials
 * @returns {string} Base64 string
 */
function getAccessToken(credentials) {
    var authCredentials = credentials.user + ':' + credentials.password;

    return Encoding.toBase64(Bytes(authCredentials));
}

/**
 * Return an order or object of PayPalNewTransactions custom object
 * @param {*} orderNo Order number
 * @returns {dw.order.Order} Order instance
 */
function getOrderByOrderNo(orderNo) {
    var order = CustomObjectMgr.getCustomObject('PayPalNewTransactions', orderNo) || OrderMgr.queryOrder('orderNo = {0}', orderNo);

    return order;
}

module.exports = {
    isExpiredTransaction: isExpiredTransaction,
    isPurchaseUnitChanged: isPurchaseUnitChanged,
    hasGiftCertificates: hasGiftCertificates,
    hasOnlyGiftCertificates: hasOnlyGiftCertificates,
    getPurchaseUnit: getPurchaseUnit,
    basketModelHack: basketModelHack,
    cartPaymentForm: cartPaymentForm,
    getBARestData: getBARestData,
    updateCustomerPhone: updateCustomerPhone,
    updatePayPalEmail: updatePayPalEmail,
    isPaypalButtonEnabled: isPaypalButtonEnabled,
    getPreparedBillingFormFields: getPreparedBillingFormFields,
    getUrlPath: getUrlPath,
    getAccessToken: getAccessToken,
    getOrderByOrderNo: getOrderByOrderNo
};
