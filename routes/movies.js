var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  let db = new sqlite3.Database('./bbdd/MyCultureMusts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the MyCultureMusts database.');
  });

  let sql = `SELECT * FROM Movies Order by Id`;
 
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.send(rows);  
});
 
// close the database connection
db.close();

});

module.exports = router;
