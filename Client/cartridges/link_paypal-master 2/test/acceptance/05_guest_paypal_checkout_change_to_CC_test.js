
Feature('Checkout');

const assert = require('assert');

const data = require('./data.json');

Scenario(
'05 Guest can switch between payment methods and than palce order @guest', 
async ({ I }) => {
	I.amOnPage(data.productPageTV)
	I.click("Yes")
	I.wait(3)
	I.click("Add to Cart")
	I.wait(3)
	I.click("div.minicart-total.hide-link-med")
	I.wait(5)
	I.click("Checkout")
	I.wait(2)
	I.click("Checkout as Guest")
	I.fillShippingData(data.firstName, data.lastName, data.addressOne, data.country, data.state, data.city, data.zip, data.phone)
	I.click("Next: Payment")
	I.wait(3)
	I.fillField("#email", data.email)
	I.wait(2)
	
	I.click("#dwfrm_billing > fieldset:nth-child(3) > div.form-nav.billing-nav.payment-information > ul > li:nth-child(2) > a")

	await I.usePPAsGuest()
	
	I.wait(10)
	I.see("Place Order")
	
	
	
	
	I.wait(10)
	I.click('[aria-label="Edit Payment"]') //click edit payment method
	I.wait(3)
	I.click("#dwfrm_billing > fieldset:nth-child(3) > div.form-nav.billing-nav.payment-information > ul > li:nth-child(1) > a > img")
	I.wait(3)
	I.fillCardData(data.cardNumber, data.cvv)
	I.wait(2)
	
	I.click("Next: Place Order")
	I.wait(4)
	I.click("Place Order")
	I.wait(4)
	

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')
	}
);
