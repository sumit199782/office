'use strict';


function setCache(req, res, next) {
    res.cachePeriod = 24; // eslint-disable-line no-param-reassign
    res.cachePeriodUnit = 'hours'; // eslint-disable-line no-param-reassign
    next();
}

module.exports = {
		setCache: setCache

};
