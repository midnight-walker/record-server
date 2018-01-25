/**
 * Created by tangqiaojie <2482366539@qq.com> on 2017/9/25 0025
 */
let path = require('path');
let _ = require('lodash');

var pdfMakePrinter = require('pdfmake/src/printer');

module.exports= function (pdfDoc, callback) {

  var fontDescriptors = {
    st: {
      normal: path.resolve(__dirname, '../fonts/SC-Normal.ttf'),
      bold: path.resolve(__dirname, '../fonts/SC-Bold.ttf'),
      italics: path.resolve(__dirname, '../fonts/SC-Normal.ttf'),
      bolditalics: path.resolve(__dirname, '../fonts/SC-Normal.ttf'),
    }
  };
  var printer = new pdfMakePrinter(fontDescriptors);

  var doc = printer.createPdfKitDocument(pdfDoc);

  var chunks = [];
  var result;

  doc.on('data', function (chunk) {
    chunks.push(chunk);
  });
  doc.on('end', function () {
    result = Buffer.concat(chunks);
    callback(result);
  });
  doc.end();

}
