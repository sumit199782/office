'use strict';

const paypalRestService = require('*/cartridge/scripts/service/paypalRestService');
const {
    createErrorMsg
} = require('*/cartridge/scripts/paypal/paypalUtils');

/**
 * Calculates financing options available for a transaction
 * https://developer.paypal.com/docs/limited-release/financing-options/api/#calculated-financing-options_calculate
 *
 * @param {Obejct} data - Request data
 * @returns {Object} Response object
 */
function getCalculatedFinancingOptions(data) {
    try {
        var resp = paypalRestService.call({
            path: '/v1/credit/calculated-financing-options',
            method: 'POST',
            body: data
        });
        return {
            financing_options: resp.financing_options
        };
    } catch (err) {
        return {
            err: createErrorMsg(err.message)
        };
    }
}

module.exports = {
    getCalculatedFinancingOptions: getCalculatedFinancingOptions
};
