module.exports = {
    // search types
    SEARCH_BY_TRANSACTION_ID: 'SEARCH_BY_TRANSACTION_ID',
    SEARCH_BY_ORDER_NUMBER: 'SEARCH_BY_ORDER_NUMBER',
    // intents
    INTENT_CAPTURE: 'CAPTURE',
    // statuses
    STATUS_COMPLETED: 'COMPLETED',
    STATUS_CAPTURED: 'CAPTURED',
    STATUS_REFUNDED: 'REFUNDED',
    STATUS_CREATED: 'CREATED',
    // payment actions
    PAYMENT_ACTION_AUTHORIZATION: 'Authorization',
    PAYMENT_ACTION_AUTHORIZE: 'authorize',
    PAYMENT_ACTION_CAPTURE: 'capture',
    // transaction actions
    ACTION_CREATE_TRANSACTION: 'CreateTransaction',
    ACTION_VOID: 'DoVoid',
    ACTION_REAUTHORIZE: 'DoReauthorize',
    ACTION_REFUND: 'DoRefundTransaction',
    ACTION_CAPTURE: 'DoCapture',
    // service
    SERVICE_NAME: 'int_paypal.http.rest',
    // etc.
    UNKNOWN: 'Unknown',
    PARTNER_ATTRIBUTION_ID: 'SFCC_EC_B2C_2021_3_0',
    ACTION_STATUS_SUCCESS: 'Success',
    TOKEN_TYPE_BILLING_AGREEMENT: 'BILLING_AGREEMENT',
    INVALID_CLIENT: 'invalid_client'
};
