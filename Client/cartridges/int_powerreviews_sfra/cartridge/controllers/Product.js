var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.schemaData = viewData.schemaData || {};
    viewData.schemaData['@id'] = viewData.product.id;
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
