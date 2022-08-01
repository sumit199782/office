'use strict';

var registry = require('*/utils/Registry');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');
var WIDTH_VALUES = {
    '25%'  : '25',
    '50%'  : '50',
    '75%'  : '75',
    '100%' : '100',
};
var STACK_VALUES = {
    'Text is over the image'  : 'overlayText',
    'Text is below the image' : 'stack',
};
var COUNTDOWN_STACK_VALUES = {
    'Countdown is over the image'  : 'overlayCountdown',
    'Countdown is below the image' : 'stack',
};
var VALIGMENT_VALUES = {
    top    : 'flex-start',
    center : 'center',
    bottom : 'flex-end',
};
var ALIGMENT_VALUES = {
    left   : 'flex-start',
    center : 'center',
    right  : 'flex-end',
};
var DEVICES_VALUES = {
    all           : '',
    desktop       : 'h-show-for-large',
    tablet_mobile : 'h-hide-for-large',
};

/**
 * View logic of the hero component.
 *
 * @param {dw.experience.ComponentScriptContext} context the context object
 * @returns {string} the component markup
 */
exports.render = function render(context) {
    var content = context.content;
    // build fake content asset to trick template & image component
    var model = PageRenderHelper.prepareContentObject(content);
    var cssClasses = [];
    var captionCssClasses = ['m-caption-flex'];
    var analytics = content.analytics ? require('*/utils/Object').tryParseJSON(content.analytics) : {};
    var TITLE_TAG = PageRenderHelper.getHeadingTags();
    model.custom.jsonData = { viewType: 'homepageHero', lazy: true };
    model.isPageDesigner = true;
    if (content.disableLazy) {
        model.custom.jsonData.lazy = false;
    }
    if (content.contentHorizontalAlignmentAll) {
        captionCssClasses.push('h-text-justify-content-' + ALIGMENT_VALUES[content.contentHorizontalAlignmentAll]);
    }
    if (content.contentHorizontalAlignment) {
        captionCssClasses.push('h-text-justify-content-' + ALIGMENT_VALUES[content.contentHorizontalAlignment] + '-for-large');
    }
    if (content.contentVerticalAlignmentAll) {
        captionCssClasses.push('h-text-align-items-' + VALIGMENT_VALUES[content.contentVerticalAlignmentAll]);
    }
    if (content.contentVerticalAlignment) {
        captionCssClasses.push('h-text-align-items-' + VALIGMENT_VALUES[content.contentVerticalAlignment] + '-for-large');
    }
    if (content.hideImage) {
        cssClasses.push('m-no-image');
    }
    if (content.roundedcorners) {
        model.roundedcorners = content.roundedcorners;
    }
    if (content.fullscreen) {
        cssClasses.push('m-fullscreen');
    }
    if (content.overlapOnScroll) {
        cssClasses.push('m-overlap-on-scroll');
        model.overlapOnScroll = content.overlapOnScroll;
        model.componentOptions = {
            overlapOnScroll: true,
        };
    }
    if (content.zoomOutOnLoad) {
        cssClasses.push('m-zoom-out');
        model.zoomOutOnLoad = content.zoomOutOnLoad;
    }
    if (STACK_VALUES[content.overlayText] === 'overlayText') {
        cssClasses.push('m-unstack');
    }
    if (STACK_VALUES[content.overlayTextDesktop] === 'stack') {
        cssClasses.push('m-stack--large');
    }
    if (content.overlayColor && content.overlayDevices) {
        model.overlayCssClass = 'm-' + content.overlayColor + '-gradient ' + DEVICES_VALUES[content.overlayDevices];
    }
    if (content.overlayColorHex && content.overlayDevices) {
        model.overlayCssClass = 'm-custom-gradient ' + DEVICES_VALUES[content.overlayDevices];
        model.overlayColorHex = content.overlayColorHex.value;
    }
    if (content.overlayHeight) {
        model.overlayHeight = content.overlayHeight + 'px';
    }
    if (content.textAlignmentAll) {
        model.bodyCssClass = 'h-text-align-' + content.textAlignmentAll;
    }
    if (content.textAlignmentDesktop) {
        model.bodyCssClass += ' h-text-align-' + content.textAlignmentDesktop + '-for-large';
    }
    if (content.captionWidth !== 'default') {
        model.bodyCssClass += ' m-width-' + WIDTH_VALUES[content.captionWidth] + '--large';
    }
    if (content.captionWidthAll !== 'default') {
        model.bodyCssClass += ' m-width-' + WIDTH_VALUES[content.captionWidthAll];
    }
    if (content.contentBackground || content.contentBackgroundAll) {
        model.bodyCssClass += ' m-plain';
    }
    if (content.contentBackgroundAll) {
        model.bodyCssClass += ' h-bgcolor-' + content.contentBackgroundAll;
    }
    if (content.contentBackground) {
        model.bodyCssClass += ' h-bgcolor-' + content.contentBackground + '-for-large';
    }
    var category = PageRenderHelper.getDynamicCategory(content);
    if (!content.title && category && content.showCategoryTitle) {
        content.title = category.getDisplayName();
    }
    if (content.title) {
        model.title = content.title;
        model.titleTagName = TITLE_TAG[content.titleTagName];
        model.titleColorClass = '';
        if (content.fontColorAll) {
            model.titleColorClass += 'h-color-' + content.fontColorAll;
        }
        if (content.fontColor) {
            model.titleColorClass += ' h-color-' + content.fontColor + '-for-large';
        }
    }
    if (content.bannerSlideAriaLabel) {
        model.bannerSlideAriaLabel = content.bannerSlideAriaLabel;
    } else if (content.title) {
        model.bannerSlideAriaLabel = content.title;
    }
    if (content.labelText) {
        model.labelText = content.labelText;
        model.labelColorClass = '';
        if (content.fontColorAll) {
            model.labelColorClass += 'h-color-' + content.fontColorAll;
        }
        if (content.fontColor) {
            model.labelColorClass += ' h-color-' + content.fontColor + '-for-large';
        }
        var hexValueRegexe = new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$');
        if (content.labelBackgroundColor && hexValueRegexe.test(content.labelBackgroundColor)) {
            model.labelBackgroundColor = 'background-color: ' + content.labelBackgroundColor + ';';
        }
    }
    if (!content.description && category && content.showCategoryDescription) {
        content.description = category.getDescription();
    }
    if (content.description) {
        model.description = content.description;
        model.descriptionColorClass = '';
        if (content.fontColorAll) {
            model.descriptionColorClass += 'h-color-' + content.fontColorAll;
        }
        if (content.fontColor) {
            model.descriptionColorClass += ' h-color-' + content.fontColor + '-for-large';
        }
    }

    model.custom.ctaImageAltText = content.imagealt;
    model.name = content.imagealt;
    if (content.image) {
        model.custom.ctaImage = content.image.file;
        model.custom.ctaImageMeta = content.image.metaData;
    }

    if (content.imageMobile) {
        model.custom.ctaImage1Mobile = content.imageMobile.file;
        model.custom.tabletImage = content.imageMobile.file;
        model.custom.ctaImageMetaMobile = content.imageMobile.metaData;
    }

    if (content.imageConfig && content.imageConfig.value) {
        model.custom.jsonData.images = require('*/utils/Object').extend(model.custom.jsonData.images, JSON.parse(content.imageConfig.value));
    }

    // TODO DEPRECATED CODE - begin
    // ctaUrl & ctaLabel are deprecated and replaced by the Hero Buttons region and separate Button components
    if (!empty(content.ctaUrl) && !empty(content.ctaLabel)) {
        model.buttons = [];
        model.buttons.push({
            ctaUrl        : content.ctaUrl,
            ctaLabel      : content.ctaLabel,
            ctaCssClass   : 'c-button',
            buttonWrapper : content.wholeSlideClickable ? 'button' : 'a',
        });
    }
    // TODO DEPRECATED CODE - end

    var regionRegistry = PageRenderHelper.getRegionModelRegistry(context.component);
    // Hero Buttons Region
    if (regionRegistry.heroButtons.region.getSize()) {
        model.buttonsHTML = regionRegistry.heroButtons.setClassName('c-content-hero__actions').setComponentClassName('c-content-hero__button').setComponentTagName('span').render();
    }
    // Hero Countdown Region
    if (regionRegistry.heroCountdown.region.getSize()) {
        var CountdownUtils = require('*/utils/Countdown');
        var countdownConfig = regionRegistry.heroCountdown.region.getVisibleComponents().toArray()
            .map(function (component) {
                var assetID = component.getAttribute('assetID');
                var assetConfig = null;
                if (assetID) {
                    var asset = require('*/helpers/Content').get(assetID);
                    assetConfig = asset && asset.isEnabled() ? asset.getValue('jsonData.countDownSettings') : null;
                }
                return {
                    countdown : assetConfig ? !!assetConfig.countdown : component.getAttribute('countFrom') === 'End to Start',
                    startDate : assetConfig
                        ? assetConfig.startDate || ''
                        : CountdownUtils.formatDate(
                            component.getAttribute('startDate') && component.getAttribute('startDate').value,
                            component.getAttribute('startTime') && component.getAttribute('startTime').value
                        ),
                    endDate: assetConfig
                        ? assetConfig.endDate || ''
                        : CountdownUtils.formatDate(
                            component.getAttribute('endDate') && component.getAttribute('endDate').value,
                            component.getAttribute('endTime') && component.getAttribute('endTime').value
                        ),
                };
            })[0];
        // If the countdown has ended, replace the hero banner image with new images if configurated
        if (!empty(countdownConfig) && !CountdownUtils.isActive(countdownConfig)) {
            if (!empty(content.countdownEndedImage)) {
                model.custom.ctaImage = content.countdownEndedImage.file;
            }
            if (!empty(content.countdownEndedImageMobile)) {
                model.custom.ctaImage1Mobile = content.countdownEndedImageMobile.file;
                model.custom.tabletImage = content.countdownEndedImageMobile.file;
            }
        }
        // handle the position of the countdown for mobile
        var countdownClasses = ['c-content-hero__countdown'];
        if (STACK_VALUES[content.overlayText] !== 'overlayText' && COUNTDOWN_STACK_VALUES[content.countdownMobilePosition] === 'overlayCountdown') {
            model.bodyCssClass += ' m-countdown-unstack';
        }
        model.countdownHTML = regionRegistry.heroCountdown.setClassName(countdownClasses.join(' ')).render();
    }
    // Hero Media Region
    if (regionRegistry.heroMedia.region.getSize()) {
        model.mediaHTML = regionRegistry.heroMedia.setClassName('c-content-hero__media').setComponentClassName('c-content-hero__media').setComponentTagName('span').render();
    }

    if (content.wholeSlideClickable) {
        model.wholeSlideClickable = true;
        model.slideLinkUrl = model.buttons ? model.buttons[0].ctaUrl : content.slideLink;
    }

    model.showCaption = !!(model.title || model.description || model.buttons || model.buttonsHTML);

    model.cssClass = cssClasses.join(' ');
    model.captionCssClass = captionCssClasses.join(' ');
    if (content.publishingDate) {
        model.custom.showDate = true;
    }
    if (content.contentAuthor) {
        model.custom.showAuthor = true;
        if (analytics && analytics.articleAuthor) {
            model.custom.articleAuthor = analytics.articleAuthor;
        }
    }
    if (content.publishingDate || content.contentAuthor) {
        model.custom.showInfo = true;
        model.infoColorClass = '';
        if (content.fontColorAll) {
            model.infoColorClass += 'h-color-' + content.fontColorAll;
        }
        if (content.fontColor) {
            model.infoColorClass += ' h-color-' + content.fontColor + '-for-large';
        }
    }
    if (content.authorImage) {
        model.custom.jsonData.authorImageConfig = {
            viewType: 'authorImage',
        };
        model.custom.authorImage = content.authorImage.file;
    }

    model.custom.jsonData.analytics = require('*/utils/Object').extend({
        name: require('*/utils/String').stripTags(content.title || content.imagealt),
    }, analytics);

    require('*/helpers/Content').setCurrentContent(model);
    return registry.getComponent('content', 'hero').setConfiguration({ isPageDesigner: true }, true).renderToString();
};
