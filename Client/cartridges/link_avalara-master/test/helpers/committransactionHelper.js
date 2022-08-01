exports.CommitTransactionModel = function () {
    return {
        commit: true
    };
};

exports.CommitTransactionResponseMock = function () {
    return {
        id: 517927062,
        code: '00004306',
        companyId: 302131,
        date: '2018-10-11',
        paymentDate: '1900-01-01',
        status: 'Committed'
    };
};