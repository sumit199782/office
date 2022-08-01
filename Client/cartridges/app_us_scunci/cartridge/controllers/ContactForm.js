'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');


server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
        res.render('components/ContactUs');
    next();
}, pageMetaData.computedPageMetaData);

server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

server.get('sendMail', function (req, res, next) { 

    var CurrentSite = require('dw/system/Site').getCurrent();

    var sending_mail_id = CurrentSite.getCustomPreferenceValue('CustomEmailAddress');


    var fname = req.querystring.fname;
    var lname = req.querystring.lname;
    var email = req.querystring.email;

    var template = new dw.util.Template("mailDetail");
    var o = new dw.util.HashMap();

    o.put('fname',fname);
    o.put('lname',lname);
    o.put('email',email);

    if(req.querystring.phone)
    {
        var phone= req.querystring.phone;
        o.put('phone',phone);
    }
    if(req.querystring.my_question)
    {
        var my_question = req.querystring.my_question;
        o.put('my_question',my_question);
    }
    if(req.querystring.order_number)
    {
        var order_number = req.querystring.order_number;
        o.put('order_number',order_number);
    }
    if(req.querystring.comment)
    {
        var comment = req.querystring.comment;
        o.put('comment',comment);

    }


    var mail = new dw.net.Mail();
    mail.addTo(sending_mail_id);
    mail.setFrom(email);
    mail.setSubject(my_question);
    // mail.setContent('Here are the Details :- '+'\n'+
    //                 'First Name :- '+ fname +'\n'+
    //                 'Last Name :- '+ lname +'\n'+
    //                 'Email :- '+ email +'\n'+
    //                 'Phone :- '+ phone +'\n'+
    //                 'Question :- '+ my_question +'\n'+
    //                 'Order No :- '+ order_number +'\n'+
    //                 'Comments :- '+ comment +'\n'
    //                 );
    var contextObj=template.render(o).text;
    mail.setContent(contextObj,"text/html",'UTF-8');
    mail.send();
    res.print('mail sending..');
    next();

});


module.exports = server.exports();