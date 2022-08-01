'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.bannerImg = content.bannerImg;
    model.bannerparagraph = content.bannerparagraph;
    model.bannerparagraph2 = content.bannerparagraph2;
    model.bannerImg2 = content.bannerImg2;



    return new Template('experience/components/commerce_assets/tDemo').render(model).text;
}

