const bannerConfigs = JSON.parse(require('dw/system/Site').current.getCustomPreferenceValue('PP_API_Credit_Banner_Styles'));

module.exports = {
    cartMessageConfig: bannerConfigs.cartCreditConfig,
    productDetailMessageConfig: bannerConfigs.productCreditConfig,
    categoryMessageConfig: bannerConfigs.categoryCreditConfig
};
