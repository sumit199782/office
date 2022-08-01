/* global request session empty */
/* eslint no-underscore-dangle: 0 */
'use strict';

// API
var Logger = require('dw/system/Logger').getLogger('kount', 'LibKount');
var ExtendedLogger = require('dw/system/Logger').getLogger('ext_kount', 'ext_LibKount');
var Site = require('dw/system/Site').current;
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var Mail = require('dw/net/Mail');
var ObjectAttributeDefinition = require('dw/object/ObjectAttributeDefinition');
var Resource = require('dw/web/Resource');
var StringUtils = require('dw/util/StringUtils');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Calendar = require('dw/util/Calendar');

// scripts
var constants = require('*/cartridge/scripts/kount/kountConstants');
var RiskService = require('*/cartridge/scripts/kount/postRiskInqueryService');
var UpdateOrder = require('*/cartridge/scripts/kount/updateOrder');
var KountUtils = require('*/cartridge/scripts/kount/kountUtils');
var kountService = require('*/cartridge/scripts/init/initKount');
var KHash = require('*/cartridge/scripts/kount/kHash');
var ipaddr = require('*/cartridge/scripts/kount/ipAddr');

// Constants
var authType = constants.RISK_WORKFLOW_TYPE;

/**
 * @description Return risk service url based on kount_MODE configuration
 * @returns {string} Risk service url
 */
function _getRISUrl() {
    return Site.getCustomPreferenceValue('kount_MODE').value === 'Test' ? constants.RIS_TEST_URL : constants.RIS_PRODUCTION_URL;
}

/**
 * @description Returns ip filter list confiigured for site
 * @returns {string} IP filter list
 */
function _getIPList() {
    return Site.getCustomPreferenceValue('kount_IPFilter') || '';
}

/**
 * @description Resets kount session
 */
function _clearSession() {
    session.privacy.kount_TRAN = null;
}

/**
 * @description Returns emails to send notifications to
 * @returns {string[]} notification email list
 */
function _getNotificationEmailList() {
    return Site.getCustomPreferenceValue('kount_NotificationEmail') || [];
}

/**
 * @description Returns configured kount API key
 * @returns {string} API key
 */
function _getAPIKey() {
    return Site.getCustomPreferenceValue('kount_APIKey');
}


/**
 * @description Returns if kount is enabled for current site
 * @returns {boolean} Kount enabled
 */
function isKountEnabled() {
    return Boolean(Site.getCustomPreferenceValue('kount_IsEnabled'));
}


/**
 * @description Get url for data collector based on site configuration
 * @returns {string} URL for data collector
 */
function getDCUrl() {
    return Site.getCustomPreferenceValue('kount_MODE').value === 'Test' ? constants.DC_TEST_URL : constants.DC_PRODUCTION_URL;
}


/**
 * @description Returns configured WebsiteId for current site. This should match the id configured in Websites section in Kount agent console
 * @return {string} WebsiteID
 */
function getWebsiteID() {
    return Site.getCustomPreferenceValue('kount_WebsiteId') || '';
}

/**
 * @description Returns configured Merchant ID for current site
 * @return {string} Merchant ID
 */
function getMerchantID() {
    return Site.getCustomPreferenceValue('kount_MerchantID') || '';
}


/**
 * @description Returns whether Event Notification System is enabled for current site
 * @return {boolean} ENS Enabled
 */
function isENSEnabled() {
    return Boolean(Site.getCustomPreferenceValue('kount_ENS'));
}


/**
 * @description Returns configured email list for current site
 * @return {string} Email list
 */
function getEmailList() {
    return Site.getCustomPreferenceValue('kount_EmailList') || '';
}

/**
 * @description Returns whether Kount is currently configured in SFRA mode
 * @return {boolean} SFRA Mode Enabled
 */
function isSFRA() {
    return Boolean(Site.getCustomPreferenceValue('kount_isSFRA'));
}

/**
 * @description Return notification email address
 * @return {string} notification email
 */
function getNotificationEmail() {
    return Resource.msg('kount.noemail', 'kount', null);
}

/**
 * @description Return whether example verification is enabled for current site
 * @return {boolean} Example Verifications Enabled
 */
function isExampleVerificationsEnabled() {
    return Boolean(Site.getCustomPreferenceValue('kount_ExampleVerificationsEnabled'));
}

/**
 * @description Check IP against ip list filtering, returns true if data collector should be shown, ip address wasn't filtered
 * @param {string} IP ip address
 * @return {boolean} show data collector
 */
function filterIP(IP) {
    var listIP = _getIPList();
    var status = false;

    if (listIP.indexOf(IP) !== -1) {
        status = true;
    }
    return status;
}

/**
 *	@description Method that sends email notification about errors
 *	@param {string} msg Error message
 */
function sendEmailNotification(msg) {
    var template = new Template('mail/errornotification');
    var templateMap = new HashMap();
    var mailMsg = new Mail();
    var siteName = Site.getName();

    templateMap.put('ErrorName', 'Error during execution');
    templateMap.put('SiteName', siteName);
    templateMap.put('ErrorDescription', msg);

    mailMsg.addTo(_getNotificationEmailList().join(','));
    mailMsg.setFrom('noreply@kount.net');
    mailMsg.setSubject('Error during execution');
    mailMsg.setContent(template.render(templateMap));

    mailMsg.send();
}


/**
 *	@description Method that write ERRORs in execution
 *	@param {Error} error object
 *	@param {string} actionName Name of method
 *	@param {string} type of error
 */
function writeExecutionError(error, actionName, type) {
    var message = typeof error === 'object' ? error.message : error;
    var errorString;

    switch (type) {
        case 'error':
            errorString = Resource.msgf('error.exeption', 'error', null, actionName || 'Exception', 'ERROR', message).replace(new RegExp(/(?!<")\/[^]+\/(?!")/g), '');
            Logger.error(errorString, '');
            if (!empty(_getNotificationEmailList())) {
                sendEmailNotification(errorString);
            } else {
                writeExecutionError(new Error('Email List is empty'), 'writeExecutionError', 'warn');
            }
            break;
        case 'warn':
            errorString = Resource.msgf('error.exeption', 'error', null, actionName || 'Exception', 'WARN', message);
            Logger.warn(errorString, '');
            break;
        default:
            errorString = Resource.msgf('error.exeption', 'error', null, actionName || 'Exception', 'INFO', message).replace(new RegExp(/(?!<")\/[^]+\/(?!")/g), '');
            Logger.info(errorString, '');
    }
}

/**
 * @description Makes POST request. Sends orders details for evaluating
 * @param {Object} RequiredInquiryKeysVal Payload to send to Kount risk service
 * @returns {Object} Object parsed response or empty object (if an error occurred)
 */
function postRISRequest(RequiredInquiryKeysVal) {
    var	body = {};
    var status = {};
    var httpResult;

    kountService.setURL(_getRISUrl());
    kountService.addHeader('X-Kount-Api-Key', _getAPIKey());

    for (var key in RequiredInquiryKeysVal) { //eslint-disable-line
        try {
            var param = !empty(RequiredInquiryKeysVal[key]) ? RequiredInquiryKeysVal[key] : '';
            if (typeof param === 'object' && !empty(param)) {
                if (key === 'UDF') {
                    for (var i = 0; i < param.length; i++) {
                        body[key + '[' + param[i].label + ']'] = param[i].value;
                    }
                } else if (key === 'UAGT') {
                    var j = 0;
                    for (var itemHeader in param) { //eslint-disable-line
                        body[key + '[' + j + ']'] = itemHeader;
                        j++;
                    }
                } else {
                    for (var k = 0; k < param.length; k++) {
                        body[key + '[' + k + ']'] = param[k];
                    }
                }
            } else if (!empty(param)) {
                body[key] = param;
            }
        } catch (err) {
            writeExecutionError(err, 'PostRISRequest', 'error');
            throw err;
        }
    }

    httpResult = kountService.call(body);
    if (httpResult.ok) {
        status = httpResult.object;
        return status;
    }
    status = { AUTO: 'F' };
    writeExecutionError(httpResult.errorMessage, 'PostRISRequest', 'error');
    return status;
}

/**
 *	@description Method that write response ERRORs
 *	@param {Object} response Response from request
 *	@param {string} method Name of method
 *	@param {string} type Type of error
 */
function writeServiceError(response, method, type) {
    var errorParam = type + 'COUNT';
    var errorArray = [];
    if (!empty(response) && errorParam in response) {
        var count = response[errorParam];
        for (var i = 0; i < count; i++) {
            var errorNumber = type + i;
            if (errorNumber in response) {
                errorArray.push(response[errorNumber]);
            }
        }
        switch (type) {
            case 'ERROR_':
                writeExecutionError(new Error(errorArray.join(';')), method, 'error');
                break;
            case 'WARNING_':
                writeExecutionError(new Error(errorArray.join(';')), method, 'warn');
                break;
            default:
                writeExecutionError(new Error(errorArray.join(';')), method, 'warn');
                break;
        }
    }
}

/**
 * @description Add warning and error messages to log and returns Kount order status
 * Status APPROVED sents by-default if Kount response contains error messages
 *
 * @param {Object} params Object response from Kount
 * @return {string} Kount status
 */
function evaluateRISResponse(params) {
    var status = 'APPROVED';
    var responseCode = params.AUTO;
    var statusMap = { A: 'APPROVED', D: 'DECLINED', R: 'HOLD', E: 'HOLD', F: 'RETRY' };

    if ('ERRO' in params) {
        writeServiceError(params, 'evaluateRISResponse', 'ERROR_');
        if (params.MODE == 'E' && params.ERROR_COUNT == 1 && params.ERRO == 601) { //eslint-disable-line
            status = 'RETRY';
        }
        return status;
    }
    if ('WARNING_0' in params) {
        writeServiceError(params, 'evaluateRISResponse', 'WARNING_');
    }
    return statusMap[responseCode];
}

/**
 *	@description Method that write responses ERRORs
 *	@param {Stirng} response Response from request
 *	@return {boolean} Show status if it is a plain text response
 */
function plainTextHandler(response) {
    var status = true;
    if (response.indexOf('\n') !== -1) {
        var responseArray = response.split('\n');
        var errorArray = [];
        for (var i = 0; i < responseArray.length - 1; i++) {
            if (responseArray[i].indexOf('ERROR_') !== -1 && responseArray[i].indexOf('ERROR_COUNT') === -1) {
                errorArray.push(responseArray[i]);
            }
        }
        writeExecutionError(new Error(errorArray.join(';')), 'plainTextHandler', 'error');
    } else {
        status = false;
    }

    return status;
}

/**
 *	@description Returns value on object
 *	@param {Object} attribute Attribute configuration
 *	@param {Object} object Order
 *	@param {string} propertyName value of attribute
 *	@returns {Object} value of field on object
 */
function getUDFValue(attribute, object, propertyName) {
    if (!attribute.multiValueType && attribute.system) {
        return object[propertyName];
    } else if (!attribute.multiValueType && !attribute.system) {
        return object.custom[propertyName];
    }
    return null;
}

/**
 *	@description Method creates UDF fields for request
 *	@param {Object} meta UDF map
 *	@param {Object} object Described object
 *	@param {string} propertyName Attributes name
 * 	@returns {Object} value of UDF field
 */
function getUDFFieldValue(meta, object, propertyName) {
    var attribute = meta.getSystemAttributeDefinition(propertyName) || meta.getCustomAttributeDefinition(propertyName);
    var value = '';

    if (!empty(attribute)) {
        switch (attribute.valueTypeCode) {
            case ObjectAttributeDefinition.VALUE_TYPE_DATE:
                value = getUDFValue(attribute, object, propertyName);
                if (!empty(value)) {
                    value = StringUtils.formatCalendar(new Calendar(value), 'yyyy-MM-dd');
                } else {
                    value = '';
                }

                break;
            case ObjectAttributeDefinition.VALUE_TYPE_DATETIME:
                value = getUDFValue(attribute, object, propertyName);
                if (!empty(value)) {
                    value = StringUtils.formatCalendar(new Calendar(value), 'yyyy-MM-dd');
                } else {
                    value = '';
                }
                break;
            case ObjectAttributeDefinition.VALUE_TYPE_BOOLEAN:
                break;
            case ObjectAttributeDefinition.VALUE_TYPE_PASSWORD:
                break;
            default:
                value = getUDFValue(attribute, object, propertyName);
                if (empty(value)) {
                    value = '';
                }
        }
    }
    return value;
}

/**
 *	@description Method creates UDF fields for request
 *	@param {Order} order Order for risk call
 *	@return {HashMap} mapped object for UDF
 */
function getUDFObjectMap(order) {
    var UDFMap = new HashMap();
    var shippingAddress = order.getDefaultShipment().getShippingAddress();
    var billingAddress = order.getBillingAddress();
    var profile = order.getCustomer().getProfile();

    UDFMap.put('shippingaddress', {
        // fix for gift certificate purchase
        meta: shippingAddress ? shippingAddress.describe() : '',
        object: shippingAddress
    });
    UDFMap.put('billingaddress', {
        meta: billingAddress.describe(),
        object: billingAddress
    });
    if (!empty(profile)) {
        UDFMap.put('profile', {
            meta: profile.describe(),
            object: profile
        });
    }
    UDFMap.put('order', {
        meta: order.describe(),
        object: order
    });

    return UDFMap;
}

/**
 *	@description Method creates UDF fields for request
 *	@param {Order} order Order
 *	@return {Array} return UDF array with structure lable : value
 */
function getUDFFields(order) {
    var fields = Site.getCurrent().getCustomPreferenceValue('kount_UDF') || [];
    var UDF = [];
    var UDFMap = getUDFObjectMap(order);

    try {
        if (!empty(fields)) {
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i].split('|');

                field[0] = StringUtils.trim(field[0]);
                field[1] = StringUtils.trim(field[1]).split('.');
                if (!empty(field[1][1])) {
                    var mapObject = UDFMap.get(field[1][0].toLowerCase());
                    var value = !empty(mapObject) ? getUDFFieldValue(mapObject.meta, mapObject.object, field[1][1]) : '';
                    if (!empty(value)) {
                        UDF.push({
                            label: field[0],
                            value: value
                        });
                    }
                } else {
                    writeExecutionError(new Error("UDF field doesn't setup correctly: " + fields[i]), 'getUDFFields', 'error');
                }
            }
        }
    } catch (e) {
        writeExecutionError(e, 'getUDFFields', 'error');
    }
    return UDF;
}

/**
 * @description Call Kount with data from DataCollector and custom order data
 * @param {Order} order order for risk call
 * @param {boolean} isSfra whether sfra mode should be used
 * @param {boolean} isPreRiskCall whether this is a pre risk call
 * @returns {Object} risk result
 * @constructor
 */
function postRIS(order, isSfra, isPreRiskCall) {
    var serviceData = {};
    var hashedCCNumber = '';
    var creditCardNumber;
    var last4 = '';
    if (isSfra) {
        // get credit card number from billing form
        var card=session.getCustom();
        var st=0;
        creditCardNumber = session.forms.billing.creditCardFields.cardNumber.value || card.cardNumber;
        last4 = '';

        if (session.customer.authenticated
            && (creditCardNumber == null)	// if using saved credit card
            && order.custom.kount_KHash		// and hash is already in order custom attribute
        ) {
            hashedCCNumber = order.custom.kount_KHash;	// use saved hash
            var paymentInstruments = session.customer.profile.wallet.paymentInstruments;
            var array = require('*/cartridge/scripts/util/array');
            var paymentInstrument = array.find(paymentInstruments, function (item) {
                return hashedCCNumber === item.custom.kount_KHash;
            });
            last4 = paymentInstrument ? paymentInstrument.creditCardNumber.substr(paymentInstrument.creditCardNumber.length - 4) : '';
        } else if (creditCardNumber) {
            last4 = creditCardNumber.substr(creditCardNumber.length - 4);
            hashedCCNumber = KHash.hashPaymentToken(creditCardNumber);	// else hash CC number from form
        }
        // set serviceData
        serviceData = {
            SessionID: session.privacy.sessId,
            Email: order.customerEmail,
            PaymentType: session.forms.billing.paymentMethod.value,
            CreditCard: {
                HashedCardNumber: hashedCCNumber,
                Last4: last4
            },
            CurrentRequest: request,
            Order: order,
            OrderID: order.orderNo
        };
    } else {
    	var orderNo=null;
    	try{orderNo=order.orderNo}catch(e){}
        creditCardNumber = session.forms.billing.paymentMethods.creditCard.number.value;
        last4 = creditCardNumber ? creditCardNumber.substr(creditCardNumber.length - 4) : '';
        hashedCCNumber = KHash.hashPaymentToken(creditCardNumber);	// hash CC number from form
        serviceData = {
            SessionID: session.privacy.sessId,
            Email: session.forms.billing.billingAddress.email.emailAddress.htmlValue,
            PaymentType: session.forms.billing.paymentMethods.selectedPaymentMethodID.htmlValue,
            CreditCard: {
                HashedCardNumber: hashedCCNumber,
                Last4: last4
            },
            CurrentRequest: request,
            Order: order,
            OrderID: orderNo
        };
    }
    var riskResult = RiskService.init(serviceData, isPreRiskCall);

    UpdateOrder.init(order, riskResult, hashedCCNumber, session.privacy.sessId);

    return riskResult;
}

/**
 * @description Call Kount with data from DataCollector and custom order data
 * @param {Order} order order for risk call
 * @param {boolean} isSfra whether sfra mode should be used
 * @returns {Object} risk result
 */
function preRiskCall(order, isSfra) {
	_clearSession();
    var data = order;
    if (isKountEnabled() && authType === constants.RISK_WORKFLOW_TYPE_PRE) {
        try {
            var result = postRIS(data, isSfra, true);
            if (!empty(result.KountOrderStatus) && result.KountOrderStatus === 'DECLINED') {
                ExtendedLogger.error('KOUNT: Invalid pre risk call response for order "' + order.orderNo + '"\n' + JSON.stringify(result, null, 4));
                return {
                    KountOrderStatus: result.KountOrderStatus,
                    error: true
                };
            }
            session.privacy.kount_TRAN = result.responseRIS && result.responseRIS.TRAN;
            return result;
        } catch (e) {
            Logger.error('ERROR: ' + e.message + '\n' + e.stack);
            ExtendedLogger.error('KOUNT: Pre risk error: ' + e.message + '\n' + e.stack);
            writeExecutionError(String(e.stack), 'preRiskCall', 'error');
            return undefined;
        }
    }
    return undefined;
}
/**
 * @description Simulate address verification and card verification
 * @param {Order} ord Order for risk call
 * @returns {void}
 */
function simulateVerifications(ord) {
    var order = ord;
    if (isExampleVerificationsEnabled()) {
        Transaction.wrap(function () {
            order.custom.kount_AVST = request.httpParameterMap.kountTestAVST ? request.httpParameterMap.kountTestAVST.value : 'X';
            order.custom.kount_AVSZ = request.httpParameterMap.kountTestAVSZ ? request.httpParameterMap.kountTestAVSZ.value : 'X';
            order.custom.kount_CVVR = request.httpParameterMap.kountTestCVVR ? request.httpParameterMap.kountTestCVVR.value : 'X';
        });
    }
}

/**
 * @description Run RISK workflow. Triggered by COBilling controller
 * @param {Function} paymentCallback Function that runs handlePayments
 * @param {Order} order Order Object
 * @param {boolean} isSfra Whether to use SFRA mode
 * @returns {Object} result of risk call
 */
function postRiskCall(paymentCallback, order, isSfra) {
    if (isKountEnabled()) {
        try {
            simulateVerifications(order);
            var orderNo = isSfra ? order.orderNo : undefined;
            var paymentResult = paymentCallback(order, orderNo);
            var params = {};
            if (constants.RISK_WORKFLOW_TYPE === constants.RISK_WORKFLOW_TYPE_POST && paymentResult && paymentResult.error) {
                params = KountUtils.extend({}, paymentResult);
            } else {
                params = KountUtils.extend(postRIS(order, isSfra, false), paymentResult);
            }
            if (!empty(params.KountOrderStatus) && params.KountOrderStatus === 'DECLINED') {
                ExtendedLogger.error('KOUNT: Invalid post risk call response for order "' + order.orderNo + '"\n' + JSON.stringify(params, null, 4));
                params = {
                    KountOrderStatus: params.KountOrderStatus,
                    error: true
                };
            }
            return params;
        } catch (e) {
            ExtendedLogger.error('KOUNT: Post risk error: ' + e.message + '\n' + e.stack);
        }
    }
    writeExecutionError(new Error('KOUNT: K.js: Kount is not enabled'), 'PostRIS', 'info');
    _clearSession();
    return paymentCallback(order);
}

/**
 *	@description Method creates UDF fields for request
 *	@param {Collection} payments Payments on Order
 *	@return {Payment} First Payment method
 */
function getPayment(payments) {
    var payment;
    if (payments.length > 1) {
        var iterator = payments.iterator();
        while (!empty(iterator) && iterator.hasNext()) {
            payment = iterator.next();

            // Kount doesn't support multipayments so only first acceptable will be used
            if (payment.getPaymentMethod() == 'CREDIT_CARD' || 'PayPal' == payment.getPaymentMethod() || 'GIFT_CERTIFICATE' == payment.getPaymentMethod()) { //eslint-disable-line
                return payment;
            }
        }
        return payment;
    }
    return !empty(payments) ? payments[0] : false;
}

/**
 *	@description Gets session iframe
 *	@param {string} sessionIframe SFCC session ID
 *	@param {string} basketUUID SFCC basket UUID
 *	@return {string} sessionId to send to kount
 */
function getSessionIframe(sessionIframe, basketUUID) {
    var sessionId = sessionIframe.substr(0, 24).replace('-', '_', 'g') + basketUUID.substr(0, 8).replace('-', '_', 'g');
    session.privacy.sessId = sessionId;
    return sessionId;
}

/**
 * Add to appropriate Order note with ENS event data
 * @param {Array} ensEventsList - list of ENS event objects
 * @param {string} ensRecordXml - kount request body
 */
function storeENSRecordInOrder(ensEventsList, ensRecordXml) {
    var OrderMgr = require('dw/order/OrderMgr');
    var Transaction = require('dw/system/Transaction');
    var storeRecord = Site.getCustomPreferenceValue('storeKountENSRecord');
    if (!storeRecord) { return; }

    Transaction.wrap(function () {
        ensEventsList.forEach(function (event) {
            var order = OrderMgr.getOrder(event.orderNo);
            if (!empty(order)) {
                try {
                    order.addNote('Kount ENS record', ensRecordXml);
                } catch (e) {
                    Logger.error('ERROR: ' + e.message + '\n' + e.stack);
                }
            }
        });
    });
}

/**
 *	@description Creates custom objects for ens event batches
 *	@param {string} requestBody Body from ENS webhook request from Kount
 */
function queueENSEventsForProcessing(requestBody) {
    try {
        var result = KountUtils.parseEnsXMLtoObject(requestBody);
        Transaction.wrap(function () {
            var ensRecord = CustomObjectMgr.createCustomObject('KountENSQueue', require('dw/util/UUIDUtils').createUUID());
            ensRecord.custom.ensResponseBody = JSON.stringify(result);
        });
        storeENSRecordInOrder(result, requestBody);
    } catch (e) {
        Logger.error('ERROR: ' + e.message + '\n' + e.stack);
        writeExecutionError(new Error('KOUNT: K_ENS.js: Error when parsing ENS xml'), 'EventClassifications', 'error');
        throw e;
    }
}

/**
 *	@description Validates ip against configured CIDR range. This is used to protect ENS endpoint and restrict to only calls from Kount
 *	@param {string} ip The ip address to validate
 *	@returns {boolean} True if ip is valid, false if it is not
 */
function validateIpAddress(ip) {
    var ipRange = Site.getCustomPreferenceValue('kount_IP_RANGE');
    if (!ipRange) {
        return true;
    }
    try {
        var parsedIp = ipaddr.parse(ip);
        var ranges = ipRange.split(',');
        return ranges.some(function (range) {
            return parsedIp.match(ipaddr.parseCIDR(range));
        });
    } catch (e) {
        Logger.error('Error parsing Kount IP Range for ENS filtering: ' + e.message + '\n' + e.stack);
        return false;
    }
}

module.exports = {
    filterIP: filterIP,
    postRISRequest: postRISRequest,
    evaluateRISResponse: evaluateRISResponse,
    writeExecutionError: writeExecutionError,
    writeServiceError: writeServiceError,
    plainTextHandler: plainTextHandler,
    sendEmailNotification: sendEmailNotification,
    getUDFFields: getUDFFields,
    preRiskCall: preRiskCall,
    simulateVerifications: simulateVerifications,
    postRiskCall: postRiskCall,
    getUDFFieldValue: getUDFFieldValue,
    getUDFValue: getUDFValue,
    getUDFObjectMap: getUDFObjectMap,
    getPayment: getPayment,
    getSessionIframe: getSessionIframe,
    isSFRA: isSFRA,
    getNotificationEmail: getNotificationEmail,
    getEmailList: getEmailList,
    getMerchantID: getMerchantID,
    getWebsiteID: getWebsiteID,
    isKountEnabled: isKountEnabled,
    getDCUrl: getDCUrl,
    isENSEnabled: isENSEnabled,
    isExampleVerificationsEnabled: isExampleVerificationsEnabled,
    queueENSEventsForProcessing: queueENSEventsForProcessing,
    validateIpAddress: validateIpAddress,
    storeENSRecordInOrder: storeENSRecordInOrder
};
