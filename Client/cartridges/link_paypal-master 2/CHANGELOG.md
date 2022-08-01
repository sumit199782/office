CHANGELOG
=========
## 18.3.1
* SFRA support up to 4.2.1 and SG up to 104.3.1
## 19.1.1
* Update SFRA support up to 4.4.1
* Remove `Retrieve Billing Address From PayPal` preference, now it required for checkout from cart
* fix [PayPal breaks support for custom price adjustments](https://github.com/SalesforceCommerceCloud/link_paypal/issues/15)
* fix [Cart - Cannot remove products](https://github.com/SalesforceCommerceCloud/link_paypal/issues/5)
* fix [Removing only PayPal payment instrument allow to call multiple authorizations](https://github.com/SalesforceCommerceCloud/link_paypal/issues/7)
* fix [Default API error messages not showing on checkout process](https://github.com/SalesforceCommerceCloud/link_paypal/issues/11)
* fix [shippingSummary.isml customization is no longer needed](https://github.com/SalesforceCommerceCloud/link_paypal/issues/4)
## 20.1.0
* Rewrite cartrtridge to use REST API instead of NVP
## 20.1.1
* Add Alternative Payment Methods support
* Add 5.0.1 SFRA support
## 20.1.2
* Bugfixing
* Add BM module for smart button and credit banners configuration
* Add ability to create/remove Billing Agreement from My Account
## 21.1.0
* Billing agreement will be created for both guest/registered user in it enabled in BM
* Test integration with GiftCertificate
* Add PayPal button to PDP and minicart pages
* Add 5.1.0 SFRA support
## 21.1.1
* Add 5.3.0 SFRA support
* fix typo in addressHelper.js shippingAddress.address1 -> shippingAddress.address2 
## 21.2.0
* Business Manager modules refactoring
* Add Pay with Venmo feature (ability to pay with Venmo) 
* Add Connect With PayPal feature
* Add PAYMENT.AUTHORIZATION.VOIDED\COMPLETED\REFUNDED webhooks
* Fix issue https://github.com/SalesforceCommerceCloud/link_paypal/issues/48
* Add new Custom Site Preference (PP_WH_Authorization_And_Capture_Id) for webhook feature
* Add new Custom Site Preference (PP_Connect_With_Paypal_Button_Url) for Connect with PayPal feature
## 21.2.0
* Make compatible with SFRA 6.0