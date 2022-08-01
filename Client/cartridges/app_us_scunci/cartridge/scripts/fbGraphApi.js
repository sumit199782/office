'use strict';
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
function fbGraphAPI()
{
    try {
        var igToken=require('dw/system/Site').current.getCustomPreferenceValue('instaToken');
        var dataForService= {
            igToken: igToken
        }
        var dataOfService= getFBGraphAPI.call(dataForService);
        var data=dataOfService.object;
        var dataParse=JSON.parse(data);
        var Token=dataParse.access_token;
        if(Token)
        {
        require('dw/system/Site').current.setCustomPreferenceValue('instaToken',Token);
        }
        dw.system.Logger.warn('Token -:'+Token);
    }
    catch(e)
    {
        var exception=e;
        dw.system.Logger.warn('exception -:'+exception);
    }
}
var getFBGraphAPI = LocalServiceRegistry.createService('FBGraphApi', {
    createRequest: function (svc,args) {
        var url =svc.getConfiguration().getCredential().getURL();
        dw.system.Logger.warn('url-:'+url);
        var grant_type= 'ig_refresh_token';
        url=url+'?'+'grant_type'+'='+grant_type+'&'+'access_token='+args.igToken
        svc.setRequestMethod('GET');
        svc.addHeader('Content-Type', 'application/json; charset=UTF-8');
        svc.setURL(url);
    },
    parseResponse:function (svc, output) {
         dw.system.Logger.warn('output'+output.text);
         return output.text;
    }
});
exports.fbGraphAPI = fbGraphAPI;