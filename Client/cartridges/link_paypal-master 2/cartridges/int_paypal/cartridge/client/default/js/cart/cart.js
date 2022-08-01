/* eslint-disable no-nested-ternary */
import initPaypalButton from './initCartButton';
import initPaypalBAButton from './registered/initBillingAgreementButton';
import { updateOrderData, returnFromCart } from '../api';

let $paypalImage = document.querySelector('#paypal_image') || document.querySelector('#venmo_image');
let $cartButton = document.querySelector('.js_paypal_button_on_cart_page');
let $isBAEnabled = $cartButton && JSON.parse($cartButton.getAttribute('data-paypal-ba-enabled'));
const paypalUrls = document.querySelector('.js_paypal-content').getAttribute('data-paypal-urls');
window.paypalUrls = JSON.parse(paypalUrls);

/**
 * Injects SDK into page for cart/minicart
*/
function injectPaypalSDK() {
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function () {
        $isBAEnabled ?
            initPaypalBAButton() :
            initPaypalButton();
    };
    script.src = window.paypalUrls.cartSdkUrl;
    script.setAttribute('data-partner-attribution-id', window.paypalUrls.partnerAttributionId);
    head.appendChild(script);
}

if ($paypalImage) {
    let isUpdateRequired = JSON.parse($paypalImage.getAttribute('data-is-update-required'));
    $paypalImage.addEventListener('click', isUpdateRequired ? updateOrderData : returnFromCart);
} else {
    // We do not inject SDK if SDK is already injected and window.paypal exists to avoid PayPal components destroying
    window.paypal ? ($isBAEnabled ?
        initPaypalBAButton() :
        initPaypalButton()) : injectPaypalSDK();
}
