var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../modules/connection');


router.post('/dobadults', function(req, res) {
  console.log("req.body line 43: ", req.body);
  // console.log("req.body.dates line 44: ", req.body.correctDates);
  // need to convert these dates to be: '2016-10-03'  NOT '2016-10-03T14:33:40.943Z';
  console.log("req.body.dates.startdate line 44: ", req.body.startDate);
  console.log("req.body.dates.enddate line 44: ", req.body.endDate);
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Date of Birth\", \"Program\" " +
                  "FROM \"Head of Household\" " +
                  "WHERE " +
                  "\"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' " +
                  "OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                  "OR \"Head of Household\".\"Program Entry Date\" < '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" > '" + endDate + "' " +
                  "UNION " +
                  "SELECT \"Head of Household-2\".\"Date of Birth\", \"Head of Household\".\"Program\" " +
                  "FROM \"Head of Household-2\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE " +
                  "\"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' " +
                  "OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                  "OR \"Head of Household\".\"Program Entry Date\" < '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" > '" + endDate + "'; ",
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
