var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");
var StringUtils = require("dw/util/StringUtils");
var Site = require("dw/system/Site");

var paymentIntent = LocalServiceRegistry.createService("int.stripe.intents", {
    createRequest: function (svc, args) {
        var apiID = Site.getCurrent().getCustomPreferenceValue("Stripe_API_Key");
        svc.setRequestMethod("POST");
        svc.addHeader("Accept", "*/*");
        svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
        svc.addHeader("Authorization", "Bearer " + apiID);
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

module.exports = { paymentIntent: paymentIntent };
