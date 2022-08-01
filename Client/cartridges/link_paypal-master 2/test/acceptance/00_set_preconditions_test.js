const userData = require('./userMail.json');
const data = require('./data.json');
Feature('Business Manager');



Scenario(
'00.1 Enable BA @user', 
async ({ I }) => {
	
	I.amOnPage (data.ecConfig)
	I.wait(3)
	I.loginToBM(data.BMLogin, data.BMPassword)
	I.wait(3)
	I.enableBA()
	
}	 
);

Scenario(
'00.2 Disable cash @user', 
async ({ I }) => {
	I.amOnPage(data.customCashConfig)
	I.wait(3)
	I.loginToBM(data.BMLogin, data.BMPassword)
	I.wait(3)
	I.amOnPage(data.customCashConfig)
	I.wait(3)
	I.uncheckOption('#bm_content_column > table > tbody > tr > td > table > tbody > tr > td.top > form:nth-child(7) > table > tbody > tr:nth-child(2) > td > input[type=checkbox]')
	I.wait(5)
	I.click('Apply')
	
	
}	 
);

Scenario(
'00.3 Generate email for new user @user', 
async ({ I }) => {
	
	I.generateMail()
	
}	 
);

Scenario(
'00.4 Create user @user', 
async ({ I }) => {
	
	
	I.amOnPage(data.loginPage)
	I.wait(2)
	I.click("Yes")
	I.wait(2)
	I.click("Create Account")
	I.wait(2)
	I.fillAccountData(data.firstName,data.lastName,  data.phone, userData.email, data.password )
	I.wait(2)
	
	I.click("#register > form > button")
	I.wait(6)
	I.see(data.firstName)
	I.see(data.lastName)
	I.see(userData.email)
	I.see(data.phone)
	
}	 
);


