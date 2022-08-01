const defaultStyle = {
    color: 'gold',
    shape: 'rect',
    layout: 'vertical',
    label: 'paypal',
    tagline: false
};

/**
 *  Gets paypal button styles
 * @param {Element} button - button element
 * @returns {Object} with button styles or if error appears with default styles
 */
function getPaypalButtonStyle(button) {
    try {
        const config = button.getAttribute('data-paypal-button-config');
        if (config) {
            const buttonConfigs = JSON.parse(config);
            return buttonConfigs.style;
        }
    } catch (error) {
        return {
            style: defaultStyle
        };
    }
}

/**
 * Creates a redirecting form to Order-Confirm endpoint
 * @param {Object} param  The helping object for creating a from
 * @returns {Object} form element
 */
function createConfirmForm(param) {
    var form = $('<form>')
        .appendTo(document.body)
        .attr({
            method: 'POST',
            action: param.url
        });

    $('<input>')
        .appendTo(form)
        .attr({
            name: 'orderID',
            value: param.orderID
        });

    $('<input>')
        .appendTo(form)
        .attr({
            name: 'orderToken',
            value: param.orderToken
        });

    return form;
}

/**
 * Prepare and submits form in order to confirm order with Lpm
 * @param {string} redirectUrl Redirect Url
 */
function processLpmConfirmForm(redirectUrl) {
    var splitUrl = redirectUrl.split('?');
    var url = splitUrl[0];
    var paramsString = splitUrl[1];
    var searchParams = new URLSearchParams(paramsString);
    var formParam = {
        orderID: searchParams.get('orderID'),
        orderToken: searchParams.get('orderToken'),
        url: url
    };
    var form = createConfirmForm(formParam);

    form.submit();
}

export {
    getPaypalButtonStyle,
    processLpmConfirmForm
};
