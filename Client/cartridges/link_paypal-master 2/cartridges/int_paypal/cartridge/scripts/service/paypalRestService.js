'use strict';

const serviceName = 'int_paypal.http.rest';
const ServiceCredential = require('dw/svc/ServiceCredential');
const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
const Resource = require('dw/web/Resource');
const tokenCache = require('dw/system/CacheMgr').getCache('paypalRestOauthToken');

const {
    createErrorLog
} = require('*/cartridge/scripts/paypal/paypalUtils');
const {
    getUrlPath
} = require('*/cartridge/scripts/paypal/helpers/paypalHelper');

/**
 * Create and store oauth token
 * @param  {dw.svc.Service} service current service based on serviceName
 * @returns {string} oauth token
 */
function getToken(service) {
    var bearerToken = tokenCache.get('token');
    if (bearerToken) {
        return 'Bearer ' + bearerToken;
    }
    service.setThrowOnError().call({
        createToken: true
    });
    var {
        error_description,
        access_token
    } = service.response;
    if (!error_description && access_token) {
        tokenCache.put('token', access_token);
        return 'Bearer ' + access_token;
    }
    if (error_description) {
        throw new Error(error_description);
    } else {
        throw new Error('Unknown error occurred');
    }
}

/** createRequest callback for a service
 * @param  {dw.svc.Service} service service instance
 * @param  {Object} data call data with path, method, body for a call or createToken in case of recursive call
 * @returns {string} request body
 */
function createRequest(service, data) {
    var credential = service.configuration.credential;
    if (!(credential instanceof ServiceCredential)) {
        var {
            msgf
        } = Resource;
        throw new Error(msgf('service.nocredentials', 'paypalerrors', null, serviceName));
    }
    var {
        path,
        method,
        body,
        createToken,
        partnerAttributionId
    } = data;

    // recursive part for create token call
    if (createToken) {
        service.setRequestMethod('POST');
        service.setURL(getUrlPath(credential, 'v1/oauth2/token?grant_type=client_credentials'));
        service.addHeader('Content-Type', 'application/x-www-form-urlencoded');
        return '';
    }

    var token = getToken(service);
    service.setURL(getUrlPath(credential, path));
    service.addHeader('Content-Type', 'application/json');
    service.setRequestMethod(method || 'POST');
    service.addHeader('Authorization', token);
    if (partnerAttributionId) {
        service.addHeader('PayPal-Partner-Attribution-Id', partnerAttributionId);
    }
    return body ? JSON.stringify(body) : '';
}

module.exports = (function () {
    var {
        msgf
    } = Resource;
    var restService;
    try {
        restService = LocalServiceRegistry.createService(serviceName, {
            createRequest: createRequest,
            parseResponse: function (_, httpClient) {
                return JSON.parse(httpClient.getText());
            },
            filterLogMessage: function (msg) {
                return msg;
            },
            getRequestLogMessage: function (request) {
                return request;
            },
            getResponseLogMessage: function (response) {
                return response.text;
            }
        });
    } catch (error) {
        createErrorLog(msgf('service.error', 'paypalerrors', null, serviceName));
        throw new Error();
    }

    return {
        call: function (data) {
            var result;
            try {
                result = restService.setThrowOnError().call(data);
            } catch (error) {
                createErrorLog(msgf('service.generalerror', 'paypalerrors', null, serviceName));
                throw new Error();
            }
            if (result.isOk()) {
                return restService.response;
            }
            if (!result.errorMessage) {
                createErrorLog(msgf('service.wrongendpoint', 'paypalerrors', null, data.path));
                throw new Error();
            }

            var errorName;
            var errorDescription;
            var errorData = JSON.parse(result.errorMessage);
            // For type error ex -> {"error", "error_description"}
            if (errorData.error) {
                errorName = errorData.error;
                errorDescription = errorData.error_description;
            } else {
                // For error details with issue -> {"name", "message", "details": [{"issue", "description"}]}
                errorName = errorData.details ? errorData.details[0].issue : errorData.name;
                errorDescription = errorData.details ? errorData.details[0].description : errorData.message;
            }

            (errorName.toLowerCase() === 'invalid_client') ?
                createErrorLog(msgf('service.wrongcredentials', 'paypalerrors', null, restService.configuration.credential.ID)) :
                createErrorLog(errorDescription);

            throw new Error(errorName.toLowerCase());
        }
    };
}());
