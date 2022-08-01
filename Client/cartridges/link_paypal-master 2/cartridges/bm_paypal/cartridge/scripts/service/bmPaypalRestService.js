'use strict';

var ServiceCredential = require('dw/svc/ServiceCredential');
var Resource = require('dw/web/Resource');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var tokenCache = require('dw/system/CacheMgr').getCache('paypalRestOauthToken');

var ppConstants = require('*/cartridge/scripts/util/paypalConstants');

/**
 * Create URL for a call
 * @param  {dw.svc.ServiceCredential} credential current service credential
 * @param  {string} path REST action endpoint
 * @returns {string} url for a call
 */
function getUrlPath(credential, path) {
    var url = credential.URL;

    if (!url.match(/.+\/$/)) {
        url += '/';
    }

    url += path;

    return url;
}

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

    throw new Error(error_description);
}

/** createRequest callback for a service
 * @param  {dw.svc.Service} service service instance
 * @param  {Object} data call data with path, method, body for a call or createToken in case of recursive call
 * @returns {string} request body
 */
function createRequest(service, data) {
    var credential = service.configuration.credential;

    if (!(credential instanceof ServiceCredential)) {
        throw new Error(Resource.msgf('service.nocredentials', 'paypalbm', null, ppConstants.SERVICE_NAME));
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

/**
 * Defines callbacks for use with the LocalServiceRegistry
 *
 * @returns {Object} Request object passed to the execute method
 */
function createRestService() {
    return {
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
    };
}

module.exports = function () {
    return LocalServiceRegistry.createService(ppConstants.SERVICE_NAME, createRestService());
};
