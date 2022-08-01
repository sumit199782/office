
Feature('Cart');

const userData = require('./userMail.json');
const data = require('./data.json');
const assert = require('assert');


Scenario(
'15 User can place order using already saved PayPal account on checkout  @user', 
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
	
	I.wait(2)
	I.click("Checkout")
	
	I.wait(3)
	
	
	//I.fillShippingData(data.firstName, data.lastName, data.addressOne, data.country, data.state, data.city, data.zip, data.phone)
	I.click("Next: Payment")
	I.wait(3)
	
	I.fillField("#email", data.email)
	I.wait(3)
	I.click("#dwfrm_billing > fieldset:nth-child(3) > div.form-nav.billing-nav.payment-information > ul > li:nth-child(2) > a")
	I.wait(3)
	I.click("Next: Place Order")
	
	I.wait(10)
	I.see("Place Order")
	
	I.click("Place Order")
	I.wait(10)
	

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')
	
	
	

	}
);
