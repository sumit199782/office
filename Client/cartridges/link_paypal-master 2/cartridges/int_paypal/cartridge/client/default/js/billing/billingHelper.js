import initPaypalButton from './guest/initBillingButton';
import initPaypalBAButton from './registered/initBillingAgreementButton';
import {
    assignEmailForSavedBA,
    handleCheckboxChange,
    toggleBABtnVisibility,
    clearSessionOption
} from './registered/billingAgreementHelper';

let $paypalButton = document.querySelector('.js_paypal_button_on_billing_form');
let $paypalAccountsDropdown = document.querySelector('#paypalAccountsDropdown');
const $continueButton = document.querySelector('button[value=submit-payment]');
let isRegisteredUser = document.querySelector('.data-checkout-stage') && document.querySelector('.data-checkout-stage').getAttribute('data-customer-type') === 'registered';
let $restPaypalAccountsList = document.querySelector('#restPaypalAccountsList');
let $billingButtonContainer = document.querySelector('#billing-paypal-button-container');
let isBAEnabled = $billingButtonContainer && JSON.parse($billingButtonContainer.getAttribute('data-is-ba-enabled'));

/**
 * Shows continue button if it's not visible
 */
function showContinueButton() {
    if ($continueButton.style.display !== '') {
        $continueButton.style.display = '';
    }
}

/**
 * Hides continue button if it's not hidden
 */
function hideContinueButton() {
    if ($continueButton.style.display !== 'none') {
        $continueButton.style.display = 'none';
    }
}

/**
 * Shows PayPal div container if it's not visible and hides continue button
*/
function showPaypalBtn() {
    if (!$paypalButton) {
        $paypalButton = document.querySelector('.js_paypal_button_on_billing_form');
    }
    if ($paypalButton.style.display !== 'block') {
        $paypalButton.style.display = 'block';
    }
    hideContinueButton();
}

/**
 * Hides PayPal div container if it's not hidden and shows continue button
*/
function hidePaypalBtn() {
    if (!$paypalButton) {
        $paypalButton = document.querySelector('.js_paypal_button_on_billing_form');
    }
    if ($paypalButton.style.display !== 'none') {
        $paypalButton.style.display = 'none';
    }
    showContinueButton();
}

/**
 * Shows PayPal block with accounts dropdown if it's not visible
*/
function showPaypalBlock() {
    if (!$paypalAccountsDropdown) {
        $paypalAccountsDropdown = document.querySelector('#paypalAccountsDropdown');
    }
    if ($paypalAccountsDropdown.style.display !== 'block') {
        $paypalAccountsDropdown.style.display = 'block';
    }
}

/**
 * Hides PayPal block with accounts dropdown if it's visible
*/
function hidePaypalBlock() {
    if (!$paypalAccountsDropdown) {
        $paypalAccountsDropdown = document.querySelector('#paypalAccountsDropdown');
    }
    if ($paypalAccountsDropdown.style.display !== 'none') {
        $paypalAccountsDropdown.style.display = 'none';
    }
}

/**
 * Injects SDK into billing page
*/
function injectBillingSDK() {
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function () {
        isBAEnabled ?
            initPaypalBAButton() :
            initPaypalButton();
    };
    script.src = window.paypalUrls.billingSdkUrl;
    script.setAttribute('data-partner-attribution-id', window.paypalUrls.partnerAttributionId);
    head.appendChild(script);
}

/**
 * Shows is new account selected
 * @param {Element} $accountList - $accountList element
 * @returns {boolean} value whether new account selected
*/
function isNewAccountSelected($accountList) {
    return $accountList
        .querySelector('option:checked')
        .value === 'newaccount';
}

/**
 * Changes PayPal button visibility depending on checked option of element
 * @param {Element} $accountList - $accountList element
*/
function togglePaypalBtnVisibility($accountList) {
    isNewAccountSelected($accountList) ?
        showPaypalBtn() :
        hidePaypalBtn();
}

/**
 * Handles tabs changing
 * @param {event} e - event
*/
function handleTabChange(e) {
    const isPaypalContentSelected = e.target.hash === '#paypal-content';
    if (!isPaypalContentSelected) {
        showContinueButton();
        return;
    }
    isNewAccountSelected($restPaypalAccountsList) ?
        hideContinueButton() :
        showContinueButton();
    if (isRegisteredUser && isBAEnabled) {
        assignEmailForSavedBA();
        handleCheckboxChange();
    }
}

/**
 * Updates session account email if it is differ from existed or email doesn't exist (for guest or disabled billing agreement)
 * @param {Object} _ - arg
 *
*/
function updateSessionAccountEmail(_, { order: { paypalPayerEmail } }) {
    if (!paypalPayerEmail) return;
    showPaypalBlock();
    const $sessionPaypalAccount = document.querySelector('#sessionPaypalAccount');
    if ($sessionPaypalAccount && $sessionPaypalAccount.value !== paypalPayerEmail) {
        $sessionPaypalAccount.value = paypalPayerEmail;
        $sessionPaypalAccount.innerText = paypalPayerEmail;
        $sessionPaypalAccount.selected = true;
        $restPaypalAccountsList.onchange();
    }
}

/**
 * Updates paypal content to initial state on client side if payment method was changed from paypal to different one
 * @param {Object} _ - arg
 * @param {Object} customer - customer data object
*/
function updateClientSide(_, customer) {
    var selectedPaymentInstruments = customer.order.billing.payment.selectedPaymentInstruments;
    var paypalPaymentMethod = document.querySelector('.nav-link.paypal-tab').parentElement.getAttribute('data-method-id');
    var giftCertTabLink = document.querySelector('.nav-link.gift-cert-tab');
    var $sessionPaypalAccount = $restPaypalAccountsList.querySelector('option[id=sessionPaypalAccount]');

    if (selectedPaymentInstruments.length > 0 && ($sessionPaypalAccount && $sessionPaypalAccount.value !== '')) {
        selectedPaymentInstruments.forEach(paymentInstr => {
            if (paymentInstr.paymentMethod !== paypalPaymentMethod) {
                if (!isBAEnabled) {
                    $sessionPaypalAccount.value = '';
                    $restPaypalAccountsList.querySelector('option:checked').value = 'newaccount';
                    document.querySelector('#usedPaymentMethod').value = '';
                    hidePaypalBlock();
                    togglePaypalBtnVisibility($restPaypalAccountsList);
                } else if (isBAEnabled && $sessionPaypalAccount) {
                    clearSessionOption();
                    var $defaultBA = $restPaypalAccountsList.querySelector('option[data-default=true]');
                    $defaultBA ? $defaultBA.selected = true : hidePaypalBlock();
                    toggleBABtnVisibility();
                }
                injectBillingSDK();
            }
        });
    } else if (selectedPaymentInstruments.length > 0 && giftCertTabLink) {
        if (selectedPaymentInstruments.find(paymentInstr => paymentInstr.paymentMethod === giftCertTabLink.parentElement.getAttribute('data-method-id'))) {
            giftCertTabLink.click();
        }
    }
}

/**
 * Returns value whether LPM was used or not
 * @param {Element} $usedPaymentMethod - $usedPaymentMethod element
 * @returns {boolean} value whether LPM was used
*/
function isLpmUsed($usedPaymentMethod) {
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
    if (disableFunds.indexOf($usedPaymentMethod.value) !== -1) {
        return true;
    }
    return false;
}

/**
 * Updates "Submit order" button text on billing page in case of Venmo checkout
 * Needed in case of checkout NOT through smart button (when Venmo account is chosen in dropdown)
*/
function updateSubmitOrderButton() {
    var $usedPaymentMethod = document.querySelector('#usedPaymentMethod');
    if ($usedPaymentMethod && $usedPaymentMethod.value === 'Venmo') {
        document.querySelector('button.place-order').innerText = 'Place Order with Venmo';
    }
}

export {
    injectBillingSDK,
    showPaypalBlock,
    showPaypalBtn,
    hidePaypalBtn,
    hideContinueButton,
    handleTabChange,
    togglePaypalBtnVisibility,
    updateSessionAccountEmail,
    isNewAccountSelected,
    updateClientSide,
    showContinueButton,
    isLpmUsed,
    updateSubmitOrderButton
};
