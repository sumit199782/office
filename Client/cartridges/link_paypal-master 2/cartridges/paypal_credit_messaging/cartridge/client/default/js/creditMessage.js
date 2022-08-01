$('body').on('product:afterAttributeSelect', (e, { data: { product: { price, selectedQuantity } }, container }) => {
    const newPrice = parseFloat(price.sales.value) * parseFloat(selectedQuantity);
    const $creditMessage = container[0].querySelector('.js_credit_message_pdp');
    $creditMessage && $creditMessage.setAttribute('data-pp-amount', newPrice);
});
