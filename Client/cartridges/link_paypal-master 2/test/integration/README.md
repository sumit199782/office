# Paypal integration test

## Before runinng
To run integration test node version 8+ required. 
Install all dependencies from package.json in the root folder with `npm install` command

Add you sandbox credentials, url, code version in dw.json file in the root folder

File  `test/integration/it.config.js` also contains option to test paypal_credit_financing_options cartridge (default is false) and product id to test (default is sony-kdl-40w4100M).

## Test run
To run test use `npm run integration`
