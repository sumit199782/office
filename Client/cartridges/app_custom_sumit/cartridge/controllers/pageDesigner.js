'use strict';

var server = require('server');


server.get('Show', function (req, res, next) {

let PageMgr = require('dw/experience/PageMgr');

    let page = PageMgr.getPage('mymusclechef')

    if (page.hasVisibilityRules()) {
        if (page.isVisible())
            res.print(PageMgr.renderPage(page.ID, 'mymusclechef'))
     }
     else{
             res.print(PageMgr.renderPage(page.ID, 'mymusclechef'));
     }

     next();

});

module.exports = server.exports();