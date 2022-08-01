
Feature('Cart');

const userData = require('./userMail.json');
const data = require('./data.json');
const assert = require('assert');


Scenario(
'13 User can place order using already saved PayPal account on cart with applied promo @user @promo', 
async ({ I }) => {
	//login
	I.amOnPage(data.loginPage)	
	I.wait(2)
	I.click("Yes")
	I.wait(3)
	I.login(userData.email, data.password)
	I.wait(3)
	//add product to cart
	I.amOnPage(data.productPageTV)	
	I.wait(3)
	I.click("Add to Cart")
	I.wait(2)
	I.click("div.minicart-total.hide-link-med")
	I.wait(5)
	//apply promos
	I.fillField("Promo Code","product_promo")
	I.click("Submit")
	I.wait(6)
	I.fillField("Promo Code","shipping_promo")
	I.click("Submit")
	I.wait(6)
	I.fillField("Promo Code","order_promo")
	I.click("Submit")
	I.wait(10)
	//asserts for applied promos:
	I.see("product_promo - Applied")
	I.see("shipping_promo - Applied")
	I.see("order_promo - Applied")

	//pace order:
	I.click("#paypal_image")
	I.wait(10)
	I.see("Place Order")
	
	I.click("Place Order")
	I.wait(10)

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')
	
	
	

	}
);
