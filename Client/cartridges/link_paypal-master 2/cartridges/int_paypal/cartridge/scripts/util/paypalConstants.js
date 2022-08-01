module.exports = {
    // Request Type
    ACCESS_TOKEN: 'access_token',
    USER_INFO: 'userinfo',
    VERIFY_WH_SIG: 'verify-webhook-signature',
    // Event types
    PAYMENT_AUTHORIZATION_VOIDED: 'PAYMENT.AUTHORIZATION.VOIDED',
    PAYMENT_CAPTURE_REFUNDED: 'PAYMENT.CAPTURE.REFUNDED',
    PAYMENT_CAPTURE_COMPLETED: 'PAYMENT.CAPTURE.COMPLETED',
    // Status
    STATUS_SUCCESS: 'SUCCESS',
    // Http methods
    METHOD_POST: 'POST',
    METHOD_GET: 'GET',
    // Payment status names
    PAYMENT_STATUS_REFUNDED: 'REFUNDED',
    // Connect with Paypal
    CONNECT_WITH_PAYPAL_CONSENT_DENIED: 'Consent denied',
    // Endpoint names
    ENDPOINT_ACCOUNT_SHOW: 'Account-Show',
    ENDPOINT_CHECKOUT_LOGIN: 'Checkout-Login',
    // payment method id
    PAYMENT_METHOD_ID_PAYPAL: 'PayPal',
    PAYMENT_METHOD_ID_VENMO: 'Venmo'
};
