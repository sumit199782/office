'use strict';
/**
 * Controller for Avatax functions
 *
 * @module controllers/Avatax
 */

/* Script Modules */
var guard = require('~/cartridge/scripts/guard');
var taxationRequest = require('*/cartridge/scripts/avatax/TaxationRequest');
var LOGGER = require('dw/system/Logger').getLogger("Avalara", "AvaTax");

// AvaTax setting preference
var settingsObject = JSON.parse(require('dw/system/Site').getCurrent().getCustomPreferenceValue('ATSettings'));
/**
 * Takes a Basket object as input and calculates taxes
 * Updates a Basket with tax rates and values
 * @params Basket - Basket object
 **/
function calculateTaxes(basket) {
    var svcResponse = null;
    if (!settingsObject.taxCalculation) {
        return {
            OK: true
        };
    }
    if (session.privacy.NoCall && session.privacy.NoCall == true) {
        return;
    }
    try {
        session.privacy.sitesource = "sgjc";
        svcResponse = taxationRequest.Execute({
            Basket: basket,
            controller: true
        });
        return {
            OK: true
        };
    } catch (e) {
        LOGGER.warn("[Tax calculation failed with error - {0}. File - Controller|Avatax.js~calculateTaxes]", e.message);
        return {
            ERROR: true
        };
    }
}

exports.CalculateTaxes = guard.ensure(['https'], calculateTaxes);