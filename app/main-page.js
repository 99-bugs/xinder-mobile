var observableModule = require("tns-core-modules/data/observable");
var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
var barcodescanner = new BarcodeScanner();

exports.onNavigatingTo = function(args) {
    var page = args.object;
    page.bindingContext = new observableModule.fromObject({
      qr_code: "No QR scanned"
    });
}

exports.onScan = function(args) {
  var context = args.object.bindingContext;
  console.log("Hit scan");
 
  barcodescanner.scan({
    formats: "QR_CODE",   // Pass in of you want to restrict scanning to certain types
    cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
    cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
    preferFrontCamera: false,     // default false
    showTorchButton: true,        // default false
    beepOnScan: true,             // Play or Suppress beep on scan (default true)
    resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
    openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
  }).then(
    function(result) {
      console.log("Scan format: " + result.format);
      console.log("Scan text:   " + result.text);
      context.qr_code = result.text;
    },
    function(error) {
      console.log("No scan: " + error);
      context.qr_code = "No QR scanned";
    }
  );
}