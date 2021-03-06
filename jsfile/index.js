const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
const bodypars = require('body-parser');
const { join } = require('path');
const app = express();
app.use((thisisanunusedvariable, res, next) => { res.header("Access-Control-Allow-Origin", "*"); next(); });
app.use(bodypars.urlencoded({ extended: false }));
app.use(bodypars.json());
const port = 9536;
const currentPath = __dirname;
app.use("/data", express.static(currentPath + "/data"));
function readFile(file) {
  var out = fs.readFile(file, (err, data) => {
    if (err) { return "error"; }
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
  fs.writeFile("data/" + filename, file, (err) => { if (err) throw err; });
}
app.get('/upload', (req, res) => {
  res.sendFile(currentPath + '/pub/upload.html');
});
app.post('/upload', (req, res) => {
  // file = req.body.supboi;
  var b64raw = req.body.file;
  var b64;
  if (req.body.type == "ethan") {
    b64 = b64raw;
  } else if (req.body.type == "file") {
    b64 = b64raw.substring(b64raw.indexOf("base64,") + 7, b64raw.length);
  }
  var filename = req.body.filename.substring(req.body.filename.indexOf('fakepath\\') + 9, req.body.filename.length);
  console.log(`Uploaded file: ${filename}`);
  if (req.body.type == "ethan") {
    fs.writeFile(`data/${filename}.folder`, b64, 'base64', (err) => { if (err) console.log(`err: ${err}`); });
  } else if (req.body.type == "file") {
    fs.writeFile(`data/${filename}`, b64, 'base64', (err) => { if (err) console.log(`err: ${err}`); });
  }
  res.sendFile(currentPath + "/pub/upload.html");
});
app.get('/download', (req, res) => {
  fs.readdir(currentPath + "/data", (err, files) => {
    if (err) console.log(`fserr: ${err}`);
    let folders = [];
    for (file of files) {
      if (file.indexOf(".folder") == file.length - 7) {
        folders.push(file);
      }
    }
    ejs.renderFile("pub/download.ejs", { data: files, folders: folders }, (err2, data) => {
      if (err2) console.log(`ejserr: ${err}`);
      console.log(`Data: ${data}`);
      res.send(data);
    });
    //res.sendFile(currentPath + '/pub/download.html');
  });
});
app.listen(port, () => console.log("Listening on port " + port));
