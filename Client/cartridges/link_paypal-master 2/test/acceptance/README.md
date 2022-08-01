### Environment setup

We use CodeceptJS and WebDriver for test automation, so we need to install its requirements first: 

- Node.js version 8.9 or higher
- Java version 8 or higher
- Google Chrome for test running

After that we can install CodeceptJS, WebDriver and selenium server:
```
npm install codeceptjs webdriverio selenium-standalone --save-dev
```
```
npx selenium-standalone install
```

### Testing data

After that we should specify variables for run tests on selected sandbox. 

Go to `codecept.conf.js` and specify next values:

-`url:` - link to sandbox (without specifying concrete page, just general link ) 

Go to `data.json` and add next values:

- `email` & `password` - test user credentials for login to the site (if you don't have any - create a test user on sandbox firstly)
- `paypalEmail` & `paypalPassword` - test Paypal user credentials
- `paypalCreditEmail` & `paypalCreditPassword` - test Paypal user credentials (that allow to test Paypal Credit function
- `paypalCheckEmail`& `paypalCheckEmail`- another one test Paypal user credentials (used for checking changing Paypal accounts)
- `firstName` ... `phone` - test shipping data. It used for tesing shipping address form, so they should match with form fields.
- `firstNameCheck` ... `phoneCheck` - another test shipping data (used for checking updating shipping address).
- `nameOnCard` ... `expiration` - test credit card data.
- `productPageTV` - product page link. Select a product that can be directly added to the cart (e.g. without selecting size, color, model, etc)
- `loginPage` - login page link.
- `account` - reference link to 'My account' page. No need to change it.

### Custom functions

All the custom functions, that extend standard methods can be found in `steps_file.js`. 

### Test running

For test running use a command line.
Go to the folder that contain the tests and config:
```
cd test_folder
```
Next step is to start a selenium server:
```
npx selenium-standalone start
```
Keep it running and open another console tab or window. Go to the folder:
```
cd test_folder
```
For run only one test with displaying steps use:
```
npx codeceptjs run selected_test.js --steps
```
For run all the test from current folder:
```
npx codeceptjs run --steps
```
### References

All details can be found in official CodeceptJS documentation:

https://codecept.io/webdriver/