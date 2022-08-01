'use strict';

const page = module.superModule;
const server = require('server');

const Site = require('dw/system/Site');
const BasketMgr = require('dw/order/BasketMgr');

const {
    getClientId
} = require('*/cartridge/scripts/paypal/paypalUtils');

const {
    cartMessageConfig
} = require('*/cartridge/config/creditMessageConfig');

const {
    paypalPaymentMethodId,
    billingAgreementEnabled
} = require('*/cartridge/config/paypalPreferences');

server.extend(page);

server.append('Show', function (req, res, next) {
    var currentSite = Site.getCurrent();
    var creditMessageAvaliable = !billingAgreementEnabled && paypalPaymentMethodId && currentSite.getCustomPreferenceValue('PP_Show_On_Cart');
    if (!creditMessageAvaliable) return next();
    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var basket = BasketMgr.getCurrentBasket();
        if (!basket) {
            return;
        }
        var clientID = getClientId();
        var bannerSdkUrl = 'https://www.paypal.com/sdk/js?client-id=' + clientID + '&components=messages';

        res.setViewData({
            paypalAmount: basket.totalGrossPrice.value,
            bannerSdkUrl: bannerSdkUrl,
            bannerConfig: cartMessageConfig,
            creditMessageAvaliable: creditMessageAvaliable
        });
    });

    return next();
});

module.exports = server.exports();
