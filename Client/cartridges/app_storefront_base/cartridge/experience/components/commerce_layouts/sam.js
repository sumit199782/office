'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storefront.3 Row x 1 Col (Mobile) 1 Row x 3 Col (Desktop) layout
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var content = context.content;
    var model = modelIn || new HashMap();
    var component = context.component;


    // var component = context.component;
    model.xyz = content.xyz;
    
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    // model.regions = PageRenderHelper.getRegionModelRegistry(content);

    return new Template('experience/components/commerce_layouts/sam').render(model).text;
};
