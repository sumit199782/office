'use strict';

const server = require('server');

const Locale = require('dw/util/Locale');
const Resource = require('dw/web/Resource');
const BasketMgr = require('dw/order/BasketMgr');

const cache = require('*/cartridge/scripts/middleware/cache');
const creditFinancialOptionsHelper = require('*/cartridge/scripts/paypalCreditFinancingOptionsHelper');

/**
 * Entry point for retrieving lowest possible monthly cost
 */
server.get('GetLowestPossibleMonthlyCost', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var value = parseFloat(request.httpParameterMap.value.stringValue);
    var currencyCode = request.httpParameterMap.currencyCode.stringValue.toUpperCase();
    var countryCode = request.httpParameterMap.countryCode.stringValue;
    if (!countryCode) {
        countryCode = Locale.getLocale(request.locale).country;
    }
    countryCode = countryCode.toUpperCase();
    var lowerPricePerMonth = creditFinancialOptionsHelper.getLowestPossibleMonthlyCost(value, currencyCode, countryCode);
    res.json({
        value: lowerPricePerMonth.value,
        currencyCode: lowerPricePerMonth.currencyCode,
        labelText: Resource.msgf('paypal.creditFinancingOptions.productTile.lowerMonthCost.ph', 'locale', '', lowerPricePerMonth.formatted)
    });
    next();
});

/**
 * Entry point for retrieving all Credit Financing Options
 */
server.get('GetAllOptionsData', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var value = parseFloat(request.httpParameterMap.value.stringValue);
    var currencyCode = request.httpParameterMap.currencyCode.stringValue.toUpperCase();
    var countryCode = request.httpParameterMap.countryCode.stringValue;
    if (!countryCode) {
        countryCode = Locale.getLocale(request.locale).country;
    }
    countryCode = countryCode.toUpperCase();
    var currentBasket;
    var isGetCartTotalAsValue = request.httpParameterMap.isGetCartTotalAsValue.booleanValue;
    var basketTotal;
    if (isGetCartTotalAsValue) {
        currentBasket = BasketMgr.getCurrentBasket();
        basketTotal = currentBasket.totalGrossPrice;
        value = basketTotal.value;
        currencyCode = basketTotal.currencyCode;
    }
    var allOptionsData;
    var lowerPricePerMonth;
    if (!value || !currencyCode || !countryCode) {
        allOptionsData = {
            error: {
                errorText: 'Not all parameters are passed. Should be: value, currencyCode, countryCode'
            }
        };
    } else {
        allOptionsData = creditFinancialOptionsHelper.getDataForAllOptionsBanner(value, currencyCode, countryCode);
        lowerPricePerMonth = creditFinancialOptionsHelper.getLowestPossibleMonthlyCost(value, currencyCode, countryCode);
        allOptionsData.lowerCostPerMonth = {
            value: lowerPricePerMonth.value,
            currencyCode: lowerPricePerMonth.currencyCode,
            formatted: lowerPricePerMonth.formatted
        };
    }
    res.json(allOptionsData);
    next();
});

module.exports = server.exports();
