var server = require('server');
var assets = require('*/cartridge/scripts/assets');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    assets.addCss('/css/powerreviews.css');

    next();
});

module.exports = server.exports();
