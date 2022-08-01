'use strict';

const ppCreditBannerWidth = ''; // (String) Width can't be a random value. See PayPal banner sizes on the PayPal's finance portal for more information
const ppCreditBannerHeight = ''; // (String) Height can't be a random value. See PayPal banner sizes on the PayPal's finance portal for more information
const Site = require('dw/system/Site');
const PromotionMgr = require('dw/campaign/PromotionMgr');

/**
 * Creates an object with credit banner config
 * @returns {Object} Object with credit banner config
 */
function getCreditBannerData() {
    var site = Site.current;
    var creditCampaign = site.getCustomPreferenceValue('PP_Credit_Campaign_ID');
    var bannerSize;
    if (!empty(creditCampaign)) {
        var campaign = PromotionMgr.getCampaign(creditCampaign);
        if (campaign && !campaign.isActive()) return { isActive: false };
    }

    if (!empty(ppCreditBannerHeight) && !empty(ppCreditBannerWidth)) {
        bannerSize = ppCreditBannerWidth + 'x' + ppCreditBannerHeight;
    }

    return {
        bannerSize: bannerSize,
        publisherID: site.getCustomPreferenceValue('PP_Merchant_Publisher_ID'),
        isActive: site.getCustomPreferenceValue('PP_ShowCreditFinancialBanners')
    };
}

module.exports = getCreditBannerData();
