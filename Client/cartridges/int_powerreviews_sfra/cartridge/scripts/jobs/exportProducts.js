/**
 * PowerReviews SFRA
 *
 * ExportProducts Job Implementation
 *
 * Processes and exports a CSV in chunk format. Progress can be seen
 * in job run status
 */

var Status = require('dw/system/Status');
var catalog = require('dw/catalog');
var io = require('dw/io');
var File = require('dw/io/File');
var log = require('dw/system/Logger').getLogger('powerreviews');
var Site = require('dw/system/Site');
var URLUtils = require('dw/web/URLUtils');
var ArrayList = require('dw/util/ArrayList');

var PowerReviews = require('*/cartridge/scripts/lib/libPowerReviews');
var PowerReviewsSFTPService = require('*/cartridge/scripts/lib/powerReviewsSFTPService');

var products;
var fileWriter;
var csvWriter;
var libPR;
var destFile;

/**
 * Write the header to a csv writer
 *
 * @param {Writer} csvwriter writer instance
 */
function writeHeader(csvwriter) {
    var headers = [];

    headers[0] = 'product_url';
    headers[1] = 'name';
    headers[2] = 'description';
    headers[3] = 'price';
    headers[4] = 'image_url';
    headers[5] = 'category';
    headers[6] = 'manufacturer_id';
    headers[7] = 'brand';
    headers[8] = 'page_id';
    headers[9] = 'upc';
    headers[10] = 'in_stock';
    headers[11] = 'add_to_cart_url';
    headers[12] = 'page_id_variant';
    csvwriter.writeNext(headers);
}

/**
 * Initialize readers and writers for job processing
 * @param {Object} parameters job parameters
 * @param {JobStepExecution} stepExecution job step execution
 * @returns {Status} if error returns status
 */
exports.beforeStep = function (parameters) {
    var locale = parameters.locale;
    if (empty(locale)) {
        locale = Site.current.defaultLocale;
    }
    libPR = new PowerReviews(locale);
    var libPRConstants = libPR.getConstants();
    var localeFName = (locale === 'default') ? '_' + libPR.getMappedLocale() : '_' + locale;

    var destDir = new File(File.IMPEX + libPRConstants.SRC_FOLDER + libPRConstants.IMPEX_POWERREVIEWS_PATH);
    destDir.mkdirs();

    /* global request */
    if (!request.setLocale(locale)) {
        return new Status(Status.ERROR, 'ERROR', 'Cannot set locale for current site: ' + locale);
    }

    var exportFileName = libPR.getFeedFileName() + localeFName + libPRConstants.EXTENSION;
    destFile = new io.File(destDir, exportFileName);
    fileWriter = new io.FileWriter(destFile);
    csvWriter = new io.CSVStreamWriter(fileWriter);

    products = catalog.ProductMgr.queryAllSiteProducts();

    writeHeader(csvWriter);

    return undefined;
};

exports.getTotalCount = function () {
    return products.count;
};

exports.read = function () {
    if (products.hasNext()) {
        return products.next();
    }
    return undefined;
};

/**
 * Get categories as string
 *
 * @param {Array} categories list of categories
 * @return {string} concatted version
 */
function getCategories(categories) {
    var separator = libPR.getCategorySeparator().toString();
    var category = categories.isEmpty() ? new ArrayList() : categories[0];
    var categoryList = new ArrayList();

    while (!empty(category)) {
        if ((!empty(category.displayName)) && category.ID !== 'root') {
            categoryList.add(category.displayName);
            category = category.parent;
        } else {
            category = null;
        }
    }

    categoryList.reverse();
    return categoryList.join(' ' + separator + ' ');
}

/**
 * Get product record as list
 *
 * @param {Product} product the product
 * @return {Array} list of product columns
 */
function getProductRecord(product) {
    var libPRConstants = libPR.getConstants();

    var values = [];
    var image;
    var isInStock;

    image = product.getImage(libPRConstants.IMAGE_SIZE);
    isInStock = product.getAvailabilityModel().availabilityStatus.equals(libPRConstants.IN_STOCK);
    // name - product name - REQUIRED
    values[1] = product.getName();
    // description - description of the product, as it appears on merchant site - REQUIRED
    values[2] = !empty(product.getLongDescription()) ? product.getLongDescription().markup : '';
    // price - current selling price - REQUIRED
    values[3] = product.getPriceModel().getPrice().value;
    // manufacturer_id - manufacturer model number - PREFERRED
    values[6] = product.getManufacturerSKU();
    // brand - product brand - REQUIRED
    values[7] = product.getBrand();
    // upc - PREFERRED
    values[9] = product.getUPC();
    // page_id_product - pr_page_id_product (defined in the product page source code) - this is used when there are variations of a product under one page_id, like color or size differences - IF APPLICABLE
    if (product.variant) {
        values[12] = product.getID();
    } else {
        values[12] = '';
    }

    if (!image) {
        if (!empty(product.variants) && product.variants[0]) {
            var variantImage = null;

            for (var i = 0; i < product.variants.length; i++) {
                var defaultVariant = product.variants[i];
                variantImage = defaultVariant.getImage('hero');
                if (variantImage !== null) {
                    break;
                }
            }

            if (variantImage !== null) {
                image = variantImage;
            }
        }
    }

    try {
        var masterProductID = product.getID();
        if (product.variant) {
            masterProductID = product.masterProduct.getID();
        }

        values[0] = URLUtils.https('Product-Show', 'pid', masterProductID);
        values[1] = values[1].replace(new RegExp(/\r?\n|\r/g));
        values[2] = values[2].replace(new RegExp(/\r?\n|\r/g));
        // image_url - link to the product image, preferably at least 500x500 - REQUIRED
        values[4] = (!empty(image) ? image.httpURL : '');
        // category - product category with sub-categories separated by '>' - REQUIRED
        if (product.variant) {
            values[5] = getCategories(product.masterProduct.getCategories());
        } else {
            values[5] = getCategories(product.getCategories());
        }
        // page_id - pr_page_id (defined in the product page source code) - REQUIRED
        values[8] = masterProductID;

        // in stock - stock status of the product - REQUIRED
        values[10] = (isInStock) ? libPRConstants.IN_STOCK_TRUE : libPRConstants.IN_STOCK_FALSE;
        // add_to_cart_url - link to add the product to customer cart - PREFERRED
        values[11] = URLUtils.https(libPRConstants.ADD_TO_CART_PIPELINE, libPRConstants.PRODUCT_ID_PARAM, product.getID()).toString();
    } catch (e) {
        log.error(e);
        return null;
    }
    return values;
}

exports.process = function (product) {
    if (product.isOnline() && !product.isVariant()) {
        var productLines = [];
        productLines.push(getProductRecord(product));

        var variants = product.getVariants().iterator();
        while (variants.hasNext()) {
            var variant = variants.next();
            productLines.push(getProductRecord(variant));
        }
        return productLines;
    }
    return undefined;
};

exports.write = function (chunk) {
    for (var i = 0; i < chunk.size(); i++) {
        var productLines = chunk.get(i);
        for (var j = 0; j < productLines.size(); j++) {
            var product = productLines.get(j);
            if (!empty(product)) {
                csvWriter.writeNext(product.toArray());
            }
        }
    }
};

exports.afterChunk = function () {
    fileWriter.flush();
};

exports.afterStep = function () {
    csvWriter.close();
    fileWriter.close();
    products.close();

    // Upload to SFTP
    var svc = PowerReviewsSFTPService.get();
    svc.setThrowOnError();
    svc.setOperation('putBinary', [destFile.name, destFile]);
    svc.call();

    destFile.remove();
};
