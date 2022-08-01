/**
 * Shows paypal PDP button/static image
 * @param {Object} $paypalPDPButton - paypal button element
 */
function showPDPButton($paypalPDPButton) {
    $paypalPDPButton.style.display = '';
}

/**
 * Hides paypal PDP button/static image
 * @param {Object} $paypalPDPButton - paypal button element
 */
function hidePDPButton($paypalPDPButton) {
    $paypalPDPButton.style.display = 'none';
}

/**
 * Adds product to basket on paypal button/static image click when PDP flow
 * @returns {Object} response with required data
 */
function addProductForPDPbtnFlow() {
    var $bundleItem = $('.bundle-item');
    /**
     * Gets options
     * @param {Object} $productContainer - product container
     * @returns {string} options
     */
    function getOptions($productContainer) {
        var options = $productContainer
            .find('.product-option')
            .map(function () {
                var $elOption = $(this).find('.options-select');
                var urlValue = $elOption.val();
                var selectedValueId = $elOption.find('option[value="' + urlValue + '"]')
                    .data('value-id');
                return {
                    optionId: $(this).data('option-id'),
                    selectedValueId: selectedValueId
                };
            }).toArray();

        return JSON.stringify(options);
    }

    var pid = $('.product-detail:not(".bundle-item")').data('pid');
    var $btn = $('.paypal_pdp_button');
    var $productContainer = $btn.closest('.product-detail');

    var form = {
        pid: pid,
        quantity: $('.quantity-select').val()
    };

    if (!$bundleItem.length) {
        form.options = getOptions($productContainer);
    } else {
        var items = $bundleItem.map(function () {
            return {
                pid: $(this).find('.product-id').text(),
                quantity: parseInt($(this).find('label.quantity').data('quantity'), 10)
            };
        });
        form.childProducts = JSON.stringify(items.toArray());
    }
    var response = $.ajax({
        url: $('.add-to-cart-url').val(),
        method: 'POST',
        async: false,
        data: form
    }).responseJSON;
    response.pid = pid;
    return response;
}

/**
 * Appends params to a url
 * @param {string} url - Original url
 * @param {Object} param - Parameters to append
 * @returns {string} result url with appended parameters
 */
function appendToUrl(url, param) {
    var newUrl = url;
    newUrl += (newUrl.indexOf('?') !== -1 ? '&' : '?') + Object.keys(param).map(function (key) {
        return key + '=' + encodeURIComponent(param[key]);
    }).join('&');

    return newUrl;
}

// Handling PDP button/static image behavior
var $paypalPDPButton = document.querySelector('.paypal_pdp_button');
if ($paypalPDPButton) {
    var $price = document.querySelector('.price .sales .value');
    var isZeroAmount = false;
    var $miniCartQuantity = document.querySelector('.minicart-quantity');
    var $addToCartButton = document.querySelector('.add-to-cart') || document.querySelector('.add-to-cart-global');

    // Check minicart quantity and hide PDPbutton if it is not empty
    if (($miniCartQuantity && parseInt($miniCartQuantity.textContent, 0) > 0)
        || ($price && $price.getAttribute('content') === '0.00')) {  // Check if product price is zero
        hidePDPButton($paypalPDPButton);
    }

    if ($addToCartButton.disabled) {
        hidePDPButton($paypalPDPButton);
    }

    $('body').on('product:afterAddToCart', function () {
        hidePDPButton($paypalPDPButton);
    });

    $('body').on('cart:update', function () {
        $miniCartQuantity = parseInt(document.querySelector('.minicart-quantity').textContent, 0);
        if ($addToCartButton.disabled) {
            hidePDPButton($paypalPDPButton);
        }
        if ($miniCartQuantity === 0 && !$addToCartButton.disabled) {
            showPDPButton($paypalPDPButton);
        }
    });

    $('body').on('product:statusUpdate', function () {
        $miniCartQuantity = parseInt(document.querySelector('.minicart-quantity').textContent, 0);
        $price = document.querySelector('.price .sales .value');
        isZeroAmount = false;
        if ($price) {
            isZeroAmount = $price.getAttribute('content') === '0.00';
        }

        if ($miniCartQuantity === 0) {
            if ($addToCartButton.disabled || isZeroAmount) {
                hidePDPButton($paypalPDPButton);
            }
            if (!$addToCartButton.disabled && !isZeroAmount) {
                showPDPButton($paypalPDPButton);
            }
        }
    });
}

export {
    addProductForPDPbtnFlow,
    appendToUrl
};
