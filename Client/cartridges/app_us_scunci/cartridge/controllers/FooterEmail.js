'use strict';
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var Logger = require('dw/system/Logger');
var Category = require('dw/catalog/Category');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var categoryId;
var token;
var email;
var contactList;

server.get('Subscribe', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    email=req.querystring.email;
    getAccessToken.call();
    res.print('subscribed sucessfully');
    var CurrentSite = require('dw/system/Site').getCurrent();
    var scunciMainID = CurrentSite.getCustomPreferenceValue('conair_mainListId');
    var listId = CurrentSite.getCustomPreferenceValue('conair_listId');
    // contactList = "<Envelope><Body><AddRecipient><LIST_ID>"+listId+"</LIST_ID><EMAIL>"+email+"</EMAIL></AddRecipient></Body></Envelope>";
    contactList = "<Envelope><Body><AddRecipient><LIST_ID>"+scunciMainID+"</LIST_ID><CREATED_FROM>1</CREATED_FROM><CONTACT_LISTS><CONTACT_LIST_ID>" + listId  + "</CONTACT_LIST_ID></CONTACT_LISTS><COLUMN><NAME>EMAIL</NAME><VALUE>"+email+"</VALUE></COLUMN></AddRecipient></Body></Envelope>";
    Subscribe_email.call();
    next();
}, pageMetaData.computedPageMetaData);
server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});
var getAccessToken = LocalServiceRegistry.createService('AcousticAuth', {
    createRequest: function (svc, args) {
        var url =svc.getConfiguration().getCredential().getURL();
        var user = svc.getConfiguration().getCredential().getUser();
        var password =svc.getConfiguration().getCredential().getPassword();
        svc.setRequestMethod('POST');
        svc.setURL(url+'?grant_type=refresh_token&client_id=0cb8411d-a936-4a2e-bd03-cdee4274a784&client_secret=b2d966ef-2a1d-4074-9c27-2f0f262afcbb&refresh_token=rBH432en8LQkBuOuV5XpDUPEqcRyUM1X32QCX2sniZuoS1');
    },
    parseResponse:function (svc, output){
        var obj=JSON.parse(output.text);
        token=obj.access_token;
        Logger.warn('token:'+token);
        return output;
    }         
});
var Subscribe_email = LocalServiceRegistry.createService('AcousticXMLRequest', {
    createRequest: function (svc,args) {
        var url =svc.getConfiguration().getCredential().getURL();
        Logger.warn('url-:'+url);
        
        svc.setRequestMethod('POST');
        svc.addHeader('Authorization', 'Bearer '+token);
        svc.addHeader('Content-Type', 'application/xml');
        
        svc.setURL(url);
        svc.setEncoding('Done');
        svc.addParam('xml',contactList);
        
    },
    parseResponse:function (svc, output) {
        var at=output.text;
        Logger.warn('output text------'+output.text);
        return output;
    }
});
module.exports = server.exports();