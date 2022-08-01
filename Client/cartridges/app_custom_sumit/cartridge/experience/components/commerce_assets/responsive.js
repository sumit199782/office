"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
  var content = context.content;

  var model = new HashMap();
  model.topheadingred = content.topheadingred;
  model.topheading = content.topheading;
  model.cardsImageID1 = content.cardsImageID1;
  model.heading1 = content.heading1;
  model.para1 = content.para1;
  model.button1 = content.button1;
  model.cardsImageID2 = content.cardsImageID2;
  model.heading2 = content.heading2;
  model.para2 = content.para2;
  model.button2 = content.button2;
  model.cardsImageID3 = content.cardsImageID3;
  model.heading3 = content.heading3;
  model.para3 = content.para3;
  model.button3 = content.button3;
  model.cardsImageID4 = content.cardsImageID4;
  model.heading4 = content.heading4;
  model.para4 = content.para4;
  model.button4 = content.button4;
  model.cardsImageID5 = content.cardsImageID5;
  model.heading5 = content.heading5;
  model.para5 = content.para5;
  model.button5 = content.button5;
  model.cardsImageID6 = content.cardsImageID6;
  model.heading6 = content.heading6;
  model.para6 = content.para6;
  model.button6 = content.button6;




  return new Template("experience/components/commerce_assets/responsivecards").render(
    model
  ).text;
};