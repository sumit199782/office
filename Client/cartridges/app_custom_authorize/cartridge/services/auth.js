var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var authorizeAPIService = LocalServiceRegistry.createService('authorize.Service', {
    createRequest: function (svc, params) {
        var url = svc.getURL();
        var newTokenURL = url + '/token';
        svc.setURL(newTokenURL);
        svc.setRequestMethod('POST');
        svc.addHeader('Accept', 'application/json');
        svc.addHeader('content-type','application/json');
        return params;
    },
    parseResponse: function (svc, httpClient) {
        var result;

        try {
            result = JSON.parse(httpClient.text);
        } catch (e) {
            result = httpClient.text;
        }
        return result;
    }
});

module.exports = {
    authorizeAPIService: authorizeAPIService
}