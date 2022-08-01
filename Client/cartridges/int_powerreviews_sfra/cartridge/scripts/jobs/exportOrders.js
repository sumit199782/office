/**
 * PowerReviews SFRA
 *
 * ExportOrders Job Implementation
 *
 * Processes and exports a CSV in chunk format. Progress can be seen
 * in job run status
 */

var Status = require('dw/system/Status');
var io = require('dw/io');
var File = require('dw/io/File');
var Site = require('dw/system/Site');
var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');
var StringUtils = require('dw/util/StringUtils');
var Calendar = require('dw/util/Calendar');
var Transaction = require('dw/system/Transaction');

var PowerReviews = require('*/cartridge/scripts/lib/libPowerReviews');
var PowerReviewsSFTPService = require('*/cartridge/scripts/lib/powerReviewsSFTPService');

var date;
var orders;
var fileWriter;
var csvWriter;
var libPR;
var destFile;
var customObject;

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
    Transaction.wrap(function () {
        customObject = libPR.getCustomObject();
    });
    date = new Date();

    var libPRConstants = libPR.getConstants();

    var destDir = new File(File.IMPEX + libPRConstants.SRC_FOLDER + libPRConstants.IMPEX_POWERREVIEWS_PATH);
    destDir.mkdirs();

    /* global request */
    if (!request.setLocale(locale)) {
        return new Status(Status.ERROR, 'ERROR', 'Cannot set locale for current site: ' + locale);
    }

    var exportFileName = libPR.getOrderFeedFileName() + libPRConstants.EXTENSION;

    destFile = new io.File(destDir, exportFileName);
    fileWriter = new io.FileWriter(destFile);
    csvWriter = new io.CSVStreamWriter(fileWriter);

    csvWriter.writeNext(['order_id', 'page_id', 'first_name', 'last_name', 'email', 'order_date', 'variant', 'user_id']);

    if (!empty(customObject) && !empty(customObject.custom.PowerReview_Order_LastRun)) {
        orders = OrderMgr.queryOrders('status != {0} and status != {1} and status != {2} and creationDate > {3}', null,
            Order.ORDER_STATUS_FAILED, Order.ORDER_STATUS_CREATED, Order.ORDER_STATUS_CANCELLED,
            customObject.custom.PowerReview_Order_LastRun);
    } else {
        orders = OrderMgr.queryOrders('status != {0} and status != {1} and status != {2}', null,
            Order.ORDER_STATUS_FAILED, Order.ORDER_STATUS_CREATED, Order.ORDER_STATUS_CANCELLED);
    }

    return undefined;
};

exports.getTotalCount = function () {
    return orders.count;
};

exports.read = function () {
    if (orders.hasNext()) {
        return orders.next();
    }
    return undefined;
};

exports.process = function (order) {
    if (!empty(order)) {
        var lines = [];
        var orderLine = [];
        var orderItems = order.getProductLineItems().iterator();

        orderLine[0] = order.orderNo;
        orderLine[2] = order.getBillingAddress().getFirstName();
        orderLine[3] = order.getBillingAddress().getLastName();
        orderLine[4] = order.getCustomerEmail();
        orderLine[5] = StringUtils.formatCalendar(new Calendar(order.getCreationDate()), 'yyyy-MM-dd');
        orderLine[7] = order.getCustomer().isRegistered() ? order.getCustomer().getProfile().getCustomerNo() : '';

        while (orderItems.hasNext()) {
            var product = orderItems.next().getProduct();
            var line = orderLine.slice();

            if (!empty(product)) {
                var masterProductID = product.getID();
                if (product.variant) {
                    masterProductID = product.masterProduct.getID();
                }

                line[1] = masterProductID;
                if (product.variant) {
                    line[6] = product.ID;
                } else {
                    line[6] = '';
                }

                lines.push(line);
            }
        }
        return lines;
    }

    return undefined;
};

exports.write = function (chunk) {
    for (var i = 0; i < chunk.size(); i++) {
        var orderLines = chunk.get(i);
        for (var j = 0; j < orderLines.size(); j++) {
            var orderLine = orderLines.get(j);
            if (!empty(orderLine)) {
                csvWriter.writeNext(orderLine.toArray());
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
    orders.close();

    // Upload to SFTP
    var svc = PowerReviewsSFTPService.get();
    svc.setThrowOnError();
    svc.setOperation('putBinary', [destFile.name, destFile]);
    svc.call();

    destFile.remove();

    Transaction.wrap(function () {
        customObject.custom.PowerReview_Order_LastRun = date;
    });
};
