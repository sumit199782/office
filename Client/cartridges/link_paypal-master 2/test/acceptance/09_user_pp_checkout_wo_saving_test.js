
Feature('Checkout');

const userData = require('./userMail.json');
const data = require('./data.json');



Scenario(
'09 User can pass checkout flow with PP  without saving(there is no saved PP yet) @user', 
async ({ I }) => {
	I.amOnPage(data.loginPage)	
	I.wait(2)
	I.click("Yes")
	I.wait(3)
	I.login(userData.email, data.password)
	I.wait(3)
	//pause()
	I.amOnPage(data.productPageTV)	
	I.wait(3)
	I.click("Add to Cart")
	I.wait(2)
	I.click("div.minicart-total.hide-link-med")
	I.wait(2)
	I.click("Checkout")
	
	I.wait(3)
	
	
	I.fillShippingData(data.firstName, data.lastName, data.addressOne, data.country, data.state, data.city, data.zip, data.phone)
	I.click("Next: Payment")
	I.wait(3)
	
	I.fillField("#email", data.email)
	I.wait(3)
	//pause()
	//I.checkOption("#savePaypalAccountContainer > label > span")
	
	
	
	I.wait(3)
	I.click("#dwfrm_billing > fieldset:nth-child(3) > div.form-nav.billing-nav.payment-information > ul > li:nth-child(2) > a")

	await I.usePPAsUser()
	
	I.wait(15)
	I.see("Place Order")
	
	I.click("Place Order")
	I.wait(10)

	//asserts for verifying placing order:
	I.see('Receipt')
	I.see('Thank you for your order')

	//asserts for verifying not saving PP:
	I.amOnPage(data.myAccountPage)
	I.wait(3)
	I.see((data.paypalEmail))
	

	
	}
);


	
