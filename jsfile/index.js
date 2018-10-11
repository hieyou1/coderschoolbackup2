const fs = require('fs');
//const ejs = require('ejs');
const express = require('express');
const bodypars = require('body-parser');
const app = express();
app.use((thisisanunusedvariable, res, next) => {res.header("Access-Control-Allow-Origin", "*");next();});
app.use(bodypars.urlencoded({ extended: false}));
app.use(bodypars.json());
const port = 9536;
const currentPath = __dirname;
function readFile(file) {
  var out = fs.readFile(file, (err, data) => {
    if (err) {return "error";}
    return data;
  });
  if (out == "error") {
    return false;
  } else {
    return out;
  }
}
function filePassUpload(rawfile, filename) {
  var file = new Uint8Array(Buffer.from(rawfile));
  fs.writeFile("data/" + filename, file, (err) => {if (err) throw err;});
}
app.get('/upload', (req, res) => {
  res.sendFile(currentPath + '/pub/upload.html');
});
app.post('/upload', (req, res) => {
  // file = req.body.supboi;
  var b64raw = req.body.file;
  var b64 = b64raw.substring(b64raw.indexOf("base64,") + 7, b64raw.length);
  var filename = req.body.filename.substring(req.body.filename.indexOf('fakepath\\') + 9, req.body.filename.length);
  console.log(`Uploaded file: ${filename}`);
  fs.writeFile(`data/${filename}`, b64, 'base64', (err) => {if (err) console.log(`err: ${err}`);});
  res.sendFile(currentPath + "/pub/upload.html");
});
app.listen(port, () => console.log("Listening on port " + port));
