'use strict';

var Resource = require('dw/web/Resource');

/**
 * Custom input editor
 */

module.exports.init = function (editor) {
    editor.configuration.put('errors', {
        badInput        : Resource.msg('input.error.badinput', 'editor', null),
        customError     : Resource.msg('input.error.customerror', 'editor', null),
        patternMismatch : Resource.msg('input.error.patternmismatch', 'editor', null),
        rangeOverflow   : Resource.msg('input.error.rangeoverflow', 'editor', null),
        rangeUnderflow  : Resource.msg('input.error.rangeunderflow', 'editor', null),
        stepMismatch    : Resource.msg('input.error.stepmismatch', 'editor', null),
        tooLong         : Resource.msg('input.error.toolong', 'editor', null),
        tooShort        : Resource.msg('input.error.tooshort', 'editor', null),
        typeMismatch    : Resource.msg('input.error.typemismatch', 'editor', null),
        valueMissing    : Resource.msg('input.error.valuemissing', 'editor', null),
    });
};
