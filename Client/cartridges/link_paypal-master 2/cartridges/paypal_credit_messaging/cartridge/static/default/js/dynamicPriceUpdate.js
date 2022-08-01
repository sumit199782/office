/* eslint-disable one-var */
$('body').on('product:afterAttributeSelect', (t, { data: { product: { price: e, selectedQuantity: a } }, container: r })=>{
    const o = parseFloat(e.sales.value) * parseFloat(a),
        s = r[0].querySelector('.js_credit_message_pdp'); s && s.setAttribute('data-pp-amount', o);
});
