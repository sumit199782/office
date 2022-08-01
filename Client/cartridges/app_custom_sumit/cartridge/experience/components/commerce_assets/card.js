"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
  var content = context.content;

  var model = new HashMap();
  model.cardheading = content.cardheading;
  model.cardpara = content.cardpara;
  model.cardImg1 = content.cardImg1;
  model.producttitle1 = content.producttitle1;
  model.productrate1 = content.productrate1;
  model.buyButton = content.buyButton;
  model.cardImg2 = content.cardImg2;
  model.producttitle2 = content.producttitle2;
  model.productrate2 = content.productrate2;

  return new Template("experience/components/commerce_assets/cards").render(
    model
  ).text;
};