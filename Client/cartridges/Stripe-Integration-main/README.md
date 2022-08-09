# Stripe Integration

## Summary

 - This cartridge will let you do payments and create payment method for each transaction.
 - In this cartridge we will use stripe paymentIntents API and paymentsMethod API.

### Create Merchant Account on Stripe

 - Visit this link https://dashboard.stripe.com/login and create your stripe merchant account.
 - When creating new account be sure that you choose your country US & currency USD because we will be doing payments in US$ for storefront.
 - Fill up the form and choose business type as Individual and add a fake bank account.
 - After coming to Dashboard, goto  customer tab and create a customer for test payment.
### Setup Payment Processor & Preferences
 - In folder you will be provided with *metadata* folder, extract it and open *site* folder and change the name neeraj-site to your site ID
 - Now again zip the metadata folder and import it. 
 - After Import check, 
	 - if payment processor name STRIPE and 
	 - 2 custom preferences *Stripe_API_Key* and *Stripe_Test_Customer_ID* is created or not.
 - If not then create manually
	 - Payment Processor name : STRIPE.
	 - Custom Preferences : Admin > System Objects > SitePreference - create attribute with the name provided above and then create attribute group with name STRIPE and add the attributes to it.
 - Then open Home tab in dashboard and copy your secret key and paste it in preference. 
 - Open your Customer Tab and copy the customer ID and paste it in the preference.

### Setup Service

 - There will be 2 service :-
	 - int.stripe.intents
		 - credentials : *int.stripe.intents.credentials* - url : https://api.stripe.com/v1/payment_intents
		 - profile : *int.stripe.intents.profile* - timeout : 7,000 ms
	 - int.stripe.paymentMethod
		 - credentials : *int.stripe.paymentMethod.credentials* - url : https://api.stripe.com/v1/payment_methods
		 - profile : *int.stripe.intents.profile* - timeout : 20,000 ms


 > Now add the cartridge *int_stripe_ns* to the left most of cartridge path, eg :- int_stripe_ns:app_storefront_base.
 > 
 > Also choose payment processor, *Merchant Tools > Ordering > Payment Methods* - select *CREDIT_CARD* and scroll down where you can change Payment Processor.

### Working
 1. To make your payment done we need to override some controllers, payment processor, make some scripts and service calls.
 2. Now we will understand what is code flow.
	- When a customer add products to basket, then goes for checkout and after filling all the Shipping & billing details.
	- When it goes for payment and do *Submit Payment*, it calls the route *SubmitPayment* of controller *CheckoutServices.js*.
		1. In *SubmitPayment*, we have override it and *append* the code.
		2. First get the viewData from res which contains the information of card and customer by which we created cardDetails object to send in script for service call. 
		3. Same as above we have created orderIntent object using currentBasket.
		4. Now all the code is wrapped under if condition which checks if payment processor is STRIPE or not.
		5. After creating both the objects we have called *createPaymentMethodAndIntent* from script *stripeTokenHelper*.
		6. From those 2 object we will create 2 body for service call.
		7. Those 2 service calls will be *payment_method* & *paymentIntent*.
		8. In *payment_method* we will send body in call(*body*) function.
		9. and in the service we have to set its request Method and it's headers.
		10. Our Content-Type for all the apis' will be *application/x-www-form-urlencoded*, so we have to encode it's body before sending.
		11. After calling *payment_method* it will return a response from which we will get the  id which is used in *paymentIntentBody*.
		12. So that payment method which is created will be linked to that intent.
		13.  Now same as 8. point we have to call *paymentIntent*  which do the same process as *payment_method*.
		14. After getting the response in the controller we will store it in session as string, so that we can send it to PlaceOrder route.
		15. Goto stripe and open Payments tab where you can see your payment is in incomplete state which means that intent has started the payment. 
	- Now our payment method & intent is created.
	- Customer will now place the order, on clicking the button
	- *PlaceOrder* route will run, in this we have override it and prepend our code,
	- because we have to call the service before otherwise order will be placed.
		
		 1. Now in this route get the response of intent from session and parse it into JSON.
		 2. And call the *confirmPaymentIntent* from *stripeTokenHelper* and send the id of the intents.
		 3. In *confirmPaymentIntent* get the service *paymentIntent* URL and append that id & *"confirm"* to it.
		 4. This will confirm your payment on stripe which was pending when we submit our payment.
		 5. And this will be wrapped under if condition i.e. our intent from session should not be null.
		 6. Now we will create another object *stripe_result_data* which in which we store the payment status from the service response and store it in sessions, we'll use it later.
		 7. This service body will also be in *url-encoded* form.

	- Now our payment has been confirmed, so we have to show it in order details.
	- In Merchant Tools > Orders, open any order and open *Payment* tab, in *Payment Method:* we have to append *stripe_result_data* in it.
	- To store data we have to create custom attributes on *Order Payment Instruments* System Object 
		1. Now we have to override Order.js & prepend it's *Confirm* route.
		2. This route stores the order details in our site.
		3. So, we'll get the order from req and then perform a Transaction wrap
		4. In which we will be storing our *stripe_result_data* into the custom attributes which we have created.
		5.  This will add the data i.e. it's status, receipt URL, payment id into the order.
