
function execute()
{


    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var currentCat = CatalogMgr.getSiteCatalog();
    var Transaction = require('dw/system/Transaction');
    var womencat = CatalogMgr.getCategory('Women');
    var womenProduct = womencat.onlineProducts;
    var File = require('dw/io/File');
    var FileWriter = require('dw/io/FileWriter');
    var XMLStreamWriter = require('dw/io/XMLStreamWriter');


    var src = "src";
    var folderPath = File.IMPEX + "/" + src + "/sumit/product.xml";
    var file = new File(folderPath);
    var fileWriter = new FileWriter(file, "UTF-8");

    // fileWriter.writeLine("productID"+','+"productName"+','+"pageURL"+',\n');

    var xmlStreamWriter = new XMLStreamWriter(fileWriter);
    xmlStreamWriter.writeStartDocument('UTF-8', '1.0');
    xmlStreamWriter.writeCharacters('\n');
    xmlStreamWriter.writeStartElement('Category');
    xmlStreamWriter.writeCharacters('Women');
    xmlStreamWriter.writeEndElement();
    xmlStreamWriter.writeCharacters('\n');



    for(var i=0; i<womenProduct.length; i++)
    {
        if(womenProduct[i].pageURL.split('/')[0] != 'Women')
        {
            var pID = womenProduct[i].ID;
            var pName = womenProduct[i].name;
            var pURL = womenProduct[i].pageURL

            xmlStreamWriter.writeStartElement("productID");
            xmlStreamWriter.writeCharacters(pID);
            xmlStreamWriter.writeEndElement();
            xmlStreamWriter.writeCharacters('\n');



            xmlStreamWriter.writeStartElement("productName");
            xmlStreamWriter.writeCharacters(pName);
            xmlStreamWriter.writeEndElement();
            xmlStreamWriter.writeCharacters('\n');



            xmlStreamWriter.writeStartElement("pageURL");
            xmlStreamWriter.writeCharacters('Women/'+pURL);
            xmlStreamWriter.writeEndElement();
            xmlStreamWriter.writeCharacters('\n');


            xmlStreamWriter.writeCharacters('\n');


        }
            // var XMLStreamWriter = new XMLStreamWriter(fileWriter);
    }


    xmlStreamWriter.flush();
    xmlStreamWriter.close();
}
exports.execute = execute;

