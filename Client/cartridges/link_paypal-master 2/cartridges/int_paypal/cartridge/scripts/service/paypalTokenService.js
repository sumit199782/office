'use strict';

const serviceName = 'int_paypal.http.token.service';
const ServiceCredential = require('dw/svc/ServiceCredential');
const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
const Resource = require('dw/web/Resource');

const {
    getAccessToken,
    getUrlPath
} = require('*/cartridge/scripts/paypal/helpers/paypalHelper');
const paypalConstants = require('*/cartridge/scripts/util/paypalConstants');

/**
 * Creates 'createRequest' callback for a service
 * @param {dw.svc.Service} service service instance
 * @param {Object} requestData Request data
 * @returns {string} request body
 */
var createRequest = function (service, requestData) {
    var credentials = service.configuration.credential;

    if (!(credentials instanceof ServiceCredential)) {
        throw new Error(Resource.msgf('service.nocredentials', 'paypalerrors', null, serviceName));
    }

    service.setURL(getUrlPath(credentials, requestData.path));
    service.setRequestMethod(requestData.method);
    service.addHeader('Authorization', 'Basic ' + getAccessToken(credentials));

    switch (requestData.requestType) {
        case paypalConstants.ACCESS_TOKEN:
            service.addHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

            return 'grant_type=authorization_code&code=' + requestData.code;
        case paypalConstants.USER_INFO:
            service.addHeader('Authorization', 'Bearer ' + requestData.accessToken);
            service.addHeader('Content-Type', 'application/json');

            break;
        case paypalConstants.VERIFY_WH_SIG:
            service.addHeader('Content-Type', 'application/json');

            return JSON.stringify(requestData.whObject);
        default:
            break;
    }
};

module.exports = function () {
    return LocalServiceRegistry.createService(serviceName, {
        createRequest: createRequest,
        parseResponse: function (service, param) {
            return JSON.parse(param.text);
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
};
