"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
  var content = context.content;

  var model = new HashMap();
  model.BlockImageID = content.BlockImageID;
  model.BlockHeading = content.BlockHeading;

  return new Template("experience/components/commerce_assets/blocks").render(
    model
  ).text;
};