var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../modules/connection');


router.post('/', function(req, res) {
  console.log("req.body line 43: ", req.body);
  // console.log("req.body.dates line 44: ", req.body.correctDates);
  // need to convert these dates to be: '2016-10-03'  NOT '2016-10-03T14:33:40.943Z';
  console.log("req.body.dates.startdate line 44: ", req.body.startDate);
  console.log("req.body.dates.enddate line 44: ", req.body.endDate);


  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('SELECT COUNT(*) FROM "Head of Household"',
      function(err, result) {
        done();

        if(err) {
          console.log("select error: ", err);
          res.sendStatus(500);
        }
        console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


module.exports = router;
