
function execute()
{
    // var Site = require('dw/system/Site');
    // var currentsite = Site.getCurrent();
    var ProductMgr = require('dw/catalog/ProductMgr');

    var productlist = ProductMgr. queryAllSiteProductsSorted();
    var productCount = productlist.getCount();
    var productListunder = productlist.asList();

    var File = require('dw/io/File');
    var FileWriter = require('dw/io/FileWriter');

    var src = "src";
    var folderPath = File.IMPEX + "/" + src + "/sumit/sumit.csv";
    var file = new File(folderPath);

    var fileWriter = new FileWriter(file, "UTF-8");
    try {
            fileWriter.writeLine("productID"+','+"productName"+','+"pageDescription"+','+"pageTitle"+','+"pageURL"+','+"price"+',\n');

        for(var i = 0 ; i<productCount; i++)
        {
            fileWriter.writeLine(productListunder[i].ID+','+productListunder[i].name+','+productListunder[i].pageDescription+','+productListunder[i].pageTitle+','+productListunder[i].pageURL+','+productListunder[i].priceModel.price+','+'\n');
        }
    } catch (ex) {

    } finally {
        fileWriter.flush();
        fileWriter.close();
    }
}
exports.execute = execute;
