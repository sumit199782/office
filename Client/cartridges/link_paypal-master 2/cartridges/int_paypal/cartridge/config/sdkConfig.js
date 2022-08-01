const allowedCurrencies = [
    'AUD',
    'BRL',
    'CAD',
    'CZK',
    'EUR',
    'HKD',
    'HUF',
    'INR',
    'ILS',
    'JPY',
    'MYR',
    'MXN',
    'TWD',
    'NZD',
    'NOK',
    'PHP',
    'PLN',
    'GBP',
    'RUB',
    'SGD',
    'THB',
    'USD'
];

var smartButtonStyles = JSON.parse(require('dw/system/Site').current.getCustomPreferenceValue('PP_API_Smart_Button_Styles'));

const disableFunds = [
    'sepa',
    'bancontact',
    'eps',
    'giropay',
    'ideal',
    'mybank',
    'p24',
    'sofort'
];

const paypalStaticImageLink = 'https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png';
const connectWithPaypalStaticImageLink = 'https://www.paypalobjects.com/webstatic/en_US/developer/docs/login/connectwithpaypalbutton.png';

module.exports = {
    disableFunds: disableFunds,
    paypalStaticImageLink: paypalStaticImageLink,
    connectWithPaypalStaticImageLink: connectWithPaypalStaticImageLink,
    allowedCurrencies: allowedCurrencies,
    paypalBillingButtonConfig: { style: smartButtonStyles.billing },
    paypalCartButtonConfig: { style: smartButtonStyles.cart },
    paypalPdpButtonConfig: { style: smartButtonStyles.pdp },
    paypalMinicartButtonConfig: { style: smartButtonStyles.minicart }
};
