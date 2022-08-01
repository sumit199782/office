
Feature('Cart');

const assert = require('assert');

const data = require('./data.json');

Scenario(
'11 Guest can place order using PayPal account on cart with applied promo @guest @promo', 
async ({ I }) => {
	I.amOnPage(data.productPageTV)
	I.click("Yes")
	I.wait(3)
	I.click("Add to Cart")
	I.wait(3)
	I.click("div.minicart-total.hide-link-med")
	I.wait(5)
	I.fillField("Promo Code","product_promo")
	I.click("Submit")
	I.wait(6)
	I.fillField("Promo Code","shipping_promo")
	I.click("Submit")
	I.wait(6)
	I.fillField("Promo Code","order_promo")
	I.click("Submit")
	I.wait(10)
	I.see("product_promo - Applied")
	I.see("shipping_promo - Applied")
	I.see("order_promo - Applied")
	
	//pause()
	await I.usePPAsUser()
	
	I.wait(10)
	I.see("Place Order")
	
	I.click("Place Order")
	I.wait(10)

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')
	
	
	

	}
);
