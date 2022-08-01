var Site = function(){};


Site.getCurrent = function(){return new Site()};
Site.prototype.getCustomPreferenceValue = function(preference){
	return JSON.stringify({ "taxCalculation": true, "addressValidation": true, "saveTransactions": true, "commitTransactions": false, "companyCode": "default", "useCustomCustomerCode": "customer_number", "customCustomerAttribute": "", "defaultShippingMethodTaxCode": "FR", "locationCode": "", "line1": "900 winslow way e", "line2": "", "line3": "", "city": "Seattle", "state": "Bainbridge Island", "zipCode": "98110", "countryCode": "US" });
};


module.exports = Site;