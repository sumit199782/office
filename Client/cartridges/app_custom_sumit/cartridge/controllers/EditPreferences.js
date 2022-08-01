'use strict';

var server = require('server');
var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');
//in the code below, get the form from the metadata preferences.xml
var preferencesForm = server.forms.getForm('preferences');
// in the code below require the module that provides CSRF protection
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
// in the code below, require the module that provides user verification
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');


server.get('Start',
    // insert specified middleware (Require customer login, enforce the HTTPS protocol, and generate a CSRF token.)
	server.middleware.https,
	userLoggedIn.validateLoggedIn,
	csrfProtection.generateToken,

	function (req, res, next) {
  		// clear the form  

		preferencesForm.clear();		
    // Preload the form with current user selections. 
  		// The first field is done as an example.
		customer.profile.custom.interestApparel==true?preferencesForm.interestApparel.checked="checked":'';
		customer.profile.custom.interestElectronics==true?preferencesForm.interestElectronics.checked="checked":'';
		customer.profile.custom.newsletter==true?preferencesForm.newsletter.checked="checked":'';
		res.render('account/user/editpreferences.isml', {
			preferencesForm: preferencesForm
		});
		next();
	});



server.post('HandleForm',
	// insert specified middleware (make sure that we have https protocol using the middleware server.middleware.https
	server.middleware.https, csrfProtection.validateRequest,
	function (req, res, next) {

		// Persist the data. You will need to update the profile within a Transaction.
		Transaction.begin();
 		//Hint:  customer.profile.custom.interestApparel=preferencesForm.interestApparel.value;   
		customer.profile.custom.interestApparel=preferencesForm.interestApparel.value;
		customer.profile.custom.interestElectronics=preferencesForm.interestElectronics.value;
		customer.profile.custom.newsletter=preferencesForm.newsletter.value;

		Transaction.commit();
    		//redirect user to Account-Show  (use res.redirect(...))
		res.redirect(URLUtils.url('Account-Show'));
	
		next();

	});

module.exports = server.exports();
