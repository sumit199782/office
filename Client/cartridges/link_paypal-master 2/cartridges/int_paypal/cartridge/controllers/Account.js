'use strict';

const page = module.superModule;
const server = require('server');

const {
    validateWhetherPaypalEnabled
} = require('*/cartridge/scripts/paypal/middleware');

const {
    billingAgreementEnabled
} = require('*/cartridge/config/paypalPreferences');

const BillingAgreementModel = require('*/cartridge/models/billingAgreement');

const {
    createAccountSDKUrl,
    getUrls
} = require('*/cartridge/scripts/paypal/paypalUtils');

server.extend(page);

server.append('Show', validateWhetherPaypalEnabled, function (_, res, next) {
    var billingAgreementModel = new BillingAgreementModel();

    var savedBA = billingAgreementModel.getBillingAgreements(true);

    res.setViewData({
        paypal: {
            savedBA: savedBA,
            billingAgreementEnabled: billingAgreementEnabled,
            isBaLimitReached: billingAgreementModel.isBaLimitReached(),
            sdkUrl: createAccountSDKUrl(),
            paypalUrls: JSON.stringify(getUrls())
        }
    });
    next();
});

module.exports = server.exports();
