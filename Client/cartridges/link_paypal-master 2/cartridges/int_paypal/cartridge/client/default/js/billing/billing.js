import initPaypalButton from './guest/initBillingButton';
import initPaypalBAButton from './registered/initBillingAgreementButton';

import {
    injectBillingSDK,
    handleTabChange,
    togglePaypalBtnVisibility,
    updateSessionAccountEmail,
    isNewAccountSelected,
    updateClientSide,
    updateSubmitOrderButton
} from './billingHelper';

import {
    toggleBABtnVisibility,
    assignEmailForSavedBA,
    handleCheckboxChange
} from './registered/billingAgreementHelper';

let sdkLoaded = false;
let $restPaypalAccountsList = document.querySelector('#restPaypalAccountsList');
let isRegisteredUser = document.querySelector('.data-checkout-stage').getAttribute('data-customer-type') === 'registered';
let $billingButtonContainer = document.querySelector('#billing-paypal-button-container');
let isBAEnabled = $billingButtonContainer && JSON.parse($billingButtonContainer.getAttribute('data-is-ba-enabled'));
const paypalUrls = document.querySelector('.js_paypal-content').getAttribute('data-paypal-urls');
window.paypalUrls = JSON.parse(paypalUrls);

if (window.paypal && !isBAEnabled) {
    sdkLoaded = true;
    initPaypalButton();
} else {
    if (window.paypal && isNewAccountSelected($restPaypalAccountsList) && isBAEnabled) {
        initPaypalBAButton();
        sdkLoaded = true;
    }

    let ppPaymentOptionID = document.querySelector('.nav-link.paypal-tab').parentElement.getAttribute('data-method-id');
    let activeTab = document.querySelector('.payment-information');
    document.querySelector('.nav-item .paypal-tab').click();
    if (ppPaymentOptionID !== activeTab.getAttribute('data-payment-method-id')) {
        activeTab.setAttribute('data-payment-method-id', ppPaymentOptionID);
        $('.payment-information').data('payment-method-id', ppPaymentOptionID); // MFRA jquery hack
    }

    if (!isBAEnabled) {
        togglePaypalBtnVisibility($restPaypalAccountsList);
    } else {
        toggleBABtnVisibility($restPaypalAccountsList);
        assignEmailForSavedBA();
    }
}

$('.payment-options[role=tablist] a[data-toggle="tab"]').on('shown.bs.tab', handleTabChange);

if ($restPaypalAccountsList) {
    $restPaypalAccountsList.onchange = function (e) {
        const $accountList = e ? e.target : $restPaypalAccountsList;
        if (!sdkLoaded && isNewAccountSelected($restPaypalAccountsList)) {
            injectBillingSDK();
            sdkLoaded = true;
        }

        if (!isBAEnabled) {
            togglePaypalBtnVisibility($accountList);
        } else {
            toggleBABtnVisibility($accountList);
            assignEmailForSavedBA();
        }
    };
}

if (!isRegisteredUser || !isBAEnabled) {
    $('body').on('checkout:updateCheckoutView', updateSessionAccountEmail);
}

$('body').on('checkout:updateCheckoutView', updateClientSide);

if (!isBAEnabled) {
    $('body').on('checkout:updateCheckoutView', updateSubmitOrderButton);

    updateSubmitOrderButton();

    document.querySelector('.payment-summary .edit-button').onclick = function () {
        document.querySelector('button.place-order').innerText = 'Place Order';
    };
}

if (document.querySelector('.paypal-checkbox-container')) {
    document.querySelectorAll('.paypal-checkbox-container .custom-checkbox').forEach(checkbox => checkbox.addEventListener('change', handleCheckboxChange));
}
