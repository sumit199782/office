'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
function storeNewsletterObject(newsletterForm) {
    
     // 7-2 Add code to create the custom object with CustomObject type "NewsletterSubscription and primiary key as email from "newsletterform"
     var CustomObject =  CustomObjectMgr.createCustomObject('NewsLetterSubscription', newsletterForm.email.value);
     
      // 7-2 Add code to feed data from the form to the custom object
      //7-2 Hint: CustomObject.custom.firstName = newsletterForm.fname.value;
     CustomObject.custom.firstName = newsletterForm.fname.value;
     CustomObject.custom.lastName = newsletterForm.lname.value;
     CustomObject.custom.promo = newsletterForm.promo.value;
     //7-6 Add code to create a custom object attribute for the promo opt-in
                        return CustomObject;

}

module.exports = {storeNewsletterObject: storeNewsletterObject}; 