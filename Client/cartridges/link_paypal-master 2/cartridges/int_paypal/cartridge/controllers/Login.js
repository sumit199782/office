'use strict';

const server = require('server');
const page = module.superModule;

const Resource = require('dw/web/Resource');

const {
    createConnectWithPaypalUrl
} = require('*/cartridge/scripts/paypal/paypalUtils');

const {
    connectWithPaypalStaticImageLink
} = require('*/cartridge/config/paypalPreferences');

const {
    validateWhetherPaypalEnabled
} = require('*/cartridge/scripts/paypal/middleware');

server.extend(page);

server.append('Show', validateWhetherPaypalEnabled, function (req, res, next) {
    res.setViewData({
        paypal: {
            connectWithPaypalStaticImageLink: connectWithPaypalStaticImageLink,
            connectWithPaypalButtonUrl: createConnectWithPaypalUrl(res.viewData.oAuthReentryEndpoint),
            connectWithPaypalStaticImageAlt: Resource.msg('paypal.connect.with.paypal.image.alt', 'locale', null)
        }
    });

    return next();
});

module.exports = server.exports();
