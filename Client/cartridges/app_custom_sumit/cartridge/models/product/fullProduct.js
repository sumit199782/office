'use strict';
//Define a variable that requires the stockInformation decorator
var stockInformation = require('*/cartridge/models/product/decorators/stockInformation');
var base = module.superModule;

/**
 * Decorate product with product line item information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 * @returns {Object} - Decorated product model
 */
function fullProduct(product, apiProduct, options) {
    //use base.call to use the model from the base cartridge to get the OOTB attributes
	
    base.call(this, product, apiProduct, options);
    //call the decorator function to add the stock information to the product json object from the api product
    stockInformation(product,apiProduct);
    return product;
}

module.exports = fullProduct;
