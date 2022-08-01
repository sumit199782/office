
import EnumValue = require('dw/value/EnumValue')
import MarkupText = require('dw/content/MarkupText');
import MediaFile = require('dw/content/MediaFile');

// autogeneratedfile - '/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml'
declare global {
    module ICustomAttributes {

		interface Product {
			/**
			* Subscription Enabled
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#5) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#16)
			*/
			subproSubscriptionEnabled: boolean | null;

		}
		interface ProductLineItem {
			/**
			* Subscription Option Mode
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#23) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#98)
			*/
			subproSubscriptionOptionMode: string | null;

			/**
			* Subscription Selected Option Mode

				Subscription mode which was chosen on this ProductLineItem
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#30) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#99)
			*/
			subproSubscriptionSelectedOptionMode: string | null;

			/**
			* Subscription Refill Interval
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#38) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#100)
			*/
			subproSubscriptionInterval: string | null;

			/**
			* Subscription Available Intervals

				String with names of available intervals, separated by comma
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#45) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#101)
			*/
			subproSubscriptionAvailableIntervals: string | null;

			/**
			* Subscription Discount

				Subscription discount offered on this product, as either a percentage or a fixed price, depending on the value of the subproSubscriptionIsDiscountPercentage property
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#52) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#102)
			*/
			subproSubscriptionDiscount: number | null;

			/**
			* Subscription Is Discount Percentage

				Is the discount on the product specified as a percentage or as a fixed price amount
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#59) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#103)
			*/
			subproSubscriptionIsDiscountPercentage: boolean | null;

			/**
			* Subscription Created at Subscribe?
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#66) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#104)
			*/
			subproSubscriptionCreated: boolean | null;

			/**
			* Subscription Date Created
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#73) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#105)
			*/
			subproSubscriptionDateCreated: Date | null;

			/**
			* Subscription ID
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#80) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#106)
			*/
			subproSubscriptionID: string | null;

			/**
			* Subscription ID
			* 
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#87) 
			*/
			subproSubscriptionNumPeriods: string | null;

		}
		interface CustomerPaymentInstrument {
			/**
			* Subscribe Pro Payment Profile ID

				This attribute will contain the payment profile id that is returned from Subscription Pro upon creating payment profile record in the Subscribe Pro system
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#113) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#125)
			*/
			subproPaymentProfileID: string | null;

		}
		interface Order {
			/**
			* Contains Subscriptions
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#132) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#150)
			*/
			subproContainsSubscriptions: boolean | null;

			/**
			* Subscriptions to be processed
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#139) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#151)
			*/
			subproSubscriptionsToBeProcessed: boolean | null;

		}
		interface Basket {
			/**
			* Contains Subscriptions
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#158) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#176)
			*/
			subproContainsSubscriptions: boolean | null;

			/**
			* Subscriptions to be processed
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#165) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#177)
			*/
			subproSubscriptionsToBeProcessed: boolean | null;

		}
		interface Profile {
			/**
			* Subscribe Pro Customer ID
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#184) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#195)
			*/
			subproCustomerID: string | null;

		}
		interface CustomerAddress {
			/**
			* Subscribe Pro Address ID
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#202) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#213)
			*/
			subproAddressID: string | null;

		}
		interface OrderAddress {
			/**
			* Subscribe Pro Address ID
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#220) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#239)
			*/
			subproAddressID: string | null;

			/**
			* Customer Address ID
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#227) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#238)
			*/
			customerAddressID: string | null;

		}
		interface SitePreferences {
			/**
			* Subpro Enabled

				Turn on to enable Subscribe Pro functionality.
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#246) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#350)
			*/
			subproEnabled: boolean | null;

			/**
			* Subpro Checkout Login Message

				Message informing customer that he/she needs to be logged in as a registered customer to proceed checkout with SubPro Subscription products
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#253) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#352)
			*/
			subproCheckoutLoginMsg: string | null;

			/**
			* Subpro Apple Pay Login Message

				Message informing customer that he/she needs to be logged in as a registered customer to use Apple Pay with SubPro Subscription products
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#262) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#353)
			*/
			subproApplePayLoginMsg: string | null;

			/**
			* Subpro Credit Card Requirement Message

				Error message noting that a credit card is required for subscriptions
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#271) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#351)
			*/
			subproCreditCardRequirementMsg: string | null;

			/**
			* Subpro Saved Credit Card Message

				Error message noting that a credit card is required to be saved for subscriptions
			* 
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#280) 
			*/
			subproSavedCreditMsg: string | null;

			/**
			* Subscribe Pro Order Processing Error Mail

				An email address that order subscriptions processing failures will be sent to
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#289) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#354)
			*/
			subproOrderProcessingErrorMail: string | null;

			/**
			* Subscribe Pro "My Subscriptions" Widget Script Url
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#297) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#355)
			*/
			subproWidgetScriptUrl: string | null;

			/**
			* Subscribe Pro Address Book Widget Script Url
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#305) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#356)
			*/
			subproAddressWidgetScriptUrl: string | null;

			/**
			* Subscribe Pro Wallet Widget Script Url
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#313) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#357)
			*/
			subproWalletWidgetScriptUrl: string | null;

			/**
			* Subscribe Pro Subscriptions Widget Custom Config

				JSON object string containing configuration for widget theme and display customization.
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#321) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#360)
			*/
			subproSubscriptionsWidgetConfig: string | null;

			/**
			* Subscribe Pro API Base Url
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#330) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#358)
			*/
			subproApiBaseUrl: string | null;

			/**
			* Suffix to append to the Subscribe Pro Web Service Credentials
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#338) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#359)
			*/
			subproAPICredSuffix: string | null;

		}
		interface PaymentCard {
			/**
			* Subscribe Pro Card Type

				This card type should match the available card types within Subscribe Pro
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#367) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#379)
			*/
			subproCardType: string | null;

		}
	}
}

declare global {
	interface IGetCustomPreferenceValue {
					/**
			* Subpro Enabled

				Turn on to enable Subscribe Pro functionality.
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#246) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#350)
			*/
			(name: 'subproEnabled'): boolean | null;
			
			/**
			* Subpro Checkout Login Message

				Message informing customer that he/she needs to be logged in as a registered customer to proceed checkout with SubPro Subscription products
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#253) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#352)
			*/
			(name: 'subproCheckoutLoginMsg'): string | null;
			
			/**
			* Subpro Apple Pay Login Message

				Message informing customer that he/she needs to be logged in as a registered customer to use Apple Pay with SubPro Subscription products
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#262) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#353)
			*/
			(name: 'subproApplePayLoginMsg'): string | null;
			
			/**
			* Subpro Credit Card Requirement Message

				Error message noting that a credit card is required for subscriptions
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#271) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#351)
			*/
			(name: 'subproCreditCardRequirementMsg'): string | null;
			
			/**
			* Subpro Saved Credit Card Message

				Error message noting that a credit card is required to be saved for subscriptions
			* 
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#280) 
			*/
			(name: 'subproSavedCreditMsg'): string | null;
			
			/**
			* Subscribe Pro Order Processing Error Mail

				An email address that order subscriptions processing failures will be sent to
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#289) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#354)
			*/
			(name: 'subproOrderProcessingErrorMail'): string | null;
			
			/**
			* Subscribe Pro "My Subscriptions" Widget Script Url
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#297) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#355)
			*/
			(name: 'subproWidgetScriptUrl'): string | null;
			
			/**
			* Subscribe Pro Address Book Widget Script Url
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#305) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#356)
			*/
			(name: 'subproAddressWidgetScriptUrl'): string | null;
			
			/**
			* Subscribe Pro Wallet Widget Script Url
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#313) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#357)
			*/
			(name: 'subproWalletWidgetScriptUrl'): string | null;
			
			/**
			* Subscribe Pro Subscriptions Widget Custom Config

				JSON object string containing configuration for widget theme and display customization.
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#321) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#360)
			*/
			(name: 'subproSubscriptionsWidgetConfig'): string | null;
			
			/**
			* Subscribe Pro API Base Url
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#330) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#358)
			*/
			(name: 'subproApiBaseUrl'): string | null;
			
			/**
			* Suffix to append to the Subscribe Pro Web Service Credentials
			* @group subscribe-pro - Subscribe Pro
			* @source [attribute](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#338) | [group](file:/Users/sumitkumawat/sumit/Commerce/office/Client/cartridges/link_subscribepro-master/metadata/site_import/meta/system-objecttype-extensions.xml#359)
			*/
			(name: 'subproAPICredSuffix'): string | null;
			
	}
}