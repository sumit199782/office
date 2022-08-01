'use strict';

var server = require('server');
//define a variable named PageMgr that requires the dw.experience.PageMgr API

server.get('Show', function (req, res, next) {
  //define a variable named PageMgr that requires the dw.experience.PageMgr API
  let PageMgr = require('dw/experience/PageMgr');
  //get the page with the specific, hard-coded id
  let page = PageMgr.getPage('sale-page');
  
  if(page.hasVisibilityRules())
  {
    // pagecaching is NOT ok here
    if(page.isVisible())
    {
      res.print(PageMgr.renderPage(page.ID, "sale-page"));
     }
  }
  else
  {
    // Hint: don't forget to cover the else condition, because in our exercise hasVisibilityRules() is false
    // pagecaching is ok here, but requires a pagecache refresh if merchants start adding visibility rules to the page
    res.print(PageMgr.renderPage(page.ID, "sale-page"));
  }
  next();
});

module.exports = server.exports();
