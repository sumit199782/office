var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Site = require('dw/system/Site');
var StringUtils = require('dw/util/StringUtils');
var Encoding = require('dw/crypto/Encoding');
var komojuAPIService = LocalServiceRegistry.createService('komoju', {
    createRequest: function (svc, args) {
        var apiID = Site.getCurrent().getCustomPreferenceValue("Komoju_Secret_Key");
        var encodingAPIID = Encoding.toBase64(apiID)
        svc.setRequestMethod("POST");
        svc.addHeader("Accept", "*/*");
        svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
        svc.addHeader("Authorization", "Bearer " +  encodingAPIID);
        var postBodyArgs = [],
            postBody = "";

        for (var p in args) {
            postBodyArgs.push(
                StringUtils.format(
                    "{0}={1}",
                    encodeURIComponent(p),
                    encodeURIComponent(args[p])
                )
            );
        }

        postBody = postBodyArgs.join("&");

        return postBody;
    },
    parseResponse: function (svc, httpClient) {
        var result;

        try {
            result = JSON.parse(httpClient.text);
        } catch (error) {
            result = httpClient.text;
        }
        return result;
    },
});


module.exports = {
    komojuAPIService: komojuAPIService
}