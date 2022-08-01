
import FormField = require('dw/web/FormField')
import FormGroup = require('dw/web/FormGroup');
import FormAction = require('dw/web/FormAction');
// autogeneratedfile

/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coRegisteredCustomer.xml#2)*/
declare class FormCoRegisteredCustomer extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coRegisteredCustomer.xml#4) */
	email : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coRegisteredCustomer.xml#16) */
	password : FormField<string>
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/states.xml#2)*/
declare class FormStates extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/states.xml#3) */
	stateCode : FormField<string>
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/newPasswords.xml#2)*/
declare class FormNewPasswords extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/newPasswords.xml#3) */
	newpassword : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/newPasswords.xml#13) */
	newpasswordconfirm : FormField<string>
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#2)*/
declare class FormCreditCard extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#5) */
	editNumber : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#12) */
	paymentMethod : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#14) */
	cardType : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#17) */
	cardNumber : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#20) */
	cardOwner : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#23) */
	expirationMonth : FormField<number>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#42) */
	expirationYear : FormField<number>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#49) */
	securityCode : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#52) */
	saveCard : FormField<boolean>
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#2)*/
declare class FormAddress extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#4) */
	addressId : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#6) */
	firstName : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#8) */
	lastName : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#10) */
	address1 : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#12) */
	address2 : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#14) */
	city : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#18) */
	postalCode : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#26) */
	country : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#34) */
	states : FormStates
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#37) */
	phone : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#45) */
	secondaryPhone : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#55) */
	apply : FormAction
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#56) */
	remove : FormAction
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coCustomer.xml#2)*/
declare class FormCoCustomer extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coCustomer.xml#4) */
	email : FormField<string>
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#2)*/
declare class FormBilling extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#4) */
	shippingAddressUseAsBillingAddress : FormField<boolean>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#7) */
	addressFields : FormAddress
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#9) */
	contactInfoFields : FormContactInfo
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#11) */
	paymentMethod : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#13) */
	creditCardFields : FormCreditCard
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#15) */
	subscribe : FormField<boolean>
}
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#2)*/
declare class FormProfileCustomer extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#4) */
	firstname : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#13) */
	lastname : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#22) */
	email : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#35) */
	emailconfirm : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#48) */
	phone : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#57) */
	addtoemaillist : FormField<boolean>
}
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#2)*/
declare class FormProfileLogin extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#64) */
	password : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#75) */
	passwordconfirm : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#86) */
	currentpassword : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#96) */
	newpasswords : FormNewPasswords
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#2)*/
declare class FormProfile extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#3) */
	customer : FormProfileCustomer
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#63) */
	login : FormProfileLogin
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/contactInfo.xml#2)*/
declare class FormContactInfo extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/contactInfo.xml#5) */
	phone : FormField<string>
}
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#2)*/
declare class FormShippingShippingAddress extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#12) */
	addressFields : FormAddress
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#15) */
	shippingMethodID : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#18) */
	shippingAddressUseAsBillingAddress : FormField<boolean>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#20) */
	isGift : FormField<boolean>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#21) */
	giftMessage : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#24) */
	save : FormAction
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#2)*/
declare class FormShipping extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#4) */
	shipmentUUID : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#6) */
	productLineItemUUID : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#9) */
	shippingAddress : FormShippingShippingAddress
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#2)*/
declare class FormPreferences extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#3) */
	interestApparel : FormField<boolean>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#4) */
	interestElectronics : FormField<boolean>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#5) */
	newsletter : FormField<boolean>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#7) */
	apply : FormAction
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#2)*/
declare class FormSrvnewsletter extends FormGroup {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#3) */
	fname : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#4) */
	lname : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#5) */
	email : FormField<string>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#11) */
	promo : FormField<boolean>
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#12) */
	subscribe : FormAction
}

declare global {
interface SFCCForms {
	coRegisteredCustomer: FormCoRegisteredCustomer
	states: FormStates
	newPasswords: FormNewPasswords
	creditCard: FormCreditCard
	address: FormAddress
	coCustomer: FormCoCustomer
	billing: FormBilling
	profile: FormProfile
	contactInfo: FormContactInfo
	shipping: FormShipping
	preferences: FormPreferences
	srvnewsletter: FormSrvnewsletter
}
}


/****** SRFA *******/

interface SfraAction {
    description: string | null;
    label: string | null;
    submitted: boolean | null;
    triggered: boolean | null;
    formType: string;
}

interface SfraFiledOptions {
	checked: boolean,
	htmlValue: string,
	label: string,
	id: string,
	selected: boolean,
	value: string
}

interface SfraFieldBoolean {
	checked: boolean;
	selected: boolean;
}

interface SfraFieldString {
	maxLength: number;
	minLength: number;
	regEx: string
}

interface SfraFieldInteger {
	maxValue: number;
	minValue: number;
}

interface SfraField<T> {
	valid: boolean;
	error: string | null
	readonly attributes: string;
	value: T;
	options: SfraFiledOptions[];
	selectedOption: string;
	formType: string;

	htmlValue: string,
	mandatory: boolean,
	dynamicHtmlName: string
	htmlName: string
}

interface SfraFormBase<T> {
	clear() : void;
	copyFrom(src: object): void;
	toObject(): any;
	valid: boolean;
	base: T
	htmlName: string,
	dynamicHtmlName: string,
	error: string | null,
	attributes: string,
	formType: 'formGroup'
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coRegisteredCustomer.xml#2)*/
interface SfraFormCoRegisteredCustomer extends SfraFormBase<FormCoRegisteredCustomer> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coRegisteredCustomer.xml#4) */
	email : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coRegisteredCustomer.xml#16) */
	password : SfraField<string> & SfraFieldString
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/states.xml#2)*/
interface SfraFormStates extends SfraFormBase<FormStates> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/states.xml#3) */
	stateCode : SfraField<string> & SfraFieldString
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/newPasswords.xml#2)*/
interface SfraFormNewPasswords extends SfraFormBase<FormNewPasswords> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/newPasswords.xml#3) */
	newpassword : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/newPasswords.xml#13) */
	newpasswordconfirm : SfraField<string> & SfraFieldString
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#2)*/
interface SfraFormCreditCard extends SfraFormBase<FormCreditCard> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#5) */
	editNumber : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#12) */
	paymentMethod : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#14) */
	cardType : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#17) */
	cardNumber : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#20) */
	cardOwner : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#23) */
	expirationMonth : SfraField<number> & SfraFieldInteger
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#42) */
	expirationYear : SfraField<number> & SfraFieldInteger
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#49) */
	securityCode : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/creditCard.xml#52) */
	saveCard : SfraField<boolean> & SfraFieldBoolean
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#2)*/
interface SfraFormAddress extends SfraFormBase<FormAddress> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#4) */
	addressId : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#6) */
	firstName : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#8) */
	lastName : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#10) */
	address1 : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#12) */
	address2 : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#14) */
	city : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#18) */
	postalCode : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#26) */
	country : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#34) */
	states : SfraFormStates
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#37) */
	phone : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#45) */
	secondaryPhone : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#55) */
	apply : SfraAction
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/address.xml#56) */
	remove : SfraAction
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coCustomer.xml#2)*/
interface SfraFormCoCustomer extends SfraFormBase<FormCoCustomer> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/coCustomer.xml#4) */
	email : SfraField<string> & SfraFieldString
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#2)*/
interface SfraFormBilling extends SfraFormBase<FormBilling> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#4) */
	shippingAddressUseAsBillingAddress : SfraField<boolean> & SfraFieldBoolean
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#7) */
	addressFields : SfraFormAddress
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#9) */
	contactInfoFields : SfraFormContactInfo
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#11) */
	paymentMethod : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#13) */
	creditCardFields : SfraFormCreditCard
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/billing.xml#15) */
	subscribe : SfraField<boolean> & SfraFieldBoolean
}
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#2)*/
interface SfraFormProfileCustomer {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#4) */
	firstname : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#13) */
	lastname : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#22) */
	email : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#35) */
	emailconfirm : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#48) */
	phone : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#57) */
	addtoemaillist : SfraField<boolean> & SfraFieldBoolean
}
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#2)*/
interface SfraFormProfileLogin {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#64) */
	password : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#75) */
	passwordconfirm : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#86) */
	currentpassword : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#96) */
	newpasswords : SfraFormNewPasswords
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#2)*/
interface SfraFormProfile extends SfraFormBase<FormProfile> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#3) */
	customer : SfraFormProfileCustomer
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/profile.xml#63) */
	login : SfraFormProfileLogin
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/contactInfo.xml#2)*/
interface SfraFormContactInfo extends SfraFormBase<FormContactInfo> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/contactInfo.xml#5) */
	phone : SfraField<string> & SfraFieldString
}
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#2)*/
interface SfraFormShippingShippingAddress {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#12) */
	addressFields : SfraFormAddress
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#15) */
	shippingMethodID : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#18) */
	shippingAddressUseAsBillingAddress : SfraField<boolean> & SfraFieldBoolean
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#20) */
	isGift : SfraField<boolean> & SfraFieldBoolean
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#21) */
	giftMessage : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#24) */
	save : SfraAction
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#2)*/
interface SfraFormShipping extends SfraFormBase<FormShipping> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#4) */
	shipmentUUID : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#6) */
	productLineItemUUID : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_storefront_base/cartridge/forms/default/shipping.xml#9) */
	shippingAddress : SfraFormShippingShippingAddress
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#2)*/
interface SfraFormPreferences extends SfraFormBase<FormPreferences> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#3) */
	interestApparel : SfraField<boolean> & SfraFieldBoolean
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#4) */
	interestElectronics : SfraField<boolean> & SfraFieldBoolean
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#5) */
	newsletter : SfraField<boolean> & SfraFieldBoolean
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/preferences.xml#7) */
	apply : SfraAction
}
/** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#2)*/
interface SfraFormSrvnewsletter extends SfraFormBase<FormSrvnewsletter> {
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#3) */
	fname : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#4) */
	lname : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#5) */
	email : SfraField<string> & SfraFieldString
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#11) */
	promo : SfraField<boolean> & SfraFieldBoolean
	 /** @source [definition](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/app_custom_sumit/cartridge/forms/default/srvnewsletter.xml#12) */
	subscribe : SfraAction
}

declare global {
interface SFRAServerForms {
	getForm(name: 'coRegisteredCustomer'): SfraFormCoRegisteredCustomer
	getForm(name: 'states'): SfraFormStates
	getForm(name: 'newPasswords'): SfraFormNewPasswords
	getForm(name: 'creditCard'): SfraFormCreditCard
	getForm(name: 'address'): SfraFormAddress
	getForm(name: 'coCustomer'): SfraFormCoCustomer
	getForm(name: 'billing'): SfraFormBilling
	getForm(name: 'profile'): SfraFormProfile
	getForm(name: 'contactInfo'): SfraFormContactInfo
	getForm(name: 'shipping'): SfraFormShipping
	getForm(name: 'preferences'): SfraFormPreferences
	getForm(name: 'srvnewsletter'): SfraFormSrvnewsletter
}
}

declare global {
interface SRFAForms {
	coRegisteredCustomer: SfraFormCoRegisteredCustomer
	states: SfraFormStates
	newPasswords: SfraFormNewPasswords
	creditCard: SfraFormCreditCard
	address: SfraFormAddress
	coCustomer: SfraFormCoCustomer
	billing: SfraFormBilling
	profile: SfraFormProfile
	contactInfo: SfraFormContactInfo
	shipping: SfraFormShipping
	preferences: SfraFormPreferences
	srvnewsletter: SfraFormSrvnewsletter
}
}