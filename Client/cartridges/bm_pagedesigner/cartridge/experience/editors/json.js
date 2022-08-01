'use strict';

/**
 * JSON editor UI component
 * @documentation https://confluence.e-loreal.com/display/LOR/Editor+UI+-+JSON
 */

module.exports.init = function (editor) {
    editor.configuration.put('messages', {
        badformatted: require('dw/web').Resource.msg('editor.json.messages.badformatted', 'editor', null),
    });
};
