'use strict';

var Resource = require('dw/web/Resource');

/**
 * Devices editor UI component
 * @documentation https://confluence.e-loreal.com/display/LOR/Editor+UI+-+Image+viewports
 */

module.exports.init = function (editor) {
    editor.configuration.put('messages', {
        newviewport: Resource.msg('editor.viewports.messages.newviewport', 'editor', null),
        atleastoneviewport: Resource.msg('editor.viewports.messages.atleastoneviewport', 'editor', null),
    });

    editor.configuration.put('labels', {
        addviewport: Resource.msg('editor.viewports.labels.addviewport', 'editor', null),
        saveviewports: Resource.msg('editor.viewports.labels.saveviewports', 'editor', null),
        viewport: Resource.msg('editor.viewports.labels.viewport', 'editor', null),
        value: Resource.msg('editor.viewports.labels.value', 'editor', null),
    });
};
