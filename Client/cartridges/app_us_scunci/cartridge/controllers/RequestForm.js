'use strict';
var server = require('server');
server.get('ShowForm' , function(req , res , next){
    res.render('CCPA-delete-request');
    next();
});

server.get('RequestCCPA' , function(req , res , next){
    res.render('CCPA-request-info');
    next();
});

server.get('sendMail', function (req, res, next) { 

    var CurrentSite = require('dw/system/Site').getCurrent();

    var sending_mail_id = CurrentSite.getCustomPreferenceValue('CCPA_delete_email');

    // var sending_mail_id = CurrentSite.getCustomPreferenceValue('CustomEmailAddress');

    var fname = req.querystring.fname;
    var lname = req.querystring.lname;
    var address = req.querystring.address1;
    var city = req.querystring.city;
    var label1 = req.querystring.label1;
    var label2 = req.querystring.label2;
    var zip = req.querystring.zip;
    var state = req.querystring.state;
    var email = req.querystring.email;
    // var phone = req.querystring.phone;
    // var subject = req.querystring.subject;
    // var product_color = req.querystring.product_color;
    // var model_number = req.querystring.model_number;
    var my_question='my_question';
    var order_number='order_number';
    var comment='comment';

    // var fname = req.form.fname;
    // var lname = req.form.lname;
    // var address = req.form.address;
    // var city = req.form.city;
    // var zip = req.form.zip;
    // var email = req.form.email;
    // var phone = req.form.phone;
    // var subject = req.form.subject;
    // var product_color = req.form.product_color;
    // var model_number = req.form.model_number;

    var mail = new dw.net.Mail();
    // mail.addTo(email);
    // mail.setFrom(sending_mail_id);
    mail.addTo(sending_mail_id);
    mail.setFrom(email);
    mail.setSubject("CCPA:Delete Information ( "+email+" )");
    mail.setContent('Here are the Details :- '+'\n'+
                    'First Name :- '+ fname +'\n'+
                    'Last Name :- '+ lname +'\n'+
                    'Email :- '+ email +'\n'+
                    'State :- '+ state +'\n'+
                    'Address :- '+ address +'\n'+
                    'City :- '+ city +'\n'+
                    'Zip :- '+ zip +'\n'+
                    'Relationship :- '+ label1 +'\n'+
                    'Request :- '+ label2 +'\n'
                    );
   
    mail.send();
    res.print('mail sending..');
    next();

});

server.get('sendRequestMail', function (req, res, next) { 

    var CurrentSite = require('dw/system/Site').getCurrent();

    var sending_mail_id = CurrentSite.getCustomPreferenceValue('CCPA_request_email');

    // var sending_mail_id = CurrentSite.getCustomPreferenceValue('CustomEmailAddress');

    var fname = req.querystring.fname;
    var lname = req.querystring.lname;
    var address = req.querystring.address1;
    var city = req.querystring.city;
    var label1 = req.querystring.label1;
    // var label2 = req.querystring.label2;
    var zip = req.querystring.zip;
    var state = req.querystring.state;
    var email = req.querystring.email;
    // var phone = req.querystring.phone;
    // var subject = req.querystring.subject;
    // var product_color = req.querystring.product_color;
    // var model_number = req.querystring.model_number;
    var my_question='my_question';
    var order_number='order_number';
    var comment='comment';

    // var fname = req.form.fname;
    // var lname = req.form.lname;
    // var address = req.form.address;
    // var city = req.form.city;
    // var zip = req.form.zip;
    // var email = req.form.email;
    // var phone = req.form.phone;
    // var subject = req.form.subject;
    // var product_color = req.form.product_color;
    // var model_number = req.form.model_number;

    var mail = new dw.net.Mail();
    // mail.addTo(email);
    // mail.setFrom(sending_mail_id);
    mail.addTo(sending_mail_id);
    mail.setFrom(email);
    mail.setSubject("CCPA:Request a copy ( "+email+" )");
    mail.setContent('Here are the Details :- '+'\n'+
                    'First Name :- '+ fname +'\n'+
                    'Last Name :- '+ lname +'\n'+
                    'Email :- '+ email +'\n'+
                    'State :- '+ state +'\n'+
                    'Address :- '+ address +'\n'+
                    'City :- '+ city +'\n'+
                    'Zip :- '+ zip +'\n'+
                    'Relationship :- '+ label1 
                    // 'Request :- '+ label2 +'\n'
                    );
   
    mail.send();
    res.print('mail sending..');
    next();

});

module.exports = server.exports();