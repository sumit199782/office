'use strict';
    // var ProductMgr = require('dw/catalog/ProductMgr');
    var server = require('server');
    // var Recommendation = require('dw/catalog/Recommendation');

    server.get('Start',function (req, res, next) {

        var ProductMgr = require('dw/catalog/ProductMgr');
        var productlist = ProductMgr.getProduct('008884303989M');
        var productCount = productlist.getCount();
        var productListunder = productlist.asList();
        
    });

    module.exports = server.exports();