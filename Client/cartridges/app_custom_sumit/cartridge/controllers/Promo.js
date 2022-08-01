'use strict';

var server = require('server');

server.get('Sam', function(req, res, next)
{
    res.render('promo');
    next();
});

module.exports = server.exports();

