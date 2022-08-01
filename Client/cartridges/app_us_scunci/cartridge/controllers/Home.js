'use strict'
var server = require('server');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
server.get('Show' , function(req , res , next){
    var Site = require('dw/system/Site');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    res.render('Home');
    next();
}, pageMetaData.computedPageMetaData);

server.get('Collabs' , function(req , res , next){
    res.render('collabs');
    next();
});
server.get('Collections' , function(req , res , next){
    res.render('collections');
    next();
});
server.get('Exclusives' , function(req , res , next){
    res.render('exclusives');
    next();
});
server.get('Brand' , function(req , res , next){
    res.render('brand');
    next();
});
server.get('Press' , function(req , res , next){
    res.render('press');
    next();
});
module.exports = server.exports();