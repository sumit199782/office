/**
 * This script provides a wrapper for Product Image API so transformation rules can be retrieved
 * from preferences without having any effect on the actual code. That helps to easily adjust
 * transformation settings and introduce new view types.
 *
 * ---------------
 *
 * How to use the image wrapper?
 *
 * var ProductImageDIS = require('/cartridge/scripts/helpers/ProductImageDIS');  //create wrapper object with product and defined viewtype
 *
 * // create the image API facades
 * var images = ProductImageDIS.getImages(product, type);   // get all images of a given product and specified viewType
 * var image11 = new ProductImageDIS(product, type, 10);    // get the 11th image of the given product and specified viewType
 * var image = new ProductImageDIS(product, type, 0);       // get the first image of the given product and specified viewType (index == 0 || undefined) get the first image
 *
 * // using the image API facades is SFCC API neutral,
 * // i.e. as soon as you have the initialized object,
 * // you can simply use it as it is!!!
 * url: image.getURL();         // get dynamic imaging service url as string
 * url: image.getHttpsURL();    // get dynamic imaging service https url as string
 * title: image.getTitle();     // get image title
 * image.getAlt();              // get image alt text
 *
 * ---------------
 *
 * How to configure the Dynamic Imaging Service Wrapper?
 *
 * The configuration should be in cartridge/preferences/image_config_DIS.json
 * Configure viewTypes, viewTypeMapping and missing images.
 *
 * ViewType example:
 * {
 *   "viewTypeMapping": {   // maps the to be scaled view types to the scalable view type
 *       "medium": "large", // when requested, transform viewType "medium" based on viewType "large"
 *       "small": "large"   // when requested, transform viewType "small" based on viewType "large"
 *   },
 *   "medium": {            // defines the transformation parameters for the scaled view type 'medium'
 *       "scaleWidth": 400,
 *       "scaleHeight": 400,
 *       "scaleMode": "fit"
 *   },
 *   "small": {              // defines the transformation parameters for the scaled view type 'medium'
 *       "scaleWidth": 100,
 *       "scaleHeight": 100
 *   },
 *   "missingImages": {      // defines fallback images for the respective viewTypes
 *       "large": "large_missing.jpg",
 *       "medium": "medium_missing.jpg",
 *       "small": "small_missing.jpg"
 *   }
 * }
 *
 * See https://documentation.demandware.com/DOC2/topic/com.demandware.dochelp/ImageManagement/CreatingImageTransformationURLs.html for a complete list of transformation parameters
 */

var URLUtils = require('dw/web/URLUtils');
var ArrayList = require('dw/util/ArrayList');
var Site = require('dw/system/Site');

// var System = require('dw/system/System');
var ProductVariationAttributeValue = require('dw/catalog/ProductVariationAttributeValue');
var ProductVariationModel = require('dw/catalog/ProductVariationModel');
// configuration 'singleton' for the duration of a request
var cvDISConfiguration = require('*/cartridge/preferences/image_config_DIS');

/**
* Initializes the ProductImage wrapper object
*
* @param {String} viewType type of view (resolution) that should be generated (required)
* @param {Object} imageObject Product or ProductVariationAttributeValue (required)
* @param {number} index Number position of the image in the list of images for the view type. Defaults to 0 if not provided
*
* @returns {Object} Initialized Image object that is MedialFile API neutral
*/
function ProductImage(imageObject, viewType, index) {

    // init basic object attributes
    // --> keeps the image reference
    this.image = null;
    // --> defines if image needs to be scaled
    this.scaleImage = false;
    // --> view type that should be rendered
    this.viewType = viewType;
    // --> the image object --> escape empty object
    this.imageObject = imageObject;

    if (this.imageObject === null) {
        return;
    }

    // Check what type of image object the wrapper got
    if (this.imageObject instanceof ProductVariationAttributeValue) {
        this.referenceType = 'ProductVariationAttributeValue';
    } else if (this.imageObject instanceof ProductVariationModel) {
        this.referenceType = 'Product';
        this.imageObject = imageObject.selectedVariants.length > 0 ? imageObject.selectedVariants[0] : imageObject.master;
    } else {
        this.referenceType = 'Product';
    }

    // --> the view type that can be scaled - typically high resolution
    this.scalableViewType = null;
    // --> index of the image
    this.index = !index ? 0 : index;
    // --> defines if the image needs to be scaled. That's not necessary if a product has an image for the given view type configured
    this.scaleImage = false;

    this.transformationObj = cvDISConfiguration.hasOwnProperty(viewType) ? cvDISConfiguration[viewType] : {};

    // determine the scaleableImageType that correspoonds with the viewType
    // set the default viewtype if no specific configuration was found
    this.scalableViewType = this.viewType;

    // use the JSON configuration in 'disConfiguration' to determine scaleableImageType
    if (Object.prototype.hasOwnProperty.call(cvDISConfiguration, 'viewTypeMapping') && cvDISConfiguration.viewTypeMapping[this.viewType]) {
        this.scalableViewType = cvDISConfiguration.viewTypeMapping[this.viewType];
    }

    this.scaleableImage = this.imageObject.getImage(this.scalableViewType, this.index);
    // Get the image for the image object if not only test images should be used
    this.image = this.imageObject.getImage(this.viewType, this.index);

    if (!this.image) {
        // there hasn't been a image configured and we fall back to the highres one which needs to be scaled
        this.image = this.scaleableImage;
        this.scaleImage = true;
    }
    this.alt = this.getAlt();
    this.title = this.getTitle();
}

/** ***********************************************************************************************
******************************** API Methods *****************************************************
************************************************************************************************ */

ProductImage.prototype.getURL = function () {
    if (this.imageObject === null) {
        return null;
    }
    return this.getImageURL();
};

ProductImage.prototype.getHttpURL = function () {
    if (this.imageObject === null) {
        return null;
    }
    return this.getImageURL('Http');
};

ProductImage.prototype.getHttpsURL = function () {
    if (this.imageObject === null) {
        return null;
    }
    return this.getImageURL('Https');
};

ProductImage.prototype.getAbsURL = function () {
    if (this.imageObject === null) {
        return null;
    }
    return this.getImageURL('Abs');
};

/**
 * Gets the actual image URL for different API calls.
 *
 * @param {String} imageFunctionID
 */
ProductImage.prototype.getImageURL = function (imageFunctionID) {
    if (this.imageObject === null) {
        return null;
    }
    var imageURL = null;
    var finalStaticFunctionID = imageFunctionID ? (imageFunctionID.toLowerCase() + 'Static') : 'staticURL';
    if (!this.image) {
        // check if test images should be used --> makes sense in cases where the product images haven't yet been configured
        let testImage = null;
        if (cvDISConfiguration.missingImages) {
            if (cvDISConfiguration.missingImages[this.viewType]) {
                testImage = cvDISConfiguration.missingImages[this.viewType];
                this.scaleImage = false;
            }
            if (!testImage && this.scalableViewType !== this.viewType && cvDISConfiguration.missingImages[this.scalableViewType]) {
                testImage = cvDISConfiguration.missingImages[this.scalableViewType];
                this.scaleImage = true;
            }
        }
        if (testImage) {
            if (this.scaleImage) {
                imageURL = URLUtils[imageFunctionID ? (imageFunctionID.toLowerCase() + 'Static') : 'imageURL'](URLUtils.CONTEXT_SITE, Site.current.ID, testImage, this.transformationObj);
            } else {
                imageURL = URLUtils[finalStaticFunctionID](URLUtils.CONTEXT_SITE, Site.current.ID, testImage);
            }
            return this.getFinalUrlAsString(imageURL);
        }
        return URLUtils[finalStaticFunctionID]('/images/noimage' + this.viewType + '.png');
    }
    if (this.scaleImage) {
        return this.getFinalUrlAsString(this.image[imageFunctionID ? ('get' + imageFunctionID + 'ImageURL') : 'getImageURL'](this.transformationObj));
    }
    return this.getFinalUrlAsString(this.image[imageFunctionID ? ('get' + imageFunctionID + 'URL') : 'getURL']());
};

/**
 * If a URL replacement is used it would return the final URL, otherwise the given URL object
 */
ProductImage.prototype.getFinalUrlAsString = function (imageURL) {
    // In case the site preference is set, update the instance used as image source
    let current = imageURL.toString();
    let replacement = Site.current.getCustomPreferenceValue('disImageSourceEnvironment');
    if (replacement && replacement.value) {
        return current.replace(/(^.*_)[a-zA-Z0-9]{3}(\/on\/demandware.*$)/, '$1' + replacement.value + '$2');
    }
    return current;
}

/**
 * Gets the tile for images.
 */
ProductImage.prototype.getTitle = function () {
    if (this.imageObject === null) {
        return null;
    }
    if (this.referenceType === 'ProductVariationAttributeValue' && this.viewType === 'swatch') {
        return this.imageObject.displayValue;
    }
    if (!this.image || !this.image.title) {
        if (cvDISConfiguration.imageMissingText) {
            return cvDISConfiguration.imageMissingText;
        } else if (this.referenceType === 'Product') {
            return this.imageObject.name;
        }
        return this.imageObject.displayValue;
    }
    return this.image.title;
};


/**
 * Gets the alternative text for images.
 */
ProductImage.prototype.getAlt = function () {
    if (this.imageObject === null) {
        return null;
    }
    if (this.referenceType === 'ProductVariationAttributeValue' && this.viewType === 'swatch') {
        return this.imageObject.displayValue;
    }
    if (!this.image || !this.image.alt) {  // same as above
        if (cvDISConfiguration.imageMissingText) {
            return cvDISConfiguration.imageMissingText;
        } else if (this.referenceType === 'Product') {
            return this.imageObject.name;
        }
        return this.imageObject.displayValue;
    }
    return this.image.alt;
};


/**
 * Gets all images for the given view type and image object
 */
ProductImage.prototype.getImages = function () {
    return this.getAllImages();
};

/**
 * Returns a Collection of ProductImage Instances of the productimages assigned for this viewtype.
 */
ProductImage.prototype.getAllImages = function () {
    var result = new ArrayList();
    if (this.imageObject !== null) {
        var images = this.imageObject.getImages(this.scalableViewType);
        // in the case where getImages response is empty, add a new image to handle missing image scenario
        if (images.length === 0) {
            result.add(ProductImage.getImage(this.imageObject, this.viewType, 0));
        }
        for (let i = 0; i < images.length; i++) {
            if (i === this.index) {
                result.add(this);
            } else {
                result.add(ProductImage.getImage(this.imageObject, this.viewType, i));
            }
        }
    }
    return result;
};

/**
* Gets a new Product Image Wrapper object if it hasn't been initialized during the request,
* otherwise the already initialzed version will be returned.
*
* @param {String} viewType Type of view (resolution) that should be generated (required)
* @param {Object} imageObject Product or ProductVariationAttributeValue(required)
* @param {Number} index Position of the image in the list of images for the view type. Defaults to 0 if not provided
*
* @returns {ProductImage} A wrapped image that does not need to be initialized if already created in context of the current request.
*/
ProductImage.getImage = function (imageObject, viewType, index) {
    if (!imageObject || !viewType) {
        return null;
    }
    return new ProductImage(imageObject, viewType, index);
};


/**
* Gets a all images for a given image object
*
* @param {String} viewType Type of view (resolution) that should be generated (required)
* @param {Object} imageObject Product or ProductVariationAttributeValue(required)
*
* @returns {Collection} Collection of images assiciated with the image object and the view type
*/
ProductImage.getImages = function (imageObject, viewType) {
    if (!imageObject || !viewType) {
        return null;
    }
    return ProductImage.getImage(imageObject, viewType, 0).getImages();
};

module.exports = ProductImage;