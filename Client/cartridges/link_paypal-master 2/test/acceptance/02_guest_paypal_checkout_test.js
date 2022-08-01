
Feature('Checkout');

const assert = require('assert');

const data = require('./data.json');

Scenario(
'02 Guest can place order using PayPal account on checkout @guest', 
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
	I.wait(3)
	I.fillShippingData(data.firstName, data.lastName, data.addressOne, data.country, data.state, data.city, data.zip, data.phone)
	I.click("Next: Payment")
	I.wait(3)
	I.fillField("#email", data.email)
	I.wait(2)
	I.click("#dwfrm_billing > fieldset:nth-child(3) > div.form-nav.billing-nav.payment-information > ul > li:nth-child(2) > a")
	I.wait(2)

	await I.usePPAsGuest()
	
	I.wait(10)
	I.see("Place Order")
	
	I.click("Place Order")
	I.wait(10)

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')
	}
);
