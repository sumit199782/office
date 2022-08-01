import {
    hideContinueButton,
    isNewAccountSelected,
    showContinueButton,
    showPaypalBlock
} from '../billingHelper';

let $billingBAbutton = document.querySelector('.paypal-checkout-ba-button');
let $restPaypalAccountsList = document.querySelector('#restPaypalAccountsList');
let $paypalAccountSave = document.querySelector('#savePaypalAccount');
let $paypalAccountMakeDefault = document.querySelector('#paypalAccountMakeDefault');

/**
 * Sets BA id & email to form values
 * @param {string} baID - billing agreement active ID
 * @param {string} baEmail - billing agreement active email
*/
function setBAFormValues(baID, baEmail) {
    document.getElementById('billingAgreementID').value = baID;
    document.getElementById('billingAgreementPayerEmail').value = baEmail;
}

/** Shows PayPal BA button if it's not visible and hides continue button
*/
function showPaypalBABtn() {
    if (!$billingBAbutton) {
        $billingBAbutton = document.querySelector('.paypal-checkout-ba-button');
    }
    if ($billingBAbutton.style.display !== 'block') {
        $billingBAbutton.style.display = 'block';
    }
    hideContinueButton();
}

/** Hides PayPal BA button if it's not hidden and shows continue button
*/
function hidePaypalBABtn() {
    if (!$billingBAbutton) {
        $billingBAbutton = document.querySelector('.paypal-checkout-ba-button');
    }
    if ($billingBAbutton.style.display !== 'none') {
        $billingBAbutton.style.display = 'none';
    }
    showContinueButton();
}

/** Put value of checkbox makeDefault/saveAccount for backend
*/
function saveCheckboxState() {
    var $paypal_makeDefault = document.querySelector('#paypal_makeDefault');
    var $paypal_saveAccount = document.querySelector('#paypal_saveAccount');
    $paypal_makeDefault.value = $paypalAccountMakeDefault.checked;
    $paypal_saveAccount.value = $paypalAccountSave.checked;
}

/** Handle makeDefault/saveAccount checkboxes state on change
*/
function handleCheckboxChange() {
    let $selectedAccount = $restPaypalAccountsList.querySelector('option:checked');
    let isSessionAccountAppended = JSON.parse($selectedAccount.getAttribute('data-append'));
    let hasDefaultPaymentMethod = JSON.parse($restPaypalAccountsList.getAttribute('data-has-default-account'));

    if (isSessionAccountAppended || $selectedAccount.value === 'newaccount') {
        if (!$paypalAccountSave.checked) {
            $paypalAccountMakeDefault.checked = false;
            $paypalAccountMakeDefault.disabled = true;
        } else {
            $paypalAccountMakeDefault.disabled = false;
            if (!hasDefaultPaymentMethod) {
                $paypalAccountMakeDefault.checked = true;
            }
        }
    }
    saveCheckboxState();
}

/** Show/hide/check/disable checkboxes depends on selected type of account
*/
function toggleCustomCheckbox() {
    let $selectedAccount = $restPaypalAccountsList.querySelector('option:checked');
    let $paypalAccountMakeDefaultContainer = document.querySelector('#paypalAccountMakeDefaultContainer');
    let $paypalAccountSaveContainer = document.querySelector('#savePaypalAccountContainer');
    let hasPPSavedAccount = JSON.parse($restPaypalAccountsList.getAttribute('data-has-saved-account'));
    let hasDefaultPaymentMethod = JSON.parse($restPaypalAccountsList.getAttribute('data-has-default-account'));
    let isSessionAccountAppended = JSON.parse($selectedAccount.getAttribute('data-append'));
    let isBALimitReached = JSON.parse($restPaypalAccountsList.getAttribute('data-ba-limit-reached'));

    if ($paypalAccountSaveContainer) {
        if ($selectedAccount.dataset.default === 'true') {
            $paypalAccountMakeDefaultContainer.style.display = 'none';
            $paypalAccountMakeDefault.checked = true;
            $paypalAccountMakeDefault.disabled = false;
            if (hasPPSavedAccount && !hasDefaultPaymentMethod) {
                $paypalAccountSave.checked = true;
            } else {
                $paypalAccountSaveContainer.style.display = 'none';
            }
            saveCheckboxState();
        }
        var isDataSetDefault = $selectedAccount.dataset.default === 'false' || $selectedAccount.dataset.default === 'null';
        if (isDataSetDefault && !($selectedAccount.value === 'newaccount') && !isSessionAccountAppended) {
            $paypalAccountMakeDefaultContainer.style.display = 'block';
            $paypalAccountSaveContainer.style.display = 'none';
            $paypalAccountSave.checked = false;
            $paypalAccountMakeDefault.disabled = false;
        }

        if ($selectedAccount.value === 'newaccount' || isSessionAccountAppended) {
            if (!hasPPSavedAccount) {
                $paypalAccountMakeDefaultContainer.style.display = 'none';
                $paypalAccountMakeDefault.checked = true;
                $paypalAccountMakeDefault.disabled = false;
                $paypalAccountSaveContainer.style.display = 'block';
                if (($selectedAccount.value !== 'newaccount' && (hasDefaultPaymentMethod || isSessionAccountAppended)) ||
                    ($selectedAccount.value === 'newaccount' && !isSessionAccountAppended)) {
                    $paypalAccountSave.checked = true;
                } else {
                    $paypalAccountSave.checked = false;
                }

                saveCheckboxState();
                return;
            }
            handleCheckboxChange();

            if (isBALimitReached) {
                $paypalAccountSaveContainer.style.display = 'none';
                $paypalAccountMakeDefaultContainer.style.display = 'none';
            } else {
                $paypalAccountSaveContainer.style.display = 'block';
                $paypalAccountMakeDefaultContainer.style.display = 'block';
            }

            if (hasDefaultPaymentMethod) {
                return;
            }
            hasPPSavedAccount && !hasDefaultPaymentMethod ?
                $paypalAccountMakeDefaultContainer.style.display = 'none' :
                $paypalAccountMakeDefault.disabled = true;

            $paypalAccountMakeDefault.checked = true;
        }
    }
}

/** Show billing agreement btn - hide paypal btn and vise versa
*/
function toggleBABtnVisibility() {
    toggleCustomCheckbox();

    if (isNewAccountSelected($restPaypalAccountsList)) {
        showPaypalBABtn();
        hideContinueButton();
        return;
    }
    hidePaypalBABtn();
    showPaypalBlock();
}

/** Assign billing agreement emails on change into input field
*/
function assignEmailForSavedBA() {
    let $paypalActiveAccount = document.querySelector('#paypal_activeAccount');
    let $selectedAccount = $restPaypalAccountsList.querySelector('option:checked');

    if (isNewAccountSelected($restPaypalAccountsList)) {
        $paypalActiveAccount.value = '';
        document.getElementById('billingAgreementID').value = '';
        document.getElementById('billingAgreementPayerEmail').value = '';
    } else {
        $paypalActiveAccount.value = $restPaypalAccountsList.querySelector('option:checked').value;

        setBAFormValues($selectedAccount.dataset.baId, $selectedAccount.value);
    }
}

/**
 *  Clear element to an Existing restPaypalAccountsList Collection
 *
 */
function clearSessionOption() {
    var $option = document.querySelector('#sessionPaypalAccount');
    $option.text = '';
    $option.value = '';
    $option.setAttribute('data-append', false);
    $option.selected = false;
    $option.style.display = 'none';
    $option.setAttribute('data-ba-id', '');
    document.getElementById('billingAgreementID').value = '';
    document.getElementById('billingAgreementPayerEmail').value = '';

    toggleBABtnVisibility();
}

/**
 *  Update element under restPaypalAccountsList Collection
 *
 * @param {string} email - billing agreement email
 */
function updateSessionOption(email) {
    var $option = document.querySelector('#sessionPaypalAccount');
    $option.text = email;
    $option.value = email;
    $option.selected = 'selected';
    $option.style.display = 'block';
    $option.setAttribute('data-append', true);
    document.querySelector('#restPaypalAccountsList').value = email;

    hidePaypalBABtn();
    showPaypalBlock();
    showContinueButton();
}

export {
    toggleBABtnVisibility,
    assignEmailForSavedBA,
    handleCheckboxChange,
    clearSessionOption,
    updateSessionOption,
    setBAFormValues
};
