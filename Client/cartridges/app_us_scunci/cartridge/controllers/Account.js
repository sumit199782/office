'use strict';

var server = require('server');
server.extend(module.superModule);
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.append('Show',server.middleware.https,
userLoggedIn.validateLoggedIn,
consentTracking.consent, function (req, res, next) {
    try {

        if(req.currentCustomer.profile.customerNo) {
            session.custom.userLoggedIn = true;
        }
        else {
            session.custom.userLoggedIn = false;
        }
    }
    catch(e)
    {
        var exception=e;
        session.custom.userLoggedIn = false;

    }
    var userLoggedIn=session.custom.userLoggedIn;
    res.setViewData({
        userLoggedIn: userLoggedIn
    });
    next();
});

module.exports = server.exports();
