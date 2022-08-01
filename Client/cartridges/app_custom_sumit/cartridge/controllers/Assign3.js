var FileWriter = require("dw/io/FileWriter");
var File = require("dw/io/File");
var logger = require("dw/system/Logger");
var OrderMgr = require("dw/order/OrderMgr");
var Site = require("dw/system/Site");


function execute(args)
{
    var src = "src";
    var folderPath = File.IMPEX + "/" + src + "/sumitFolder/";
    var destFile = new File(folderPath + "sumit.txt");
    OrderMgr.processOrders(orderCallBackFunction, "");
    var content = "";
    content += JSON.stringify(orders);
    writeFile(destFile, content);
    return PIPELET_NEXT;
}
var count=0
var orders = {};

function orderCallBackFunction(order)
{
    var prevalue = Site.getCurrent().getCustomPreferenceValue("sumitProductId");
    if(order.productLineItems[0].productID==prevalue)
    {
        orders[count] =
            {
                orderNumber: order.orderNo,
                totalCost: order.totalGrossPrice,
                currencyCode: order.currencyCode,
                productId:order.productLineItems[0].productID,
        };
    }
    count++;
}
function writeFile(destFile, content)
{
    var fileWriter = new FileWriter(destFile, "UTF-8");
    try
    {
        fileWriter.writeLine(content);
    }
    catch (ex)
    {
        logger.error("[ERROR][Asset Updater Job] - " + ex);
    }
    finally
    {
        fileWriter.flush();
        fileWriter.close();
    }
}

module.exports =
{
    execute: execute
};