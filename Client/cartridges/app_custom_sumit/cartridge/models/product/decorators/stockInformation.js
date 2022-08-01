'use strict';

module.exports = function (object, apiProduct) {
    var invRec = apiProduct.availabilityModel.inventoryRecord;
    Object.defineProperty(object, 'stockInformation', {
        enumerable: true,
        value: invRec==null ? 0 :parseInt(invRec.ATS,10)
    });
};
