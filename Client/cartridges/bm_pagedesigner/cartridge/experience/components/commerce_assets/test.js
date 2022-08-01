'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
/**
* Render logic for the storefront.editorialRichText component
* @param {dw.experience.ComponentScriptContext} context The Component script context object.
* @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
*
* @returns {string} The markup to be displayed
*/
module.exports.render = function(context) {
    var model = new HashMap();
    var content = context.content;
    model.image = content.image;
    model.imageConfig = content.imageConfig;
    return new Template('experience/components/test').render(model).text;
};