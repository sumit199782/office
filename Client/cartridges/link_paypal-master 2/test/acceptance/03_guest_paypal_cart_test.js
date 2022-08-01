
Feature('Checkout');

const assert = require('assert');

const data = require('./data.json');

Scenario(
'03 Guest can place order using PayPal account on cart @guest', 
async ({ I }) => {
	I.amOnPage(data.productPageTV)
	I.click("Yes")
	I.wait(3)
	I.click("Add to Cart")
	I.wait(3)
	I.click("div.minicart-total.hide-link-med")
	I.wait(15)
	//pause()
	await I.usePPAsGuestFromCart()
	
	I.wait(10)
	I.see("Place Order")
	
	I.click("Place Order")
	I.wait(10)

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')
	
	
	

	}
);
