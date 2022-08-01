
Feature('Checkout');

const assert = require('assert');

const data = require('./data.json');

Scenario(
'07 Guest can switch between payment methods and than palce order @guest', 
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
	I.click('[data-method-id="CREDIT_CARD"]')
	I.wait(2)
	
	
	//pause()
	
	
	//I.wait(10)
	//I.click("#checkout-main > div:nth-child(3) > div.col-sm-7 > div.card.payment-summary > div.card-header.clearfix > span")
	//I.wait(3)
	//I.click("#dwfrm_billing > fieldset:nth-child(3) > div.form-nav.billing-nav.payment-information > ul > li:nth-child(1) > a > img")
	//I.wait(3)
	I.fillCardData(data.cardNumber, data.cvv)
	I.wait(2)
	
	I.click("Next: Place Order")
	I.wait(3)
	I.see("Place Order")
	I.click('[aria-label="Edit Payment"]')
	
	I.wait(2)

	I.click('[data-method-id="PayPal"]')
	
	await I.usePPAsGuest()
	
	I.wait(10)
	I.see("Place Order")
	I.click("Place Order")
	I.wait(6)
	

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')
	}
);
