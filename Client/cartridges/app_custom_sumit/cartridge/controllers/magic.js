'use strict';

var server = require('server');
 var service = require('app_custom_sumit/cartridge/services/dadjokeservice');

server.get('Show', function (req, res, next) {
    var properties = {};
    var template = 'magic1';

    var svcResult = service.dadJokeAPIService.call();
    if (svcResult.status === 'OK') {
        properties.joke = svcResult.object.joke;
    }
    res.render(template, properties);
    next();
});

server.get('Search', function (req, res, next) {
    var properties = {};
    var template = 'magicSearch';
    var searchTerm = req.querystring.term || '';

    var url = service.dadJokeAPIService.getURL() + 'search';
    var svcResult = service.dadJokeAPIService.setURL(url).addParam('term', searchTerm).call();
    if (svcResult.status === 'OK') {
    	properties.term = searchTerm;
        properties.jokes = svcResult.object.results;
    }

    res.render(template, properties);
    next();
});

module.exports = server.exports();