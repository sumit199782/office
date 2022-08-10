    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
    var Site = require('dw/system/Site');
    var StringUtils = require('dw/util/StringUtils');
    var komojuToken = LocalServiceRegistry.createService('komoju', {
        createRequest: function (svc, agrs) {
        var apiID = Site.getCurrent().getCustomPreferenceValue("Komoju_Secret_Key");
            svc.setRequestMethod('POST');
            svc.addHeader('Authorization', 'Basic '+apiID);
            svc.addHeader('Accept', '*/*');
            svc.addHeader('content-type','application/x-www-form-urlencoded');
            var postBodyArgs = [],
            postBody = "";

        for (var p in agrs) {
            postBodyArgs.push(
                StringUtils.format(
                    "{0}={1}",
                    encodeURIComponent(p),
                    encodeURIComponent(agrs[p])
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
    komojuToken : komojuToken,
};
