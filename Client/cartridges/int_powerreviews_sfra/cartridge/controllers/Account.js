var server = require('server');

server.extend(module.superModule);

server.append('Login', function (req, res, next) {
    var viewData = res.getViewData();

    if (req.session.privacyCache.get('powerReviewsRedirect') &&
        viewData.redirectUrl) {
        // if this is a powerreviews redirect intercept
        viewData.redirectUrl = req.session.privacyCache.get('powerReviewsRedirect');
        req.session.privacyCache.set('powerReviewsRedirect', null);
        res.setViewData(viewData);
    }
    next();
});

module.exports = server.exports();
