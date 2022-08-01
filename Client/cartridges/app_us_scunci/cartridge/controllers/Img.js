'use strict';

/**
 * @namespace About
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var StringUtils = require('dw/util/StringUtils');

var System = require('dw/system/System');
var LinkedHashMap = require('dw/util/LinkedHashMap');
var HttpParameterMap = require('dw/web/HttpParameterMap');
var Request = require('dw/system/Request');
/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Faq-Show : This endpoint is called when a shopper navigates to the Faq page
 * @name Base/About-Show
 * @function
 * @memberof ContentRender
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
        res.render('imgUpload');
    next();

}, pageMetaData.computedPageMetaData);

server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

server.post('Upload', function (req, res, next) { 

    var filename ; 
	var params  = request.getHttpParameterMap();
	var files  = new LinkedHashMap(); //callback function
	var closure  = function(field, ct, oname){ 
		filename = oname; 
		return new File( File.IMPEX + "/" + oname);
		}; 
	files = params.processMultipart(closure);  
    res.print('File Uploaded to IMPEX.');
    next();

});

module.exports = server.exports();
