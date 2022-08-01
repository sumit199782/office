const { billingAgreementModelPath } = require('./path');
const proxyquire = require('proxyquire').noCallThru();
const { expect } = require('chai');
const { stub } = require('sinon');

require('dw-api-mock/demandware-globals');
require('babel-register')({
    plugins: ['babel-plugin-rewire']
});

const createErrorLog = stub();
const getBADetails = stub();

const BillingAgreementModel = proxyquire(billingAgreementModelPath, {
    '*/cartridge/scripts/paypal/paypalUtils': {
        createErrorLog
    },
    '*/cartridge/scripts/paypal/paypalApi': getBADetails
});

describe('BillingAgreementModel file', () => {
    var testDataBAs = [];
    var updatedDataBAs = [];
    var usedBA = {};
    var oldCustomer = customer;
    const ba1 = { 'baID': 'B-12345678912345678', 'default': true, 'email': 'epamtester@pptest.com' };
    const ba1NotDefault = { 'baID': 'B-12345678912345678', 'default': false, 'email': 'epamtester@pptest.com' };
    const ba2 = { 'baID': 'B-22345678912345678', 'default': true, 'email': 'epam2tester@pptest.com' };
    const ba2NotDefault = { 'baID': 'B-22345678912345678', 'default': false, 'email': 'epam2tester@pptest.com' };

    before(function () {
        customer = {
            profile: {
                custom: {}
            }
        };
    });

    after(function () {
        customer = oldCustomer;
    });

    describe('if empty `customer.profile.custom.PP_API_billingAgreement`', () => {
        before(() => {
            customer.profile.custom.PP_API_billingAgreement = '';
        });
        it('we should receive an empty array', function () {
            var result = new BillingAgreementModel();
            expect(result.billingAgreements).to.deep.equals([]);
        });
    });

    describe('getBillingAgreements', () => {
        before(() => {
            testDataBAs = [ba1];
            customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
        });
        it('we should receive an array of billingAgreements', function () {
            var result = new BillingAgreementModel();
            expect(result.getBillingAgreements()).to.deep.equals(testDataBAs);
        });
    });

    describe('saveBillingAgreement', () => {
        describe('if usedBA set default as true', () => {
            before(() => {
                testDataBAs = [ba1];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
                usedBA = ba2;
                usedBA.saveToProfile = true;
            });
            it('should push `used` into billingAgreements, set `used` as default and update profile', function () {
                var result = new BillingAgreementModel();
                result.saveBillingAgreement(usedBA);
                let getBAbyUsedEmail = result.getBillingAgreementByEmail(usedBA.email);

                expect(getBAbyUsedEmail).to.deep.equals(usedBA);
                expect(getBAbyUsedEmail.default).to.be.equals(true);

                testDataBAs[0].default = false;
                testDataBAs.push(usedBA);
                expect(customer.profile.custom.PP_API_billingAgreement).to.be.equals(JSON.stringify(testDataBAs));
            });
        });

        describe('if usedBA set default as false', () => {
            before(() => {
                testDataBAs = [ba1];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
                usedBA = ba2NotDefault;
                usedBA.saveToProfile = true;
            });
            it('should push `used` into billingAgreements, NOT set `used` as default and update profile', function () {
                var result = new BillingAgreementModel();
                result.saveBillingAgreement(usedBA);
                let getBAbyUsedEmail = result.getBillingAgreementByEmail(usedBA.email);

                expect(getBAbyUsedEmail).to.deep.equals(usedBA);
                expect(getBAbyUsedEmail.default).to.be.equals(false);

                testDataBAs.push(usedBA);
                expect(customer.profile.custom.PP_API_billingAgreement).to.be.equals(JSON.stringify(testDataBAs));
            });
        });
    });

    describe('updateBillingAgreement', () => {
        describe('using BA which is not set as default in the list and has default true value ', () => {
            before(() => {
                testDataBAs = [ba1, ba2NotDefault];
                updatedDataBAs = [ba1NotDefault, ba2];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
                usedBA = ba2;
            });
            it('usedBA should became a default and profile should be updated', function () {
                var result = new BillingAgreementModel();
                result.updateBillingAgreement(usedBA);
                expect(result.getDefaultBillingAgreement().email).to.be.equals(usedBA.email);
                expect(customer.profile.custom.PP_API_billingAgreement).to.be.equals(JSON.stringify(updatedDataBAs));
            });
        });
        describe('using BA which is ALREADY set as default in the list and has default true value ', () => {
            before(() => {
                testDataBAs = [ba1NotDefault, ba2];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
                usedBA = ba2;
            });
            it('billingAgreements and profile should be the same', function () {
                var result = new BillingAgreementModel();
                result.updateBillingAgreement(usedBA);
                expect(result.billingAgreements).to.deep.equals(testDataBAs);
                expect(customer.profile.custom.PP_API_billingAgreement).to.be.equals(JSON.stringify(testDataBAs));
            });
        });
        describe('using BA which is not set as default in the list and has NO default true value ', () => {
            before(() => {
                testDataBAs = [ba1, ba2NotDefault];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
                usedBA = ba2NotDefault;
            });
            it('billingAgreements and profile should be the same', function () {
                var result = new BillingAgreementModel();
                result.updateBillingAgreement(usedBA);
                expect(result.billingAgreements).to.deep.equals(testDataBAs);
                expect(customer.profile.custom.PP_API_billingAgreement).to.be.equals(JSON.stringify(testDataBAs));
            });
        });
    });

    describe('changeDefaultBillingAgreement', () => {
        before(() => {
            testDataBAs = [ba1, ba2NotDefault];
            customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
        });
        it('usedBA should became a default and the old one should became false', function () {
            var result = new BillingAgreementModel();
            result.changeDefaultBillingAgreement(ba2);
            expect(result.getDefaultBillingAgreement().email).to.be.equals(ba2.email);
            expect(result.getBillingAgreementByEmail('epamtester@pptest.com').default).to.be.equals(false);
        });
    });

    describe('getDefaultBillingAgreement', () => {
        before(() => {
            testDataBAs = [ba2, ba1NotDefault];
            customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
        });
        it('return BA object whcih has default as true', function () {
            var result = new BillingAgreementModel();
            expect(result.getDefaultBillingAgreement()).to.deep.equals(ba2);
        });
    });

    describe('isBaLimitReached', () => {
        describe('if BA limit is equal to `billingAgreementLimit` ', () => {
            before(() => {
                testDataBAs = [ba1, ba1NotDefault, ba2NotDefault];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
            });
            it('return true', function () {
                var result = new BillingAgreementModel();
                expect(result.isBaLimitReached()).to.be.equals(true);
            });
        });
        describe('if BA limit is less than `billingAgreementLimit` ', () => {
            before(() => {
                testDataBAs = [ba1, ba2NotDefault];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
            });
            it('return false', function () {
                var result = new BillingAgreementModel();
                expect(result.isBaLimitReached()).to.be.equals(false);
            });
        });
    });

    describe('updateProfile', () => {
        describe('if empty `billingAgreements` ', () => {
            before(() => {
                customer.profile.custom.PP_API_billingAgreement = '';
            });
            it('return unefined', function () {
                var result = new BillingAgreementModel();
                expect(result.updateProfile()).to.be.equals(undefined);
            });
        });
        describe('if not empty `billingAgreements` ', () => {
            before(() => {
                customer.profile.custom.PP_API_billingAgreement = '';
            });
            it('set up PP_API_billingAgreement', function () {
                var result = new BillingAgreementModel();
                result.billingAgreements.push(ba1);
                result.updateProfile();
                expect(customer.profile.custom.PP_API_billingAgreement).to.be.equals(JSON.stringify([ba1]));
            });
        });
    });

    describe('getBillingAgreementByEmail', () => {
        const email = ba1.email;
        before(() => {
            testDataBAs = [ba1];
            customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
        });
        it('return unefined', function () {
            var result = new BillingAgreementModel();
            expect(result.getBillingAgreementByEmail(email)).to.deep.equals(ba1);
        });
    });

    describe('isAccountAlreadyExist', () => {
        const existedEmail = ba1.email;
        const notExistedEmail = ba2.email;
        before(() => {
            testDataBAs = [ba1];
            customer.profile.custom.PP_API_billingAgreement = JSON.stringify(testDataBAs);
        });
        it('return true for existed acount and false for not existed', function () {
            var result = new BillingAgreementModel();
            expect(result.isAccountAlreadyExist(existedEmail)).to.be.equals(true);
            expect(result.isAccountAlreadyExist(notExistedEmail)).to.be.equals(false);
        });
    });

    describe('removeBillingAgreement', () => {
        let removedBA;
        let savedBA;
        let newSavedBa;
        describe('should remove passed element from array', () => {
            before(() => {
                removedBA = { baID: 'B-2WH78645XK3441802', default: true, email: 'i.vinogradovvn@gmail.com' };
                savedBA = [{ baID: 'B-12345678912345678', default: false, email: 'epamtester@pptest.com' },
                    removedBA];
                newSavedBa = [{ baID: 'B-12345678912345678', default: true, email: 'epamtester@pptest.com' }];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(savedBA);
            });
            it('if ba is default should make default another', () => {
                var result = new BillingAgreementModel();
                result.removeBillingAgreement(removedBA);
                expect(customer.profile.custom.PP_API_billingAgreement).to.be.equals(JSON.stringify(newSavedBa));
            });
        });
        describe('should remove passed element from array', () => {
            before(() => {
                removedBA = { baID: 'B-2WH78645XK3441802', default: false, email: 'i.vinogradovvn@gmail.com' };
                newSavedBa = [{ baID: 'B-12345678912345678', default: true, email: 'epamtester@pptest.com' }];
                savedBA = [{ baID: 'B-12345678912345678', default: true, email: 'epamtester@pptest.com' },
                    removedBA];
                customer.profile.custom.PP_API_billingAgreement = JSON.stringify(savedBA);
            });
            it('if ba is not default nothing happened with other BAs', () => {
                var result = new BillingAgreementModel();
                result.removeBillingAgreement(removedBA);
                expect(customer.profile.custom.PP_API_billingAgreement).to.be.equals(JSON.stringify(newSavedBa));
            });
        });
    });
});
