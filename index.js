var express = require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  let db = new sqlite3.Database('./bbdd/MyCultureMusts.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
});