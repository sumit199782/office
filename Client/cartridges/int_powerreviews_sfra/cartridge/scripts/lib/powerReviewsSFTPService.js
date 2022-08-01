
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/**
 * PowerReviews SFTP Service
 *
 * @returns {FTPService} the service
 */
exports.get = function () {
    return LocalServiceRegistry.createService('powerreviews.sftp', {
        createRequest: function () {
        },
        parseResponse: function (svc, resp) {
            return resp;
        },
        filterLogMessage: function (msg) {
            return msg.replace('headers', 'OFFWITHTHEHEADERS');
        },
        getRequestLogMessage: function (request) {
            return !empty(request) ? request.toString() : 'Request is null.';
        },
        getResponseLogMessage: function (response) {
            return !empty(response) ? response.toString() : 'Response is null.';
        }
    });
};
