'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.paragraph_text_ID = content.paragraph_text_ID;

    return new Template('experience/components/commerce_assets/onlyheadandpara').render(model).text;
}

