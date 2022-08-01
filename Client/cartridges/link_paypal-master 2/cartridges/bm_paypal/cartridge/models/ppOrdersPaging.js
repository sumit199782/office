var PagingModel = require('dw/web/PagingModel');

/**
 * PP Orders Paging Model
 */
function OrdersPagingModel() { }

/**
 * @param {Object} orders array list
 * @param {Object} page request.httpParameterMap.page
 * @param {Object} pagesize request.httpParameterMap.pagesize
 * @returns {dw.web.PagingModel} paging model
 */
OrdersPagingModel.prototype.createPagingModel = function (orders, page, pagesize) {
    var orderPagingModel = new PagingModel(orders);

    var pageSize = !empty(pagesize.intValue) ? pagesize.intValue : 10;
    var currentPage = page.intValue || 1;
    pageSize = pageSize === 0 ? orders.length : pageSize;

    orderPagingModel.setPageSize(pageSize);
    orderPagingModel.setStart(pageSize * (currentPage - 1));

    return orderPagingModel;
};

/**
 * Creates parameters for PagingModel
 * @param {dw.web.PagingModel} orderPagingModel Paging Model
 * @param {request.httpParameterMap} httpParameterMap Current httpParameterMap
 * @returns {Object} Object with Pading Model parameters
 */
OrdersPagingModel.prototype.createOrderPagingModelParameters = function (orderPagingModel, httpParameterMap) {
    var lr = 2;
    var rangeBegin;
    var rangeEnd;
    var showingStart = orderPagingModel.start + 1;
    var showingEnd = orderPagingModel.start + orderPagingModel.pageSize;
    var parameters = httpParameterMap.getParameterNames().toArray().filter(function (parametersName) {
        return parametersName !== 'page';
    }).map(function (parametersName) {
        return {
            key: parametersName,
            value: httpParameterMap[parametersName]
        };
    });

    if (showingEnd > orderPagingModel.count) {
        showingEnd = orderPagingModel.count;
    }

    if (orderPagingModel.maxPage <= 2 * lr) {
        rangeBegin = 1;
        rangeEnd = orderPagingModel.maxPage - 1;
    } else {
        rangeBegin = Math.max(Math.min(orderPagingModel.currentPage - lr, orderPagingModel.maxPage - 2 * lr), 1);
        rangeEnd = Math.min(rangeBegin + 2 * lr, orderPagingModel.maxPage - 1);
    }

    return {
        current: orderPagingModel.start,
        totalCount: orderPagingModel.count,
        pageSize: orderPagingModel.pageSize,
        currentPage: orderPagingModel.currentPage,
        maxPage: orderPagingModel.maxPage,
        showingStart: showingStart,
        showingEnd: showingEnd,
        rangeBegin: rangeBegin,
        rangeEnd: rangeEnd,
        parameters: parameters
    };
};

module.exports = OrdersPagingModel;
