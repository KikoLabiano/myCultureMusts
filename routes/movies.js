var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET movies listing. */
router.get('/', function (req, res, next) {
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

router.post('/', (req, res) => {
  let db = new sqlite3.Database('./bbdd/MyCultureMusts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  let data = JSON.parse(Object.keys(req.body)[0]);
  // insert one row into the movies
  db.run(`INSERT INTO Movies(Title,Director,Year,Calification) VALUES(?,?,?,?)`, data.movie_title, data.movie_director, data.movie_year, data.movie_rating, function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    res.send(this.lastID);
  });


  db.close();
});

router.delete('/', (req, res) => {
  let db = new sqlite3.Database('./bbdd/MyCultureMusts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  console.log(req.params.id);
  let data = JSON.parse(Object.keys(req.body)[0]);
  // insert one row into the movies
  console.log(data);
  db.run(`DELETE FROM Movies WHERE id = ?`, data.id, function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    return this.lastID;
  });


  db.close();


});




module.exports = router;