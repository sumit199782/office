    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
    var StringUtils = require('dw/util/StringUtils');
    var komojuToken = LocalServiceRegistry.createService('komoju', {
        createRequest: function (svc, agrs) {
            svc.setRequestMethod('POST');
            svc.addHeader('Authorization', 'Basic c2tfdGVzdF8zb3R5aTEwNHZxcTN2cTBhbWVxdzBsYmU6');
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
                    Token = result.object.id;
                } catch (error) {
                    result = httpClient.text;
                }
                return result;
            },
    });
module.exports = {
    komojuToken : komojuToken,
    // Token: Token
};
