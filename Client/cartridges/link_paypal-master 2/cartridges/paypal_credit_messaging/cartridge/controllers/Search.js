'use strict';

const page = module.superModule;
const server = require('server');

const Site = require('dw/system/Site');
const BasketMgr = require('dw/order/BasketMgr');

const {
    getClientId,
    createCartSDKUrl
} = require('*/cartridge/scripts/paypal/paypalUtils');

const {
    isPaypalButtonEnabled
} = require('*/cartridge/scripts/paypal/helpers/paypalHelper');

const {
    categoryMessageConfig
} = require('*/cartridge/config/creditMessageConfig');

const {
    paypalPaymentMethodId,
    billingAgreementEnabled
} = require('*/cartridge/config/paypalPreferences');

server.extend(page);

server.append('Show', function (req, res, next) {
    var currentSite = Site.getCurrent();
    var creditMessageAvaliable = !billingAgreementEnabled && paypalPaymentMethodId && currentSite.getCustomPreferenceValue('PP_Show_On_Category');
    if (creditMessageAvaliable) {
        var basket = BasketMgr.getCurrentBasket();
        var clientID = getClientId();

        var creditMessageSdk = 'https://www.paypal.com/sdk/js?client-id=' + clientID + '&components=messages';
        var bannerSdkUrl = isPaypalButtonEnabled('minicart') ? (createCartSDKUrl()) : creditMessageSdk;

        res.setViewData({
            paypal: {
                bannerSdkUrl: bannerSdkUrl,
                bannerConfig: categoryMessageConfig,
                paypalAmount: basket && basket.totalGrossPrice.value
            },
            creditMessageAvaliable: creditMessageAvaliable
        });
    }

    next();
});

module.exports = server.exports();
