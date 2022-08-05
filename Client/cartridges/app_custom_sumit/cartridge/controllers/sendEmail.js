
'use strict';

var server = require('server');
// var FileReader = require('dw/io/FileReader');
// var File = require("dw/io/File");
// var Encoding = require('dw/crypto/Encoding');
// var Logger = require('dw/system/Logger');



//define the route using the server.get method and Start function
server.get('Start', function (req, res, next) {
    //print Hello World using h1 tags directly to the response 
    // var params = req.querystring.name;
    // res.render('hello',{param1:params})
    //execute the next function to notify the server that you're done with a step   
    // var src = "src";
    // var folderPath = File.IMPEX + "/" + src + "/sumitFolder/sumit.txt";
    // var file = new File(folderPath);
	// var fileReader = new FileReader(file);
    // readFile(folderPath);
    sendMail();
    next();
});

// function readFile(folderPath)
// {
//     var fReader = new FileReader(folderPath);
//     // Logger.debug(fReader);
//    // var result = Encoding.toBase64(fReader);
//     // getBase64(fReader)
// }

// function getBase64(fReader) {
//    var reader = new FileReader();
//    reader.readAsDataURL(fReader);
//    reader.onload = function () {
//      console.log(reader.result);
//    };
//    reader.onerror = function (error) {
//      console.log('Error: ', error);
//    };
// }

function sendMail () {
    var Mail = require('dw/net/Mail');
    var mail = new Mail()
    mail.addTo("sumit@cyntexa.com");
    mail.setFrom("no-reply@salesforce.com");
    mail.setSubject("Example Email");
    mail.setContent("Test Email");

    mail.send();//returns either Status.ERROR or Status.OK, mail might not be sent yet, when this method returns
}

//call server.exports() to register all functions
module.exports = server.exports()
