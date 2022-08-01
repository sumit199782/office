const userData = require('./userMail.json');
const data = require('./data.json');
Feature('Business Manager');





Scenario(
'99 Enable cash @user', 
async ({ I }) => {
	I.amOnPage(data.customCashConfig)
	I.wait(3)
	I.loginToBM(data.BMLogin, data.BMPassword)
	I.wait(3)
	I.amOnPage(data.customCashConfig)
	I.wait(3)
	I.checkOption('#bm_content_column > table > tbody > tr > td > table > tbody > tr > td.top > form:nth-child(7) > table > tbody > tr:nth-child(2) > td > input[type=checkbox]')
	I.wait(5)
	I.click('Apply')
	
	
}	 
);




