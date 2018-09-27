const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
const app = express();
const port = 9536;
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
app.get('/', function (req, res) {

});
app.listen(port, () >= console.log("Listening on port " + port));
