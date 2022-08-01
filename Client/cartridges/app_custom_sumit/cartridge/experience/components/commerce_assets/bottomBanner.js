'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.bottomImg = content.bottomImg;
    model.bottomparagraph = content.bottomparagraph;
    model.bottomshop = content.bottomshop;

    return new Template('experience/components/commerce_assets/bottomBanner').render(model).text;
}

