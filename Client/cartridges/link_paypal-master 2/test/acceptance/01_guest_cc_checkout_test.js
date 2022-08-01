
Feature('Checkout');

const data = require('./data.json');


Scenario(
'01 Guest can place order using credit card on checkout @guest', 
async ({ I }) => {
	
	I.amOnPage(data.productPageTV)
	
	I.click("Yes")
	
	I.selectOption("Quantity", "1")
	I.wait(2)
	
	I.click("Add to Cart")
	I.wait(2)

	I.click("div.minicart-total.hide-link-med")
	I.wait(5)
	I.click("Checkout")
	I.wait(3)

	I.click("Checkout as Guest")
	
	I.fillShippingData(data.firstName, data.lastName, data.addressOne, data.country, data.state, data.city, data.zip, data.phone)
	
	I.click("Next: Payment")
	I.wait(3)
	I.click('li[data-method-id="CREDIT_CARD"]')
	I.wait(3)
	I.fillField("#email", data.email)
	
	I.fillCardData(data.cardNumber, data.cvv)
	I.wait(2)
	//pause()
	I.click("Next: Place Order")

	I.wait(10)
	
	
	I.click("Place Order")
	I.wait(5)
	

	//asserts for verifying placing order:
	I.see("Receipt")
	I.see('Thank you for your order')
	

	}
);


