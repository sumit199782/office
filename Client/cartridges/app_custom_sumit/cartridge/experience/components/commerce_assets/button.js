'use strict';

/**
 * Button component
 */

/**
 * Render logic for the assets.button
 *
 * @param {dw.experience.ComponentScriptContext} context the context object
 * @returns {string} the component markup
 */

module.exports.render = function (context) {
    var button = require('*/utils/Registry').getComponent('common', 'button');
    var obj = require('*/utils/Object').mapToObject(context.content);
    var html = button.setConfiguration({ settings: obj }).renderToString();
    return html;
};
