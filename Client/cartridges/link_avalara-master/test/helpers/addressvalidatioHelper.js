exports.addressValidationModelMock = function () {
    return {
        textCase: 'Upper',
        line1: '2000 Main Street',
        city: 'Irvine',
        region: 'CA',
        country: 'US',
        postalCode: '92614'
    };
};

exports.addressValidationResponseMock = {
    address: {
        textCase: 'Upper',
        line1: '2000 Main Street',
        city: 'Irvine',
        region: 'CA',
        country: 'US',
        postalCode: '92614'
    },
    validatedAddresses: [{
        addressType: 'StreetOrResidentialAddress',
        line1: '2000 MAIN ST',
        line2: '',
        line3: '',
        city: 'IRVINE',
        region: 'CA',
        country: 'US',
        postalCode: '92614-7202',
        latitude: 33.684689,
        longitude: -117.851495
    }],
    coordinates: {
        latitude: 33.684689,
        longitude: -117.851495
    },
    resolutionQuality: 'Intersection',
    taxAuthorities: [{
            avalaraId: '267',
            jurisdictionName: 'ORANGE',
            jurisdictionType: 'County',
            signatureCode: 'AHXU'
        },
        {
            avalaraId: '5000531',
            jurisdictionName: 'CALIFORNIA',
            jurisdictionType: 'State',
            signatureCode: 'AGAM'
        },
        {
            avalaraId: '2001061425',
            jurisdictionName: 'ORANGE COUNTY DISTRICT TAX SP',
            jurisdictionType: 'Special',
            signatureCode: 'EMAZ'
        },
        {
            avalaraId: '2001061784',
            jurisdictionName: 'ORANGE CO LOCAL TAX SL',
            jurisdictionType: 'Special',
            signatureCode: 'EMTN'
        },
        {
            avalaraId: '2001067270',
            jurisdictionName: 'IRVINE',
            jurisdictionType: 'City',
            signatureCode: 'MHWX'
        },
        {
            avalaraId: '2001077261',
            jurisdictionName: 'IRVINE HOTEL IMPROVEMENT DISTRICT',
            jurisdictionType: 'Special',
            signatureCode: 'NQKV'
        }
    ]
};