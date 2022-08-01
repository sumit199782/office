'use strict';

/* global request */
/* global templateName */

var ISML = require('dw/template/ISML');
var Logger = require('dw/system/Logger');
var PowerReviews = require('*/cartridge/scripts/lib/libPowerReviews');

/**
 * Should be executed after page footer
 * Renders a powerreviews/include template. No value return is expected.
 */
function afterFooter() {
    var libPR = new PowerReviews(request.locale);

    if (libPR.getOnlineStatus()) {
        ISML.renderTemplate('powerreviews/include', {
            libPR: libPR
        });
    } else {
        Logger.error('Error while rendering template ' + templateName);
    }
}

exports.afterFooter = afterFooter;
