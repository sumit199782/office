const chai = require('chai');
const request = require('request-promise');
const chaiSubset = require('chai-subset');
const { assert } = chai;
const {
    baseUrl,
    productId
} = require('./it.config');
chai.use(chaiSubset);

describe('Paypal-GetPurchaseUnit', function () {
    this.timeout(20000);
    describe('if checkout from billing page', function () {
        it('should return purchase unit with shipping address include', function () {
            const cookieJar = request.jar();
            const myRequest = {
                method: 'POST',
                rejectUnauthorized: false,
                resolveWithFullResponse: true,
                jar: cookieJar,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                url: baseUrl + '/Cart-AddProduct',
                form: {
                    pid: productId,
                    quantity: 2
                }
            };

            return request(myRequest)
                .then(function (res) {
                    assert.equal(res.statusCode, 200, 'Expected add to Cart request statusCode to be 200.');
                    const reqData = Object.assign({}, myRequest);
                    myRequest.url = baseUrl + '/CSRF-Generate';
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(myRequest);
                })
                .then(function (res) {
                    const reqData = Object.assign({}, myRequest);
                    const csrfJsonResponse = JSON.parse(res.body);
                    reqData.url = baseUrl + '/CheckoutShippingServices-SubmitShipping';
                    reqData.form = {
                        [csrfJsonResponse.csrf.tokenName]: csrfJsonResponse.csrf.token,
                        shipmentSelector: 'new',
                        dwfrm_shipping_shippingAddress_addressFields_firstName: 'Rick',
                        dwfrm_shipping_shippingAddress_addressFields_lastName: 'Flores',
                        dwfrm_shipping_shippingAddress_addressFields_address1: '2253  Hudson Street',
                        dwfrm_shipping_shippingAddress_addressFields_address2: '',
                        dwfrm_shipping_shippingAddress_addressFields_country: 'US',
                        dwfrm_shipping_shippingAddress_addressFields_states_stateCode: 'AS',
                        dwfrm_shipping_shippingAddress_addressFields_city: 'Denver',
                        dwfrm_shipping_shippingAddress_addressFields_postalCode: '80207',
                        dwfrm_shipping_shippingAddress_addressFields_phone: '973-974-7269',
                        dwfrm_shipping_shippingAddress_shippingMethodID: '012',
                        dwfrm_billing_shippingAddressUseAsBillingAddress: 'true'
                    };
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(reqData);
                })
                .then(function (res) {
                    const reqData = Object.assign({}, myRequest);
                    reqData.method = 'GET';
                    assert.equal(res.statusCode, 200, 'Expected add to Cart request statusCode to be 200.');
                    reqData.url = baseUrl + '/Paypal-GetPurchaseUnit';
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(reqData);
                })
                .then(function (res) {
                    const {
                        amount,
                        description,
                        shipping,
                        invoice_id
                    } = JSON.parse(res.body).purchase_units[0];
                    assert.equal(res.statusCode, 200);
                    assert.ok(amount);
                    assert.ok(description);
                    assert.ok(shipping);
                    assert.ok(invoice_id);
                    assert.ok(shipping.name.full_name);
                    assert.ok(shipping.address.address_line_1);
                    assert.ok(shipping.address.address_line_2);
                    assert.ok(shipping.address.admin_area_1);
                    assert.ok(shipping.address.admin_area_2);
                    assert.ok(shipping.address.country_code);
                    assert.ok(shipping.address.postal_code);
                    assert.ok(amount.currency_code);
                    assert.ok(amount.value);
                    assert.ok(amount.breakdown);
                    const {
                        item_total,
                        tax_total,
                        handling,
                        insurance,
                        shipping_discount,
                        discount
                    } = amount.breakdown;
                    const orderTotal = parseFloat(item_total.value)
                        + parseFloat(tax_total.value)
                        + parseFloat(handling.value)
                        + parseFloat(insurance.value)
                        + parseFloat(amount.breakdown.shipping.value)
                        - parseFloat(shipping_discount.value)
                        - parseFloat(discount.value);
                    assert.equal(orderTotal, parseFloat(amount.value));
                });
        });
    });
    describe('if checkout from cart page', function () {
        it('should return purchase unit without shipping address include', function () {
            const cookieJar = request.jar();
            const myRequest = {
                method: 'POST',
                rejectUnauthorized: false,
                resolveWithFullResponse: true,
                jar: cookieJar,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                url: baseUrl + '/Cart-AddProduct',
                form: {
                    pid: productId,
                    quantity: 2
                }
            };

            return request(myRequest)
                .then(function (res) {
                    assert.equal(res.statusCode, 200, 'Expected add to Cart request statusCode to be 200.');
                    const reqData = Object.assign({}, myRequest);
                    myRequest.url = baseUrl + '/CSRF-Generate';
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(myRequest);
                })
                .then(function (res) {
                    const reqData = Object.assign({}, myRequest);
                    reqData.method = 'GET';
                    assert.equal(res.statusCode, 200, 'Expected add to Cart request statusCode to be 200.');
                    reqData.url = baseUrl + '/Paypal-GetPurchaseUnit?isCartFlow=true';
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(reqData);
                })
                .then(function (res) {
                    const {
                        amount,
                        description,
                        invoice_id
                    } = JSON.parse(res.body).purchase_units[0];
                    assert.equal(res.statusCode, 200);
                    assert.ok(amount);
                    assert.ok(description);
                    assert.ok(invoice_id);
                    assert.ok(amount.currency_code);
                    assert.ok(amount.value);
                    assert.ok(amount.breakdown);
                    const {
                        item_total,
                        tax_total,
                        handling,
                        insurance,
                        shipping_discount,
                        discount
                    } = amount.breakdown;
                    const orderTotal = parseFloat(item_total.value)
                        + parseFloat(tax_total.value)
                        + parseFloat(handling.value)
                        + parseFloat(insurance.value)
                        + parseFloat(amount.breakdown.shipping.value)
                        - parseFloat(shipping_discount.value)
                        - parseFloat(discount.value);
                    assert.equal(orderTotal, parseFloat(amount.value));
                });
        });
    });
});

describe('Paypal-GetBillingAgreementToken', function () {
    this.timeout(20000);
    describe('if checkout from billing page', function () {
        it('should return token for createBillingAgreement callback', function () {
            const cookieJar = request.jar();
            const myRequest = {
                method: 'POST',
                rejectUnauthorized: false,
                resolveWithFullResponse: true,
                jar: cookieJar,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                url: baseUrl + '/Cart-AddProduct',
                form: {
                    pid: productId,
                    quantity: 2
                }
            };

            return request(myRequest)
                .then(function (res) {
                    assert.equal(res.statusCode, 200, 'Expected add to Cart request statusCode to be 200.');
                    const reqData = Object.assign({}, myRequest);
                    myRequest.url = baseUrl + '/CSRF-Generate';
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(myRequest);
                })
                .then(function (res) {
                    const reqData = Object.assign({}, myRequest);
                    const csrfJsonResponse = JSON.parse(res.body);
                    reqData.url = baseUrl + '/CheckoutShippingServices-SubmitShipping';
                    reqData.form = {
                        [csrfJsonResponse.csrf.tokenName]: csrfJsonResponse.csrf.token,
                        shipmentSelector: 'new',
                        dwfrm_shipping_shippingAddress_addressFields_firstName: 'Rick',
                        dwfrm_shipping_shippingAddress_addressFields_lastName: 'Flores',
                        dwfrm_shipping_shippingAddress_addressFields_address1: '2253  Hudson Street',
                        dwfrm_shipping_shippingAddress_addressFields_address2: '',
                        dwfrm_shipping_shippingAddress_addressFields_country: 'US',
                        dwfrm_shipping_shippingAddress_addressFields_states_stateCode: 'AS',
                        dwfrm_shipping_shippingAddress_addressFields_city: 'Denver',
                        dwfrm_shipping_shippingAddress_addressFields_postalCode: '80207',
                        dwfrm_shipping_shippingAddress_addressFields_phone: '973-974-7269',
                        dwfrm_shipping_shippingAddress_shippingMethodID: '012',
                        dwfrm_billing_shippingAddressUseAsBillingAddress: 'true'
                    };
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(reqData);
                })
                .then(function (res) {
                    const reqData = Object.assign({}, myRequest);
                    reqData.method = 'GET';
                    assert.equal(res.statusCode, 200, 'Expected add to Cart request statusCode to be 200.');
                    reqData.url = baseUrl + '/Paypal-GetBillingAgreementToken';
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(reqData);
                })
                .then(function (res) {
                    const response = JSON.parse(res.body);
                    const hasToken = 'token' in response && typeof response.token === 'string';
                    assert.equal(res.statusCode, 200);
                    assert.isTrue(hasToken);
                });
        });
    });
    describe('if checkout from cart page', function () {
        it('should return token for createBillingAgreement callback', function () {
            const cookieJar = request.jar();
            const myRequest = {
                method: 'POST',
                rejectUnauthorized: false,
                resolveWithFullResponse: true,
                jar: cookieJar,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                url: baseUrl + '/Cart-AddProduct',
                form: {
                    pid: productId,
                    quantity: 2
                }
            };

            return request(myRequest)
                .then(function (res) {
                    assert.equal(res.statusCode, 200, 'Expected add to Cart request statusCode to be 200.');
                    const reqData = Object.assign({}, myRequest);
                    myRequest.url = baseUrl + '/CSRF-Generate';
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(myRequest);
                })
                .then(function (res) {
                    const reqData = Object.assign({}, myRequest);
                    reqData.method = 'GET';
                    assert.equal(res.statusCode, 200, 'Expected add to Cart request statusCode to be 200.');
                    reqData.url = baseUrl + '/Paypal-GetBillingAgreementToken?isCartFlow=true';
                    cookieJar.setCookie(request.cookie(cookieJar.getCookieString(reqData.url), reqData.url));
                    return request(reqData);
                })
                .then(function (res) {
                    const response = JSON.parse(res.body);
                    assert.equal(res.statusCode, 200);
                    assert.ok(response.token);
                });
        });
    });
});

