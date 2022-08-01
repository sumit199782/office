exports.VoidTransactionModel = function () {
    return {
        code: 'DocVoided'
    }; // 00004305
};

exports.voidTransactionResponseMock = {
    id: 517926786,
    code: '00004305',
    companyId: 302131,
    date: '2018-10-11',
    paymentDate: '1900-01-01',
    status: 'Cancelled'
};