'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.FAQ12 = content.FAQ12;
    model.FAQNumber1 = content.FAQNumber1;
    model.FAQHeading1 = content.FAQHeading1;
    model.FAQDetails1 = content.FAQDetails1;

     model.FAQNumber2 = content.FAQNumber2;
    model.FAQHeading2 = content.FAQHeading2;
    model.FAQDetails2 = content.FAQDetails2;

     model.FAQNumber3 = content.FAQNumber3;
    model.FAQHeading3 = content.FAQHeading3;
    model.FAQDetails3 = content.FAQDetails3;

     model.FAQNumber4 = content.FAQNumber4;
    model.FAQHeading4 = content.FAQHeading4;
    model.FAQDetails4 = content.FAQDetails4;

     model.FAQNumber5 = content.FAQNumber5;
    model.FAQHeading5 = content.FAQHeading5;
    model.FAQDetails5 = content.FAQDetails5;

    model.FAQarrowimage1 = content.FAQarrowimage1;
    model.FAQarrowimage2 = content.FAQarrowimage2;



    return new Template('experience/components/commerce_assets/FAQ').render(model).text;
}

