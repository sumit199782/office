'use strict';

exports.taxationResponseInvalidAddress = {
    error: {
        code: 'GetTaxError',
        message: 'Invalid or missing state/province code (AAA).',
        target: 'Unknown',
        details: [{
            code: 'GetTaxError',
            number: 300,
            message: 'Invalid or missing state/province code (AAA).',
            description: 'AAA is not a known state or province.',
            faultCode: 'GetTaxError',
            helpLink: 'http://developer.avalara.com/avatax/errors/GetTaxError',
            refersTo: 'Addresses[0]',
            severity: 'Error'
        }]
    }
};

exports.AddressLocationInfo = function () {
    return {};
}

exports.LineItemModel = function () {
    return {};
};

exports.AddressesModel = function () {
    return {};
};

exports.taxationresponseMock = {
    id: 10865513369,
    code: '8541f1e3-6780-47c8-8f03-1b2033b2af47',
    companyId: 302131,
    date: '2019-07-26',
    status: 'Saved',
    type: 'SalesInvoice',
    batchCode: '',
    currencyCode: 'USD',
    customerUsageType: '',
    entityUseCode: '',
    customerVendorCode: 'ABC',
    customerCode: 'ABC',
    exemptNo: '',
    reconciled: false,
    locationCode: '',
    reportingLocationCode: '',
    purchaseOrderNo: '2019-07-26-001',
    referenceCode: '',
    salespersonCode: '',
    taxOverrideType: 'None',
    taxOverrideAmount: 0,
    taxOverrideReason: '',
    totalAmount: 100,
    totalExempt: 0,
    totalDiscount: 0,
    totalTax: 7.75,
    totalTaxable: 100,
    totalTaxCalculated: 7.75,
    adjustmentReason: 'NotAdjusted',
    adjustmentDescription: '',
    locked: false,
    region: 'CA',
    country: 'US',
    version: 1,
    softwareVersion: '19.6.3.3',
    originAddressId: 7476491602,
    destinationAddressId: 7476491602,
    exchangeRateEffectiveDate: '2019-07-26',
    exchangeRate: 1,
    isSellerImporterOfRecord: true,
    description: 'Yarn',
    email: '',
    businessIdentificationNo: '',
    modifiedDate: '2019-07-29T15:47:31.2',
    modifiedUserId: 225748,
    taxDate: '2019-07-26T00:00:00',
    lines: [{
        id: 7901622867,
        transactionId: 10865513369,
        lineNumber: '1',
        boundaryOverrideId: 0,
        customerUsageType: '',
        entityUseCode: '',
        description: 'Yarn',
        destinationAddressId: 7476491602,
        originAddressId: 7476491602,
        discountAmount: 0,
        discountTypeId: 0,
        exemptAmount: 0,
        exemptCertId: 0,
        exemptNo: '',
        isItemTaxable: true,
        isSSTP: false,
        itemCode: 'Y0001',
        lineAmount: 100,
        quantity: 1,
        ref1: '',
        ref2: '',
        reportingDate: '2019-07-26',
        revAccount: '',
        sourcing: 'Mixed',
        tax: 7.75,
        taxableAmount: 100,
        taxCalculated: 7.75,
        taxCode: 'PS081282',
        taxCodeId: 38007,
        taxDate: '2019-07-26',
        taxEngine: '',
        taxOverrideType: 'None',
        businessIdentificationNo: '',
        taxOverrideAmount: 0,
        taxOverrideReason: '',
        taxIncluded: false,
        details: [{
                id: 7760318994,
                transactionLineId: 7901622867,
                transactionId: 10865513369,
                addressId: 7476491602,
                country: 'US',
                region: 'CA',
                countyFIPS: '',
                stateFIPS: '06',
                exemptAmount: 0,
                exemptReasonId: 4,
                inState: true,
                jurisCode: '06',
                jurisName: 'CALIFORNIA',
                jurisdictionId: 5000531,
                signatureCode: 'AGAM',
                stateAssignedNo: '',
                jurisType: 'STA',
                jurisdictionType: 'State',
                nonTaxableAmount: 0,
                nonTaxableRuleId: 0,
                nonTaxableType: 'RateRule',
                rate: 0.06,
                rateRuleId: 1526142,
                rateSourceId: 3,
                serCode: '',
                sourcing: 'Origin',
                tax: 6,
                taxableAmount: 100,
                taxType: 'Sales',
                taxSubTypeId: 'S',
                taxTypeGroupId: 'SalesAndUse',
                taxName: 'CA STATE TAX',
                taxAuthorityTypeId: 45,
                taxRegionId: 4017409,
                taxCalculated: 6,
                taxOverride: 0,
                rateType: 'General',
                rateTypeCode: 'G',
                taxableUnits: 100,
                nonTaxableUnits: 0,
                exemptUnits: 0,
                unitOfBasis: 'PerCurrencyUnit',
                isNonPassThru: false
            },
            {
                id: 9760318993,
                transactionLineId: 7901622867,
                transactionId: 10865513369,
                addressId: 7476491602,
                country: 'US',
                region: 'CA',
                countyFIPS: '',
                stateFIPS: '06',
                exemptAmount: 0,
                exemptReasonId: 4,
                inState: true,
                jurisCode: '059',
                jurisName: 'ORANGE',
                jurisdictionId: 267,
                signatureCode: 'AHXU',
                stateAssignedNo: '',
                jurisType: 'CTY',
                jurisdictionType: 'County',
                nonTaxableAmount: 0,
                nonTaxableRuleId: 0,
                nonTaxableType: 'RateRule',
                rate: 0.0025,
                rateRuleId: 1526120,
                rateSourceId: 3,
                serCode: '',
                sourcing: 'Origin',
                tax: 0.25,
                taxableAmount: 100,
                taxType: 'Sales',
                taxSubTypeId: 'S',
                taxTypeGroupId: 'SalesAndUse',
                taxName: 'CA COUNTY TAX',
                taxAuthorityTypeId: 45,
                taxRegionId: 4017409,
                taxCalculated: 0.25,
                taxOverride: 0,
                rateType: 'General',
                rateTypeCode: 'G',
                taxableUnits: 100,
                nonTaxableUnits: 0,
                exemptUnits: 0,
                unitOfBasis: 'PerCurrencyUnit',
                isNonPassThru: false
            },
            {
                id: 11760318994,
                transactionLineId: 7901622867,
                transactionId: 10865513369,
                addressId: 7476491602,
                country: 'US',
                region: 'CA',
                countyFIPS: '',
                stateFIPS: '06',
                exemptAmount: 0,
                exemptReasonId: 4,
                inState: true,
                jurisCode: 'EMAZ0',
                jurisName: 'ORANGE COUNTY DISTRICT TAX SP',
                jurisdictionId: 2001061425,
                signatureCode: 'EMAZ',
                stateAssignedNo: '037',
                jurisType: 'STJ',
                jurisdictionType: 'Special',
                nonTaxableAmount: 0,
                nonTaxableRuleId: 0,
                nonTaxableType: 'RateRule',
                rate: 0.005,
                rateRuleId: 1526112,
                rateSourceId: 3,
                serCode: '',
                sourcing: 'Destination',
                tax: 0.5,
                taxableAmount: 100,
                taxType: 'Sales',
                taxSubTypeId: 'S',
                taxTypeGroupId: 'SalesAndUse',
                taxName: 'CA SPECIAL TAX',
                taxAuthorityTypeId: 45,
                taxRegionId: 4017409,
                taxCalculated: 0.5,
                taxOverride: 0,
                rateType: 'General',
                rateTypeCode: 'G',
                taxableUnits: 100,
                nonTaxableUnits: 0,
                exemptUnits: 0,
                unitOfBasis: 'PerCurrencyUnit',
                isNonPassThru: false
            },
            {
                id: 13760318995,
                transactionLineId: 7901622867,
                transactionId: 10865513369,
                addressId: 7476491602,
                country: 'US',
                region: 'CA',
                countyFIPS: '',
                stateFIPS: '06',
                exemptAmount: 0,
                exemptReasonId: 4,
                inState: true,
                jurisCode: 'EMTN0',
                jurisName: 'ORANGE CO LOCAL TAX SL',
                jurisdictionId: 2001061784,
                signatureCode: 'EMTN',
                stateAssignedNo: '30',
                jurisType: 'STJ',
                jurisdictionType: 'Special',
                nonTaxableAmount: 0,
                nonTaxableRuleId: 0,
                nonTaxableType: 'RateRule',
                rate: 0.01,
                rateRuleId: 1526108,
                rateSourceId: 3,
                serCode: '',
                sourcing: 'Origin',
                tax: 1,
                taxableAmount: 100,
                taxType: 'Sales',
                taxSubTypeId: 'S',
                taxTypeGroupId: 'SalesAndUse',
                taxName: 'CA SPECIAL TAX',
                taxAuthorityTypeId: 45,
                taxRegionId: 4017409,
                taxCalculated: 1,
                taxOverride: 0,
                rateType: 'General',
                rateTypeCode: 'G',
                taxableUnits: 100,
                nonTaxableUnits: 0,
                exemptUnits: 0,
                unitOfBasis: 'PerCurrencyUnit',
                isNonPassThru: false
            }
        ],
        nonPassthroughDetails: [],
        lineLocationTypes: [{
                documentLineLocationTypeId: 12883870985,
                documentLineId: 7901622867,
                documentAddressId: 7476491602,
                locationTypeCode: 'ShipFrom'
            },
            {
                documentLineLocationTypeId: 10666812845,
                documentLineId: 7901622867,
                documentAddressId: 7476491602,
                locationTypeCode: 'PointOfOrderOrigin'
            },
            {
                documentLineLocationTypeId: 8666812845,
                documentLineId: 7901622867,
                documentAddressId: 7476491602,
                locationTypeCode: 'PointOfOrderAcceptance'
            },
            {
                documentLineLocationTypeId: 6666812845,
                documentLineId: 7901622867,
                documentAddressId: 7476491602,
                locationTypeCode: 'ShipTo'
            }
        ],
        hsCode: '',
        costInsuranceFreight: 0,
        vatCode: '',
        vatNumberTypeId: 0
    }],
    addresses: [{
        id: 7476491602,
        transactionId: 10865513369,
        boundaryLevel: 'Address',
        line1: '2000 MAIN ST',
        line2: '',
        line3: '',
        city: 'IRVINE',
        region: 'CA',
        postalCode: '92614-7202',
        country: 'US',
        taxRegionId: 4017409,
        latitude: '33.684689',
        longitude: '-117.851495'
    }],
    locationTypes: [{
            documentLocationTypeId: 10916350760,
            documentId: 10865513369,
            documentAddressId: 7476491602,
            locationTypeCode: 'ShipTo'
        },
        {
            documentLocationTypeId: 8712569954,
            documentId: 10865513369,
            documentAddressId: 7476491602,
            locationTypeCode: 'ShipFrom'
        },
        {
            documentLocationTypeId: 6712569955,
            documentId: 10865513369,
            documentAddressId: 7476491602,
            locationTypeCode: 'PointOfOrderOrigin'
        },
        {
            documentLocationTypeId: 4712569955,
            documentId: 10865513369,
            documentAddressId: 7476491602,
            locationTypeCode: 'PointOfOrderAcceptance'
        }
    ],
    summary: [{
            country: 'US',
            region: 'CA',
            jurisType: 'State',
            jurisCode: '06',
            jurisName: 'CALIFORNIA',
            taxAuthorityType: 45,
            stateAssignedNo: '',
            taxType: 'Sales',
            taxSubType: 'S',
            taxName: 'CA STATE TAX',
            rateType: 'General',
            taxable: 100,
            rate: 0.06,
            tax: 6,
            taxCalculated: 6,
            nonTaxable: 0,
            exemption: 0
        },
        {
            country: 'US',
            region: 'CA',
            jurisType: 'County',
            jurisCode: '059',
            jurisName: 'ORANGE',
            taxAuthorityType: 45,
            stateAssignedNo: '',
            taxType: 'Sales',
            taxSubType: 'S',
            taxName: 'CA COUNTY TAX',
            rateType: 'General',
            taxable: 100,
            rate: 0.0025,
            tax: 0.25,
            taxCalculated: 0.25,
            nonTaxable: 0,
            exemption: 0
        },
        {
            country: 'US',
            region: 'CA',
            jurisType: 'Special',
            jurisCode: 'EMTN0',
            jurisName: 'ORANGE CO LOCAL TAX SL',
            taxAuthorityType: 45,
            stateAssignedNo: '30',
            taxType: 'Sales',
            taxSubType: 'S',
            taxName: 'CA SPECIAL TAX',
            rateType: 'General',
            taxable: 100,
            rate: 0.01,
            tax: 1,
            taxCalculated: 1,
            nonTaxable: 0,
            exemption: 0
        },
        {
            country: 'US',
            region: 'CA',
            jurisType: 'Special',
            jurisCode: 'EMAZ0',
            jurisName: 'ORANGE COUNTY DISTRICT TAX SP',
            taxAuthorityType: 45,
            stateAssignedNo: '037',
            taxType: 'Sales',
            taxSubType: 'S',
            taxName: 'CA SPECIAL TAX',
            rateType: 'General',
            taxable: 100,
            rate: 0.005,
            tax: 0.5,
            taxCalculated: 0.5,
            nonTaxable: 0,
            exemption: 0
        }
    ]
};

exports.createTransactionModelMock = {
    lines: [{
        number: '1',
        quantity: 1,
        amount: 100,
        taxCode: 'PS081282',
        itemCode: 'Y0001',
        description: 'Yarn'
    }],
    type: 'SalesInvoice',
    companyCode: 'DEFAULT',
    date: '2019-07-26',
    customerCode: 'ABC',
    purchaseOrderNo: '2019-07-26-001',
    addresses: {
        shipTo: {
            line1: '2000 Main Street',
            city: 'Irvine',
            region: 'CA',
            country: 'US',
            postalCode: '92614'
        },
        shipFrom: {
            line1: '900 winslow way e',
            city: 'Seattle',
            region: 'WA',
            country: 'US',
            postalCode: '98110'
        }
    },
    commit: false,
    currencyCode: 'USD',
    description: 'Yarn'
};


exports.CreateTransactionModel = function () {
    this.type = Object.freeze({
        C_SALESORDER: 'SalesOrder',
        C_SALESINVOICE: 'SalesInvoice'
    });
    this.debugLevel = Object.freeze({
        C_NORMAL: 'Normal',
        C_DIAGNOSTIC: 'Diagnostic'
    });
    this.serviceMode = Object.freeze({
        C_AUTOMATIC: 'Automatic',
        C_LOCAL: 'Local',
        C_REMOTE: 'Remote'
    });
    return this;
};