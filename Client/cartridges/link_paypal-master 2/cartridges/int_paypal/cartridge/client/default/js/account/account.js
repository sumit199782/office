import initPaypalBAButton from './initBillingAgreementButton';

const loaderInstance = require('../loader');
let $loaderContainer = document.querySelector('.paypalLoader');
let loader = loaderInstance($loaderContainer);

let $paypalAccountBtn = document.querySelector('.paypal-account-button');
let $addNewAccountBtn = document.querySelector('.add-paypal-account');
let $paypalBlock = document.querySelector('.paypal-block');
let $limitMsg = document.querySelector('.limitMsg');
const paypalUrls = $paypalAccountBtn && $paypalAccountBtn.getAttribute('data-paypal-urls');
window.paypalUrls = JSON.parse(paypalUrls);


if ($addNewAccountBtn && $paypalAccountBtn) {
    let isBaLimitReached = JSON.parse($paypalAccountBtn.getAttribute('data-paypal-is-ba-limit-reached'));
    $addNewAccountBtn.onclick = function () {
        if (window.paypal && $paypalAccountBtn.innerHTML === '' && !isBaLimitReached) {
            initPaypalBAButton();
        } else if (isBaLimitReached) {
            $limitMsg.style.display = 'block';
        }
    };
}

if ($paypalBlock) {
    $paypalBlock.onclick = function (e) {
        let target = e.target;
        if (target.classList.contains('remove-paypal-button')) {
            let baEmail = target.dataset.billingAgreementEmail;
            loader.show();
            return $.ajax({
                url: window.paypalUrls.removeBillingAgreement + `?billingAgreementEmail=${baEmail}`,
                type: 'DELETE'
            })
                .then(() => {
                    loader.hide();
                    location.reload();
                })
                .fail(() => {
                    loader.hide();
                });
        }
    };
}
