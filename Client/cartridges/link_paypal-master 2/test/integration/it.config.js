'use strict';

var getConfig = require('@tridnguyen/config');

var opts = Object.assign({}, getConfig({
    baseUrl: 'https://' + global.baseUrl + '/on/demandware.store/Sites-RefArch-Site/en_US',
    suite: '*',
    reporter: 'spec',
    timeout: 60000,
    locale: 'x_default'
}, './config.json'));

opts.loginEmail = '';
opts.loginPassword = '';
opts.savedMethodUUID = '';
opts.productId = 'sony-kdl-40w4100M';
opts.testPaypalFinancial = false;

module.exports = opts;
