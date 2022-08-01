
Feature('Cart');

const userData = require('./userMail.json');
const data = require('./data.json');
const assert = require('assert');


Scenario(
'12 User can place order using not saved PayPal account on cart  @user', 
async ({ I }) => {
	I.amOnPage(data.loginPage)	
	I.wait(2)
	I.click("Yes")
	I.wait(3)
	I.login(userData.email, data.password)
	I.wait(3)
	I.amOnPage(data.productPageTV)	
	I.wait(3)
	I.click("Add to Cart")
	I.wait(2)
	I.click("div.minicart-total.hide-link-med")
	
	I.wait(10)
	


	await I.usePPAsUser()
	
	//I.click("#paypal_image")
	
	
	I.wait(10)
	I.see("Place Order")
	
	I.click("Place Order")
	I.wait(10)

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')
	
	
	

	}
);
