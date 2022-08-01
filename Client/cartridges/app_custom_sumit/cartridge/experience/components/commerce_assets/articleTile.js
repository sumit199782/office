'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var CssTransformation = require('*/cartridge/experience/utilities/CssTransformation.js');

/**
 * Render logic for Content Tile layout.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */

module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var component = context.component;
    var content = context.content;
    model.id = component.getID();

    model.atcImageDesktop = content.atcImageDesktop ? ImageTransformation.getScaledImage(content.atcImageDesktop) : '';
    model.atcImageTablet = content.atcImageTablet ? ImageTransformation.getScaledImage(content.atcImageTablet) : '';
    model.imageMobile = content.imageMobile ? ImageTransformation.getScaledImage(content.imageMobile) : '';
    model.enableImageZoomOnHover = content.enableImageZoomOnHover ? content.enableImageZoomOnHover : '';
    model.imageAlt = content.imageAlt ? content.imageAlt : '';
    model.atcTitle = content.atcTitle ? content.atcTitle : '';
    model.atcTitleFontsize = CssTransformation.getFontSizeClass(content.atcTitleFontsize);
    model.atcTitleFonttype = content.atcTitleFonttype ? content.atcTitleFonttype : '';
    model.atcDecFontsize = CssTransformation.getFontSizeClass(content.atcDecFontsize);
    model.atcDecFonttype = content.atcDecFonttype ? content.atcDecFonttype : '';
    model.tagName = CssTransformation.getHeadingClass(content.tagName);

    model.descriptionHTML = content.descriptionHTML ? content.descriptionHTML : '';
    model.linkLabel = content.linkLabel ? content.linkLabel : '';
    model.href = content.href ? content.href : '';
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_assets/articleTile').render(model).text;
};
