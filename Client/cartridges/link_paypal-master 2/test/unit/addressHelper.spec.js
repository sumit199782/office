const { addressHelperPath } = require('./path');
const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');
const { stub, assert } = require('sinon');

require('dw-api-mock/demandware-globals');
require('babel-register')({
    plugins: ['babel-plugin-rewire']
});

const copyCustomerAddressToShipment = stub();
const addressHelper = proxyquire(addressHelperPath, {
    '*/cartridge/scripts/checkout/checkoutHelpers': { copyCustomerAddressToShipment }
});

describe('addressHelper file', () => {
    describe('createPersonNameObject', () => {
        describe('trim, split an input string and assign a value', () => {
            let name;
            it('should return firstName, lastName, secondName if the name.length === 3', () => {
                name = ' Ivan Ivanovych Ivanov ';
                expect(addressHelper.createPersonNameObject(name)).to.deep.equal({
                    firstName: 'Ivan',
                    secondName: 'Ivanovych',
                    lastName: 'Ivanov'
                });
            });
            it('should return firstName, lastName if the name.length === 2', () => {
                name = ' Ivan  Ivanov ';
                expect(addressHelper.createPersonNameObject(name)).to.deep.equal({
                    firstName: 'Ivan',
                    secondName: null,
                    lastName: 'Ivanov'
                });
            });
            it('should return firstName if name.length === 1', () => {
                name = 'Ivan';
                expect(addressHelper.createPersonNameObject(name)).to.deep.equal(
                    {
                        firstName: 'Ivan',
                        secondName: null,
                        lastName: null
                    }
                );
            });
        });
    });

    describe('updateOrderBillingAddress', function () {
        const basket = {
            getBillingAddress: stub(),
            createBillingAddress: stub(),
            setCustomerEmail: stub(),
            customer: {
                authenticated: false
            }
        };
        const billingAddress = {
            setFirstName: stub(),
            setLastName: stub(),
            setCountryCode: stub(),
            setCity: stub(),
            setAddress1: stub(),
            setAddress2: stub(),
            setPostalCode: stub(),
            setStateCode: stub(),
            setPhone: stub()
        };
        before(() => {
            basket.getBillingAddress.returns(billingAddress);
            const paypalBillingAddress = {
                name: {
                    given_name: 'John',
                    surname: 'Doe'
                },
                address: {
                    country_code: 'CO',
                    admin_area_2: 'testLocality',
                    address_line_1: 'testStreetAddress',
                    address_line_2: 'testExtendedAddress',
                    postal_code: 'testPostalCode',
                    admin_area_1: 'testRegion'
                },
                phone: {
                    phone_number: {
                        national_number: 'testPhone'
                    }
                },
                email_address: 'newEmail'
            };
            addressHelper.updateOrderBillingAddress(basket, paypalBillingAddress);
        });
        it('should set first name into billing address', () => {
            assert.calledWith(billingAddress.setFirstName, 'John');
        });
        it('should set last name into billing address', () => {
            assert.calledWith(billingAddress.setLastName, 'Doe');
        });
        it('should set country code into billing address', () => {
            assert.calledWith(billingAddress.setCountryCode, 'CO');
        });
        it('should set city into billing address', () => {
            assert.calledWith(billingAddress.setCity, 'testLocality');
        });
        it('should set address1 into billing address', () => {
            assert.calledWith(billingAddress.setAddress1, 'testStreetAddress');
        });
        it('should set address2 into billing address', () => {
            assert.calledWith(billingAddress.setAddress2, 'testExtendedAddress');
        });
        it('should set postal code into billing address', () => {
            assert.calledWith(billingAddress.setPostalCode, 'testPostalCode');
        });
        it('should set state code into billing address', () => {
            assert.calledWith(billingAddress.setStateCode, 'testRegion');
        });
        it('should set phone into billing address', () => {
            assert.calledWith(billingAddress.setPhone, 'testPhone');
        });
        it('should set customer`s email to basket', () => {
            assert.calledWith(basket.setCustomerEmail, 'newEmail');
        });
    });

    describe('updateOrderShippingAddress', function () {
        const getShippingAddress = stub();
        const createShippingAddress = stub();
        const basket = {
            getDefaultShipment: () => ({
                getShippingAddress,
                createShippingAddress
            })
        };
        const shippingAddress = {
            setFirstName: stub(),
            setLastName: stub(),
            setCountryCode: stub(),
            setCity: stub(),
            setAddress1: stub(),
            setAddress2: stub(),
            setPostalCode: stub(),
            setStateCode: stub(),
            setPhone: stub()
        };
        before(() => {
            getShippingAddress.returns(shippingAddress);
            const paypalShippingAddress = [{
                shipping: {
                    name: {
                        full_name: 'John Doe'
                    },
                    address: {
                        country_code: 'CO',
                        admin_area_2: 'testLocality',
                        address_line_1: 'testStreetAddress',
                        address_line_2: 'testExtendedAddress',
                        postal_code: 'testPostalCode',
                        admin_area_1: 'testRegion'
                    }
                },
                phone: {
                    phone_number: {
                        national_number: 'testPhone'
                    }
                }
            }];
            addressHelper.updateOrderShippingAddress(basket, paypalShippingAddress[0]);
        });
        it('should set first name into shipping address', () => {
            assert.calledWith(shippingAddress.setFirstName, 'John');
        });
        it('should set last name into shipping address', () => {
            assert.calledWith(shippingAddress.setLastName, 'Doe');
        });
        it('should set country code into shipping address', () => {
            assert.calledWith(shippingAddress.setCountryCode, 'CO');
        });
        it('should set city into shipping address', () => {
            assert.calledWith(shippingAddress.setCity, 'testLocality');
        });
        it('should set address1 into shipping address', () => {
            assert.calledWith(shippingAddress.setAddress1, 'testStreetAddress');
        });
        it('should set address2 into shipping address', () => {
            assert.calledWith(shippingAddress.setAddress2, 'testExtendedAddress');
        });
        it('should set postal code into shipping address', () => {
            assert.calledWith(shippingAddress.setPostalCode, 'testPostalCode');
        });
        it('should set state code into shipping address', () => {
            assert.calledWith(shippingAddress.setStateCode, 'testRegion');
        });
        it('should set phone into shipping address', () => {
            assert.calledWith(shippingAddress.setPhone, 'testPhone');
        });
    });

    describe('createShippingAddress', () => {
        const shippingAddress = {
            fullName: 'Test Test',
            address1: 'test',
            address2: 'test',
            stateCode: 'test',
            city: 'test',
            postalCode: 'test',
            countryCode: {
                value: 'co'
            }
        };
        it('should return created shipping address object', () => {
            expect(addressHelper.createShippingAddress(shippingAddress)).to.deep.equal({
                name: {
                    full_name: 'Test Test'
                },
                address: {
                    address_line_1: 'test',
                    address_line_2: 'test',
                    admin_area_1: 'test',
                    admin_area_2: 'test',
                    postal_code: 'test',
                    country_code: 'CO'
                }
            });
        });
    });

    describe('getBAShippingAddress', () => {
        const getBAShippingAddress = addressHelper.getBAShippingAddress;
        let shippingAddress = {
            getAddress1: () => 'test address',
            getCity: () => 'test city',
            getStateCode: () => 'test state',
            getPostalCode: () => 'test postal code',
            getCountryCode: () => ({
                getValue: () => 'US'
            }),
            getFullName: () => 'Mike Test'
        };

        it('should return created shipping address object', () => {
            expect(getBAShippingAddress(shippingAddress)).to.deep.equal({
                line1: 'test address',
                city: 'test city',
                state: 'test state',
                postal_code: 'test postal code',
                country_code: 'US',
                recipient_name: 'Mike Test'
            });
        });
    });

    describe('updateBABillingAddress', function () {
        const updateBABillingAddress = addressHelper.updateBABillingAddress;
        const basket = {
            getBillingAddress: stub(),
            createBillingAddress: stub(),
            setCustomerEmail: stub(),
            customer: {
                authenticated: false
            }
        };
        const billingAddress = {
            setFirstName: stub(),
            setLastName: stub(),
            setCountryCode: stub(),
            setCity: stub(),
            setAddress1: stub(),
            setAddress2: stub(),
            setPostalCode: stub(),
            setStateCode: stub(),
            setPhone: stub()
        };
        before(() => {
            basket.getBillingAddress.returns(billingAddress);
            const paypalBillingAddress = {
                first_name: 'John',
                last_name: 'Doe',
                billing_address: {
                    country_code: 'CO',
                    city: 'testLocality',
                    line1: 'testStreetAddress',
                    line2: 'testExtendedAddress',
                    postal_code: 'testPostalCode',
                    state: 'testRegion'
                },
                phone: 'testPhone',
                email: 'newEmail'
            };
            updateBABillingAddress(basket, paypalBillingAddress);
        });
        it('should set first name into billing address', () => {
            assert.calledWith(billingAddress.setFirstName, 'John');
        });
        it('should set last name into billing address', () => {
            assert.calledWith(billingAddress.setLastName, 'Doe');
        });
        it('should set country code into billing address', () => {
            assert.calledWith(billingAddress.setCountryCode, 'CO');
        });
        it('should set city into billing address', () => {
            assert.calledWith(billingAddress.setCity, 'testLocality');
        });
        it('should set address1 into billing address', () => {
            assert.calledWith(billingAddress.setAddress1, 'testStreetAddress');
        });
        it('should set address2 into billing address', () => {
            assert.calledWith(billingAddress.setAddress2, 'testExtendedAddress');
        });
        it('should set postal code into billing address', () => {
            assert.calledWith(billingAddress.setPostalCode, 'testPostalCode');
        });
        it('should set state code into billing address', () => {
            assert.calledWith(billingAddress.setStateCode, 'testRegion');
        });
        it('should set phone into billing address', () => {
            assert.calledWith(billingAddress.setPhone, 'testPhone');
        });
        it('should set customer`s email to basket', () => {
            assert.calledWith(basket.setCustomerEmail, 'newEmail');
        });
    });

    describe('updateBAShippingAddress', function () {
        const updateBAShippingAddress = addressHelper.updateBAShippingAddress;
        const getShippingAddress = stub();
        const createShippingAddress = stub();
        const basket = {
            getDefaultShipment: () => ({
                getShippingAddress,
                createShippingAddress
            })
        };
        const shippingAddress = {
            setFirstName: stub(),
            setLastName: stub(),
            setCountryCode: stub(),
            setCity: stub(),
            setAddress1: stub(),
            setAddress2: stub(),
            setPostalCode: stub(),
            setStateCode: stub(),
            setPhone: stub()
        };
        before(() => {
            getShippingAddress.returns(shippingAddress);
            const paypalShippingAddress = {
                recipient_name: 'John Doe',
                country_code: 'CO',
                city: 'testLocality',
                line1: 'testStreetAddress',
                line2: 'testExtendedAddress',
                postal_code: 'testPostalCode',
                state: 'testRegion',
                phone: 'testPhone'
            };
            updateBAShippingAddress(basket, paypalShippingAddress);
        });
        it('should set first name into shipping address', () => {
            assert.calledWith(shippingAddress.setFirstName, 'John');
        });
        it('should set last name into shipping address', () => {
            assert.calledWith(shippingAddress.setLastName, 'Doe');
        });
        it('should set country code into shipping address', () => {
            assert.calledWith(shippingAddress.setCountryCode, 'CO');
        });
        it('should set city into shipping address', () => {
            assert.calledWith(shippingAddress.setCity, 'testLocality');
        });
        it('should set address1 into shipping address', () => {
            assert.calledWith(shippingAddress.setAddress1, 'testStreetAddress');
        });
        it('should set address2 into shipping address', () => {
            assert.calledWith(shippingAddress.setAddress2, 'testExtendedAddress');
        });
        it('should set postal code into shipping address', () => {
            assert.calledWith(shippingAddress.setPostalCode, 'testPostalCode');
        });
        it('should set state code into shipping address', () => {
            assert.calledWith(shippingAddress.setStateCode, 'testRegion');
        });
        it('should set phone into shipping address', () => {
            assert.calledWith(shippingAddress.setPhone, 'testPhone');
        });
    });
});
