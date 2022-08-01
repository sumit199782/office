"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
  var content = context.content;

  var model = new HashMap();
  model.BannerHeading = content.BannerHeading;
  model.BannerSubHeading = content.BannerSubHeading;
  
  model.BannerImageID = content.BannerImageID;
  model.BannerButtonLink = content.BannerButtonLink;

  return new Template("experience/components/commerce_assets/demoo").render(
    model
  ).text;
};