// in this file you can append custom step methods to 'I' object
const fs = require('fs');
const userData = require('./userMail.json');
const data = require('./data.json');

module.exports = function() {
  return actor({
	  
	login: function(email, password) {
		this.fillField('Email', email);
		this.fillField('Password', password);
		this.wait(2);
		this.click("button.btn.btn-block.btn-primary");
	},

	usePPAsGuest: async function(){
		//const handleBeforePopup = await this.grabCurrentWindowHandle();
		this.switchTo("iframe[title='PayPal']")
		//this.wait(2)
		//pause()
		this.click("[data-funding-source='paypal']")
		this.wait(4)
		this.switchToNextTab()
		//const allHandlesAfterPopup = await this.grabAllWindowHandles();
		//this.wait(2)
		//await this.switchToWindow(allHandlesAfterPopup[1]);
		this.wait(15)
		this.fillField("Email", data.paypalEmail)
		this.click("[id='btnNext']")
		this.wait(3)
		this.fillField("Password", data.paypalPassword)
		this.click("[id='btnLogin']")
		//this.wait(12)
		//this.click("[id='acceptAllButton']")
		//this.wait(10)
		//pause()
		this.waitForElement('#consentButton',60) //agree button
		this.click("#consentButton")
		//this.wait(10)
		//this.click("Pay Now")
		this.switchToPreviousTab()
		this.wait(6)
		//await this.switchToWindow(handleBeforePopup);
	},


	usePPAsUser: async function(){
		//const handleBeforePopup = await this.grabCurrentWindowHandle();
		this.switchTo("iframe.component-frame.visible")
		this.wait(2)
		this.click("[data-funding-source='paypal']")
		this.wait(4)
		this.switchToNextTab()
		//const allHandlesAfterPopup = await this.grabAllWindowHandles();
		//await this.switchToWindow(allHandlesAfterPopup[1]);
		this.wait(15)
		
		this.fillField("Email", data.paypalEmail)
		this.wait(3)
		this.click("[id='btnNext']")
		this.wait(3)
		this.fillField("Password", data.paypalPassword)
		this.click("[id='btnLogin']")
		//this.wait(12)
		//this.click("[id='acceptAllButton']")
	    this.waitForElement('#consentButton',60) //agree button
		this.click("#consentButton")
		this.switchToPreviousTab()
		this.wait(10)
		//this.click("Continue")
		//this.wait(3)
		//await this.switchToWindow(handleBeforePopup);
	},

	usePPAsGuestFromCart: async function(){
		//const handleBeforePopup = await this.grabCurrentWindowHandle();
		this.switchTo("iframe.component-frame.visible")
		this.wait(2)
		this.click("[data-funding-source='paypal']")
		this.wait(4)
		this.switchToNextTab()
		//const allHandlesAfterPopup = await this.grabAllWindowHandles();
		//await this.switchToWindow(allHandlesAfterPopup[1]);
		this.wait(15)
		
		this.fillField("Email", data.paypalEmail)
		this.wait(3)
		this.click("[id='btnNext']")
		this.wait(3)
		this.fillField("Password", data.paypalPassword)
		this.wait(3)
		this.click("[id='btnLogin']")
		this.wait(12)
		//this.click("[id='acceptAllButton']")
	    this.wait(3)
		this.click("Continue")
		//this.wait(10)
		//this.click("Continue")
		this.switchToPreviousTab()
		this.wait(3)
		//await this.switchToWindow(handleBeforePopup);
	},

	usePPAsUser1con: async function(){
		const handleBeforePopup = await this.grabCurrentWindowHandle();
		this.switchTo("iframe.component-frame.visible")
		this.wait(2)
		this.click("[data-funding-source='paypal']")
		this.wait(4)
		const allHandlesAfterPopup = await this.grabAllWindowHandles();
		await this.switchToWindow(allHandlesAfterPopup[1]);
		this.wait(15)
	
		this.fillField("Email", data.paypalEmail)
		this.wait(3)
		this.click("[id='btnNext']")
		this.wait(3)
		this.fillField("Password", data.paypalPassword)
		this.click("[id='btnLogin']")
		this.wait(12)
		//this.click("[id='acceptAllButton']")
	    this.wait(3)
		this.click("Continue")
		this.wait(10)
		//this.click("Continue")
		this.wait(3)
		await this.switchToWindow(handleBeforePopup);
	},
	
	
	
	fillCardData: function( cardNumber, cvv) {
		
		//this.switchTo("#credit-card-content");
		this.fillField("#cardNumber", cardNumber);
		//this.switchTo();
		//this.switchTo("#securityCode");
		this.fillField("#securityCode", cvv);
		this.selectOption("#expirationMonth","01")
		this.selectOption("#expirationYear","2025")
		//this.switchTo();
		//this.switchTo("#expirationMonth");
		//this.fillField("expiration", expiration);
		//this.switchTo();
		//this.switchTo("#expirationMonth");
		//this.switchTo();
	},

	checkoutPaypal: async function(paypalEmail, paypalPassword) {
		this.click("PayPal")
	
		const handleBeforePopup = await this.grabCurrentWindowHandle();
		const urlBeforePopup = await this.grabCurrentUrl();
		const allHandlesBeforePopup = await this.grabAllWindowHandles();
		assert.equal(allHandlesBeforePopup.length, 1, 'Single Window');
		
		this.switchTo("iframe.zoid-component-frame.zoid-visible")
		this.click("div.paypal-button")
				
		const allHandlesAfterPopup = await this.grabAllWindowHandles();
		assert.equal(allHandlesAfterPopup.length, 2, 'Two Windows');
		
		await this.switchToWindow(allHandlesAfterPopup[1]);
		
		this.wait(6)
		this.fillField("Email", paypalEmail)
		this.click("Next")
		this.wait(3)
		this.fillField("Password", paypalPassword)
		this.click("Log In")
		this.wait(10)
		this.click("Continue")
		//this.wait(7)
		//this.click("Continue")
		await this.switchToWindow(handleBeforePopup);
		const currentURL = await this.grabCurrentUrl();
		assert.equal(currentURL, urlBeforePopup, 'Expected URL: Main URL');
	},
	
	cartPaypal: async function(paypalEmail, paypalPassword) {
	
		const handleBeforePopup = await this.grabCurrentWindowHandle();
		//assert.equal(allHandlesBeforePopup.length, 1, 'Single Window');
		this.switchTo("iframe.zoid-component-frame.zoid-visible");
		this.click("div.paypal-button");
		const allHandlesAfterPopup = await this.grabAllWindowHandles();
		//assert.equal(allHandlesAfterPopup.length, 2, 'Two Windows');
		await this.switchToWindow(allHandlesAfterPopup[1]);
		this.wait(6);
		this.fillField("Email", paypalEmail);
		this.click("Next");
		this.wait(3);
		this.fillField("Password", paypalPassword);
		this.click("Log In");
		this.wait(10);
		this.click("Continue");
		//this.wait(7);
		//this.click("Continue");
		await this.switchToWindow(handleBeforePopup);
		//assert.equal(currentURL, urlBeforePopup, 'Expected URL: Main URL');
	},
	
	fillShippingData: function(firstName, lastName, addressOne, country, state, city, zip, phone) {
		this.fillField("First Name", firstName)
		this.wait(3)
		this.fillField("Last Name", lastName)
		this.wait(3)
		this.fillField("Address 1", addressOne)
		this.wait(3)
		this.selectOption("Country", country)
		this.wait(3)
		this.selectOption("State", state)
		this.wait(3)
		this.fillField("City", city)
		this.wait(3)
		this.fillField("ZIP Code", zip)
		this.wait(3)
		this.fillField("Phone Number", phone)
	}, 
	
	fillPaypalData: function(paypalEmail, paypalPassword) {
		
		this.wait(6)
		this.fillField("Email", paypalEmail)
		this.click("Next")
		this.wait(3)
		this.fillField("Password", paypalPassword)
		this.click("Log In")
		this.wait(10)
		this.click("Continue")
		this.wait(2)
		this.click("Continue")
		
	},
	
	fillPaypalCreditData: function(paypalEmail, paypalPassword) {
			
		this.wait(6)
		this.fillField("Email", paypalEmail)
		this.click("Next")
		this.wait(3)
		this.fillField("Password", paypalPassword)
		this.click("Log In")
		this.wait(15)
		this.click("More info")
		this.click("#extendedSacOffer > div")
		this.wait(3)
		this.click("Continue")
		this.wait(4)
	},
	
	loginToBM: function(BMLogin, BMPassword){
	this.wait(2)
	this.fillField("LoginForm_Login", BMLogin)
	this.fillField("LoginForm_Password", BMPassword)
	this.click("login")
	},

	enableBA: function(){
		this.wait(2)
		this.amOnPage (data.ecConfig)
		this.wait(7)
		this.click("RefArch")
		this.amOnPage (data.ecConfig)
		this.wait(7)
		this.selectOption("#dw-select-55 > select ","0")
		this.wait(2)
		this.pressKey('Enter');
		this.wait(2)
	},


	disableBA: function(){
		this.wait(2)
		this.amOnPage (data.ecConfig)
		this.wait(7)
		this.click("RefArch")
		this.amOnPage (data.ecConfig)
		this.wait(7)
		this.selectOption("#dw-select-55 > select ","1")
		this.wait(2)
		this.pressKey('Enter');
		this.wait(2)
	},	
	
	
	pass3DS: function() {
		this.wait(13)	
		this.switchTo("#Cardinal-CCA-IFrame")
        this.switchTo("iframe") 
		this.see("Password")
		this.fillField("#password", "1234")
		this.click("Submit")
		this.wait(5)
	},
	
	generateMail: async function () {
		
		try {
		let iterator = userData.iterator;
		iterator+=1;
		let email = iterator+"@mail.com";

		let jsonInput = { 
		email: email,
		iterator: iterator
		} 

		let newUserMail = JSON.stringify(jsonInput, null, 2);


		fs.writeFile('userMail.json', newUserMail, (err) =>{
			if(err)throw err;
		console.log('Data written to file');
		});
		
	    } catch (e) {}
		
		
	},
	
		fillAccountData: function(firstName, lastName, phone, email, password ) {
		this.fillField("First Name", firstName)
		this.wait(3)
		this.fillField("Last Name", lastName)
		this.wait(3)
		this.fillField("Phone", phone)
		this.wait(3)
		this.fillField("#registration-form-email", email)
		this.wait(3)
		this.fillField("#registration-form-email-confirm", email)
		this.wait(3)
		this.fillField("#registration-form-password", password)
		this.wait(3)
		this.fillField("#registration-form-password-confirm", password)
		this.wait(3)
		
	}


    // Define custom steps here, use 'this' to access default methods of this.
    // It is recommended to place a general 'login' function here.
  });
};
