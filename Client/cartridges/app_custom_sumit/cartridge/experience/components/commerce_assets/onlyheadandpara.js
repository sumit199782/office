'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.heading_text_ID = content.heading_text_ID;
    model.paragraph1_text_ID = content.paragraph1_text_ID;
    model.paragraph2_text_ID = content.paragraph2_text_ID;


    return new Template('experience/components/commerce_assets/onlyheadandpara').render(model).text;
}

