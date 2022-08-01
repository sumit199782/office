$(".add-to-cart-btn").on('click', function () { 
    console.log('hello');
    var addToCartUrl;
    var pid;
    var pidsObj;
    var qty;
    $('body').trigger('product:beforeAddToCart', this);
    pid = $(this).attr("value");
    qty=$("#product-quantity").val();
    if(!qty)
    {
        qty=1;
    }

    addToCartUrl = document.getElementById('add-to-cart-url').value
    var form = {
        pid: pid,
        quantity: qty
    };
    $(this).trigger('updateAddToCartFormData', form);
    if (addToCartUrl) {
        $('body').spinner().start();
        $.ajax({
            url: addToCartUrl,
            method: 'POST',
            data: form,
            success: function (data) {
                
                 handlePostCartAdd(data);
                 $('body').trigger('product:afterAddToCart', data);
                 miniCartReportingUrl(data.reportingURL);
                if (data && $.isNumeric(data.quantityTotal)) {
                    $('.minicart .minicart-quantity').text(data.quantityTotal);
                    $('.minicart .minicart-link').attr({
                        'aria-label': data.minicartCountOfItems,
                        title: data.minicartCountOfItems
                    });
                }
                $.spinner().stop();
            },
            error: function () {
                $.spinner().stop();
            }
        });
    }
});
/**
 * Updates the Mini-Cart quantity value after the customer has pressed the "Add to Cart" button
 * @param {string} response - ajax response from clicking the add to cart button
 */
 function handlePostCartAdd(response) {
    $('.minicart').trigger('count:update', response);
    var messageType = response.error ? 'alert-danger' : 'alert-success';
    // show add to cart toast
    if (response.newBonusDiscountLineItem
        && Object.keys(response.newBonusDiscountLineItem).length !== 0) {
        chooseBonusProducts(response.newBonusDiscountLineItem);
    } else {
        if ($('.add-to-cart-messages').length === 0) {
            $('body').append(
                '<div class="add-to-cart-messages"></div>'
            );
        }
        $('.add-to-cart-messages').append(
            '<div class="alert ' + messageType + ' add-to-basket-alert text-center" role="alert">'
            + response.message
            + '</div>'
        );
        setTimeout(function () {
            $('.add-to-basket-alert').remove();
        }, 3000);
    }
}
/**
 * Makes a call to the server to report the event of adding an item to the cart
 *
 * @param {string | boolean} url - a string representing the end point to hit so that the event can be recorded, or false
 */
 function miniCartReportingUrl(url) {
    if (url) {
        $.ajax({
            url: url,
            method: 'GET',
            success: function () {
                // reporting urls hit on the server
            },
            error: function () {
                // no reporting urls hit on the server
            }
        });
    }
}
