const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
const bodypars = require('body-parser');
const app = express();
app.use(bodypars.urlencoded({ extended: false}));
app.use(bodypars.json());
const port = 9536;
const currentPath = __dirname;
function readFile(file) {
  var out = fs.readFile(file, function (err, data) {
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
  fs.writeFile("data/" + filename, file, function (err) {if (err) throw err;});
}
app.get('/upload', function (req, res) {
  res.sendFile(currentPath + '/pub/upload.html');
});
app.post('/upload', function (req, res) {
  file = req.body.supboi;
  filename = file.filename;
  console.log(req.body);
  res.sendFile(currentPath + "/pub/upload.html");
});
app.listen(port, () => console.log("Listening on port " + port));
