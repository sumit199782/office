const Resource = require('dw/web/Resource');
const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');
const paypalTokenService = require('*/cartridge/scripts/service/paypalTokenService');
const {
    createErrorLog
} = require('*/cartridge/scripts/paypal/paypalUtils');

/**
 * whBase Model
 */
function whBase() {}

/**
 * Verifies a webhook signature.
 * @param {Object} whEvent WebHook event
 * @param {dw.util.Map} headers Headers from request body
 * @param {string} webHookId WebHook id
 * @returns {Object} Verify response object
 */
whBase.prototype.verifyWhSignature = function (whEvent, headers, webHookId) {
    var service = paypalTokenService();
    var requestData = {
        whObject: {
            auth_algo: headers.get('paypal-auth-algo'),
            cert_url: headers.get('paypal-cert-url'),
            transmission_id: headers.get('paypal-transmission-id'),
            transmission_sig: headers.get('paypal-transmission-sig'),
            transmission_time: headers.get('paypal-transmission-time'),
            webhook_id: webHookId,
            webhook_event: whEvent
        },
        requestType: paypalConstants.VERIFY_WH_SIG,
        method: paypalConstants.METHOD_POST,
        path: 'notifications/verify-webhook-signature'
    };

    var result = service.setThrowOnError().call(requestData);

    if (!result.ok) {
        var errorObject = JSON.parse(result.errorMessage);
        var error = errorObject.error_description;

        createErrorLog(error);
        throw error;
    }

    return result.object;
};

/**
 * Logs an error if the event does not match
 * @param {string} eventType Event type
 * @param {string} endpointName Endpoint name
 */
whBase.prototype.logEventError = function (eventType, endpointName) {
    var errorMessage = endpointName + ':' + Resource.msgf('paypal.webhook.event.does.not.match.error', 'paypalerrors', null, eventType);

    throw errorMessage;
};

module.exports = whBase;
