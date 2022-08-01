/* eslint-disable no-shadow */
'use strict';

const page = module.superModule;
const server = require('server');

const Transaction = require('dw/system/Transaction');
const HookMgr = require('dw/system/HookMgr');
const Locale = require('dw/util/Locale');
const BasketMgr = require('dw/order/BasketMgr');
const AccountModel = require('*/cartridge/models/account');
const OrderModel = require('*/cartridge/models/order');

const {
    validateExpiredTransaction,
    validatePaymentMethod,
    validateGiftCertificateAmount
} = require('*/cartridge/scripts/paypal/middleware');

const {
    getPurchaseUnit,
    isPurchaseUnitChanged,
    basketModelHack,
    updateCustomerPhone,
    updatePayPalEmail
} = require('*/cartridge/scripts/paypal/helpers/paypalHelper');

const {
    getPaypalPaymentInstrument,
    getPaymentInstrumentAction
} = require('*/cartridge/scripts/paypal/helpers/paymentInstrumentHelper');

const {
    updateOrderDetails,
    getOrderDetails,
    getBADetails
} = require('*/cartridge/scripts/paypal/paypalApi');

const {
    encodeString,
    errorHandle
} = require('*/cartridge/scripts/paypal/paypalUtils');

const {
    isSameBillingAgreement,
    createBaFromForm
} = require('*/cartridge/scripts/paypal/helpers/billingAgreementHelper');

const {
    updateOrderBillingAddress,
    updateBABillingAddress
} = require('*/cartridge/scripts/paypal/helpers/addressHelper');

const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');
var venmoName = paypalConstants.PAYMENT_METHOD_ID_VENMO;

server.extend(page);

server.append('SubmitPayment',
    validateExpiredTransaction,
    validatePaymentMethod,
    validateGiftCertificateAmount,
    function (req, res, next) {
        var basket = BasketMgr.getCurrentBasket();
        var currencyCode = basket.getCurrencyCode();
        var paypalPaymentInstrument = getPaypalPaymentInstrument(basket);
        var billingData = res.getViewData();
        var billingForm = server.forms.getForm('billing');

        if (!paypalPaymentInstrument) {
            this.on('route:BeforeComplete', function (_, res) {
                var paypalPaymentInstrument = getPaypalPaymentInstrument(basket);
                if (!paypalPaymentInstrument) return;
                var currentBasket = BasketMgr.getCurrentBasket();
                var viewData = res.getViewData();

                updatePayPalEmail({
                    basketModel: viewData.order,
                    paypalPI: getPaypalPaymentInstrument(currentBasket)
                });
                basketModelHack(viewData.order, currencyCode, paypalPaymentInstrument.custom);

                res.json(viewData);
            });
            return next();
        }
        var {
            noOrderIdChange,
            isOrderIdChanged,
            checkBillingAgreement
        } = getPaymentInstrumentAction(paypalPaymentInstrument, billingForm.paypal);

        updateCustomerPhone(basket, billingData);

        if (checkBillingAgreement) {
            var activeBA = createBaFromForm(billingForm);
            var baFromPaymentInstrument;

            try {
                baFromPaymentInstrument = JSON.parse(paypalPaymentInstrument.custom.PP_API_ActiveBillingAgreement);
            } catch (err) {
                return errorHandle.call(this, req, res, err);
            }

            if (!isSameBillingAgreement(baFromPaymentInstrument, activeBA)) {
                Transaction.wrap(function () {
                    paypalPaymentInstrument.custom.PP_API_ActiveBillingAgreement = JSON.stringify(activeBA);
                });
                // if account is changed to different one we update billing address and email
                if (baFromPaymentInstrument.email !== activeBA.email) {
                    var { billing_info, err: BADetailsError } = getBADetails(paypalPaymentInstrument);
                    if (BADetailsError) {
                        return errorHandle.call(this, req, res, BADetailsError);
                    }
                    updateBABillingAddress(basket, billing_info);
                    session.privacy.paypalPayerEmail = billing_info.email;
                } else {
                    session.privacy.paypalPayerEmail = paypalPaymentInstrument.custom.currentPaypalEmail;
                }
            }
        }

        // if user goes through checkout with the same session account we update order details if needed
        if (noOrderIdChange) {
            var purchase_unit = getPurchaseUnit(basket);
            if (purchase_unit.amount.value === '0') {
                return errorHandle.call(this, req, res, null, 'zeroamount');
            }
            var isUpdateRequired = isPurchaseUnitChanged(purchase_unit);
            if (isUpdateRequired) {
                var { err: updateOrderDetailsError } = updateOrderDetails(paypalPaymentInstrument, purchase_unit);
                if (updateOrderDetailsError) {
                    return errorHandle.call(this, req, res, updateOrderDetailsError);
                }
                session.privacy.orderDataHash = encodeString(purchase_unit);
            }
        }

        // if user changes one session account to another we update billing address and email
        if (isOrderIdChanged) {
            Transaction.wrap(function () {
                paypalPaymentInstrument.custom.paypalOrderID = billingForm.paypal.paypalOrderID.htmlValue;
                // clear paymentId property in case of NOT Venmo account
                if (paypalPaymentInstrument.custom.paymentId === venmoName && billingForm.paypal.usedPaymentMethod.htmlValue !== venmoName) {
                    paypalPaymentInstrument.custom.paymentId = null;
                    // set paymentId property in case of change to Venmo account
                } else if (billingForm.paypal.usedPaymentMethod.htmlValue === venmoName && paypalPaymentInstrument.custom.paymentId !== venmoName) {
                    paypalPaymentInstrument.custom.paymentId = venmoName;
                }
            });

            var { payer, err: OrderDetailsError } = getOrderDetails(paypalPaymentInstrument);
            if (OrderDetailsError) {
                return errorHandle.call(this, req, res, OrderDetailsError);
            }
            updateOrderBillingAddress(basket, payer);
            session.privacy.paypalPayerEmail = payer.email_address;
        }

        Transaction.wrap(function () {
            HookMgr.callHook('dw.order.calculate', 'calculate', basket);
        });

        var usingMultiShipping = false; // Current integration support only single shpping
        req.session.privacyCache.set('usingMultiShipping', usingMultiShipping);
        var currentLocale = Locale.getLocale(req.locale.id);

        var basketModel = new OrderModel(basket, { usingMultiShipping: usingMultiShipping, countryCode: currentLocale.country, containerView: 'basket' });

        updatePayPalEmail({
            basketModel: basketModel,
            paypalPI: paypalPaymentInstrument
        });
        basketModelHack(basketModel, currencyCode, paypalPaymentInstrument.custom);

        res.json({
            customer: new AccountModel(req.currentCustomer),
            order: basketModel,
            form: billingForm,
            fieldErrors: [],
            error: false
        });
        this.emit('route:Complete', req, res);
    });

module.exports = server.exports();
