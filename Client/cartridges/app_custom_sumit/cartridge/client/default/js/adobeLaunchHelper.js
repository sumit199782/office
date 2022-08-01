'use strict';


$(document).ready(function() {
    $('.logo-home').on('click', function () {
        console.log('pushed to datalayer');
        // window.adobeDataLayer.push({
        //     eventName: 'navClick',
        //     componentType: 'header',
        //     componentElem: 'navigation',
        //     linkName: 'tires | shop-for-tires | see-all-tires',
        //     linkType: 'browse'
        // });
        var adobeAnalytics = {
            pushData: function (data) {
                console.log(data);
            }
        };
        console.log('dataPushed');
        window.adobeDataLayer.getState();
    });
});


// module.exports = adobeAnalytics;