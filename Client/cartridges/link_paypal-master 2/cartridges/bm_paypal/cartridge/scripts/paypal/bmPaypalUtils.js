
'use strict';

const Logger = require('dw/system/Logger');

var paypalLogger;

/**
 * Get logger instance
 *
 * @param {msg} msg Error message
 */
function createErrorLog(msg) {
    paypalLogger = paypalLogger || Logger.getLogger('PayPal-BM', 'PayPal_General');

    if (!empty(msg)) {
        paypalLogger.error(msg);
    } else {
        paypalLogger.debug('Empty log entry');
    }

    return;
}

module.exports = {
    createErrorLog: createErrorLog
};
