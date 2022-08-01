'use strict';

const Locale = require('dw/util/Locale');
const StringUtils = require('dw/util/StringUtils');
const Money = require('dw/value/Money');
const cachePaypalCreditFinancingOptions = require('dw/system/CacheMgr').getCache('paypalCreditFinancingOptions');

const {
    getCalculatedFinancingOptions
} = require('*/cartridge/scripts/financialApi');

var creditFinancialOptionsHelper = {};

/**
 * Returns all options by a credit type
 *
 * @param {float} cost - Value of cost
 * @param {string} currencyCode - Currency Code
 * @param {countryCode} countryCode - Country code
 * @param {creditType} creditType - Credit type (INST|SAC...)
 * @returns {Object} Object with all options, set of months and set of cost values
 */
creditFinancialOptionsHelper.getAllOptions = function (cost, currencyCode, countryCode, creditType) {
    if (cost instanceof Money) {
        creditType = countryCode; // eslint-disable-line no-param-reassign
        countryCode = currencyCode; // eslint-disable-line no-param-reassign
        currencyCode = cost.currencyCode; // eslint-disable-line no-param-reassign
        cost = cost.value; // eslint-disable-line no-param-reassign
    }
    var sessionCacheKey = creditType + '_' + cost + '_' + currencyCode + '_' + countryCode;
    var result = cachePaypalCreditFinancingOptions.get(sessionCacheKey);
    if (result) {
        return result;
    }
    result = [];
    var data = getCalculatedFinancingOptions({
        financing_country_code: countryCode,
        transaction_amount: {
            value: cost,
            currency_code: currencyCode
        }
    });
    if (data.financing_options) {
        data.financing_options.forEach(function (financingOption) {
            Object.keys(financingOption).forEach(function (optionFieldName) {
                if (financingOption[optionFieldName].forEach) {
                    financingOption[optionFieldName].forEach(function (option) {
                        if (creditType) {
                            if (option.credit_financing && option.credit_financing.credit_type === creditType) {
                                result.push(option);
                            }
                        } else {
                            result.push(option);
                        }
                    });
                }
            });
        });
    }
    cachePaypalCreditFinancingOptions.put(sessionCacheKey, result);
    return result;
};

/**
 * Returns lowest monthly payment cost (INST-type)
 *
 * @param {float} cost - Value of cost
 * @param {string} currencyCode - Currency Code
 * @param {countryCode} countryCode - Country code
 * @returns {Object} Lowest monthly payment cost
 */
creditFinancialOptionsHelper.getLowestPossibleMonthlyCost = function (cost, currencyCode, countryCode) {
    if (cost instanceof Money) {
        countryCode = currencyCode; // eslint-disable-line no-param-reassign
        currencyCode = cost.currencyCode; // eslint-disable-line no-param-reassign
        cost = cost.value; // eslint-disable-line no-param-reassign
    }
    if (!countryCode) {
        countryCode = Locale.getLocale(request.locale).country; // eslint-disable-line no-param-reassign
    }
    var allOptions = creditFinancialOptionsHelper.getAllOptions(cost, currencyCode, countryCode, 'INST');
    var lowersCost = null;
    allOptions.forEach(function (option) {
        var optionMonthlyPaymentValue = parseFloat(option.monthly_payment.value);
        if (lowersCost === null || lowersCost > optionMonthlyPaymentValue) {
            lowersCost = optionMonthlyPaymentValue;
        }
    });
    return {
        value: lowersCost,
        currencyCode: currencyCode,
        formatted: lowersCost === null ? 'N/A' : StringUtils.formatMoney(new Money(lowersCost, currencyCode))
    };
};

/**
 * Returns object with all options (INST-type) and other helpful information
 *
 * @param {float} cost - Value of cost
 * @param {string} currencyCode - Currency Code
 * @param {countryCode} countryCode - Country code
 * @returns {Object} Result with all options and other helpful information
 */
creditFinancialOptionsHelper.getDataForAllOptionsBanner = function (cost, currencyCode, countryCode) {
    if (cost instanceof Money) {
        countryCode = currencyCode; // eslint-disable-line no-param-reassign
        currencyCode = cost.currencyCode; // eslint-disable-line no-param-reassign
        cost = cost.value; // eslint-disable-line no-param-reassign
    }
    if (!countryCode) {
        countryCode = Locale.getLocale(request.locale).country; // eslint-disable-line no-param-reassign
    }
    var allOptions = creditFinancialOptionsHelper.getAllOptions(cost, currencyCode, countryCode, 'INST');
    var result = {
        options: {},
        monthSet: [],
        monthlyPaymentValueSet: []
    };
    allOptions.forEach(function (option) {
        var term = parseInt(option.credit_financing.term, 10);
        var monthlyPaymentValue = parseFloat(option.monthly_payment.value);
        var totalCostValue = parseFloat(option.total_cost.value);
        result.options[term] = {
            term: term,
            apr: parseFloat(option.credit_financing.apr),
            monthlyPayment: {
                value: monthlyPaymentValue,
                currencyCode: option.monthly_payment.currency_code,
                formatted: StringUtils.formatMoney(new Money(monthlyPaymentValue, option.monthly_payment.currency_code))
            },
            totalCost: {
                value: totalCostValue,
                currencyCode: option.total_cost.currency_code,
                formatted: StringUtils.formatMoney(new Money(totalCostValue, option.total_cost.currency_code))
            },
            purchaseCost: {
                value: cost,
                currencyCode: currencyCode,
                formatted: StringUtils.formatMoney(new Money(cost, currencyCode))
            },
            rawOptionData: option
        };
        result.monthSet.push(term);
        result.monthlyPaymentValueSet.push(monthlyPaymentValue);
    });
    result.monthSet.sort(function (a, b) {
        return a - b;
    });
    result.monthlyPaymentValueSet.sort(function (a, b) {
        return a - b;
    });
    return result;
};

module.exports = creditFinancialOptionsHelper;
