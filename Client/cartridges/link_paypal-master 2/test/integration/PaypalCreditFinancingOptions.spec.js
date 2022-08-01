const chai = require('chai');
const request = require('request-promise');
const chaiSubset = require('chai-subset');
const { assert } = chai;
const { baseUrl, testPaypalFinancial } = require('./it.config');
chai.use(chaiSubset);

if (testPaypalFinancial) {
    describe('When called GetLowestPossibleMonthlyCost', function () {
        this.timeout(20000);

        it('should return object with financial options', function () {
            var cookieJar = request.jar();
            var myRequest = {
                method: 'GET',
                rejectUnauthorized: false,
                resolveWithFullResponse: true,
                jar: cookieJar,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                url: baseUrl + '/PaypalCreditFinancingOptions-GetLowestPossibleMonthlyCost?value=75&currencyCode=USD&countryCode=US'
            };
            return request(myRequest)
				.then(function (res) {
    var body = JSON.parse(res.body);
    var hasLabel = Object.hasOwnProperty.call(body, 'labelText');
    var hasValue = Object.hasOwnProperty.call(body, 'value');
    assert.equal(res.statusCode, 200, 'Expected PaypalCreditFinancingOptions-GetLowestPossibleMonthlyCost statusCode to be 200.');
    assert.equal(body.currencyCode, 'USD', 'Expected to return USD currency');
    assert.isTrue(hasLabel, 'Expected to return label with option text');
    assert.isTrue(hasValue, 'Expected to return option value');
});
        });
    });


    describe('PaypalCreditFinancingOptions-GetAllOptionsData', function () {
        describe('When called GetAllOptionsData', function () {
            this.timeout(20000);

            it('should return all avaliable credit options', function () {
                var cookieJar = request.jar();
                var myRequest = {
                    method: 'GET',
                    rejectUnauthorized: false,
                    resolveWithFullResponse: true,
                    jar: cookieJar,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    url: baseUrl + '/PaypalCreditFinancingOptions-GetAllOptionsData?value=75&currencyCode=USD&countryCode=US'
                };
				// ----- Step 1 Get CSRF token
                return request(myRequest)
					.then(function (res) {
    var body = JSON.parse(res.body);
    var hasOptions = Object.hasOwnProperty.call(body, 'options');
    var hasMonthSet = Object.hasOwnProperty.call(body, 'monthSet');
    var hasMonthlyPaymentValueSet = Object.hasOwnProperty.call(body, 'monthlyPaymentValueSet');
    var hasLowerCostPerMonth = Object.hasOwnProperty.call(body, 'lowerCostPerMonth');
    assert.equal(res.statusCode, 200, 'Expected PaypalCreditFinancingOptions-GetLowestPossibleMonthlyCost statusCode to be 200.');
    assert.isTrue(hasOptions, 'Expected to return options');
    assert.isTrue(hasMonthSet, 'Expected to return monthSet array');
    assert.isTrue(hasMonthlyPaymentValueSet, 'Expected to return monthlyPaymentValueSet');
    assert.isTrue(hasLowerCostPerMonth, 'Expected to return lowerCostPerMonth');
    assert.equal(body.lowerCostPerMonth.currencyCode, 'USD', 'Expected to return USD currency');
});
            });
        });
    });
}
