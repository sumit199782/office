'use strict';

var Resource = require('dw/web/Resource');

/**
 * Image width & height editor UI component
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
        width: Resource.msg('editor.imagesizes.labels.width', 'editor', null),
        height: Resource.msg('editor.imagesizes.labels.height', 'editor', null),
    });
};
