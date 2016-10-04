var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../modules/connection');


// Date of Birth - Adults only
router.post('/dobadults', function(req, res) {
  console.log("req.body line 09: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startDate);
  console.log("req.body.dates.enddate line 13: ", req.body.endDate);
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


// Total People - Adults and Children
router.post('/totalpeople', function(req, res) {
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 59: ", req.body.startDate);
  console.log("req.body.dates.enddate line 60: ", req.body.endDate);
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT SUM (numberOfPeople), 'Adults' as role " +
                  "FROM " +
                  "(SELECT COUNT (*) as numberOfPeople " +
                  "FROM \"Head of Household\" " +
                  "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                  "UNION " +
                  "SELECT COUNT (*) as numberOfPeople " +
                  "FROM \"Head of Household-2\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL) as Adult " +
                  "UNION " +
                  "SELECT COUNT (*) as numberOfPeople, 'Children' as role " +
                  "FROM \"Members of Household\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL;",
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


// All Gender - Adults and Children
router.post('/allgender', function(req, res) {
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 59: ", req.body.startDate);
  console.log("req.body.dates.enddate line 60: ", req.body.endDate);
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Gender\", SUM (numberOfPeople) " +
                 "FROM " +
                 "(SELECT \"Gender\", COUNT (*) as numberOfPeople " +
                 "FROM \"Head of Household\" " +
                 "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                 "GROUP BY \"Gender\" " +
                 "UNION " +
                 "SELECT \"Head of Household-2\".\"Gender\", COUNT (*) as numberOfPeople " +
                 "FROM \"Head of Household-2\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                 "GROUP BY \"Head of Household-2\".\"Gender\" " +
                 "UNION " +
                 "SELECT \"Members of Household\".\"Gender\", COUNT (*) as numberOfPeople " +
                 "FROM \"Members of Household\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                 "GROUP BY \"Members of Household\".\"Gender\") as People " +
                 "GROUP BY \"Gender\";",
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


// Race - only Adults
router.post('/raceadults', function(req, res) {
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 59: ", req.body.startDate);
  console.log("req.body.dates.enddate line 60: ", req.body.endDate);
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Race Code\", SUM (Race) " +
                 "FROM " +
                 "(SELECT \"Race Code\", COUNT (*) as Race " +
                 "FROM \"Head of Household\" " +
                 "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                 "GROUP BY \"Race Code\" " +
                 "UNION ALL " +
                 "SELECT \"Head of Household-2\".\"Race Code\", COUNT (*) as Race " +
                 "FROM \"Head of Household-2\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                 "GROUP BY \"Head of Household-2\".\"Race Code\") as Races " +
                 "GROUP BY \"Race Code\";",
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


// Race - only Children
router.post('/racechildren', function(req, res) {
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 59: ", req.body.startDate);
  console.log("req.body.dates.enddate line 60: ", req.body.endDate);
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Members of Household\".\"Race Code\" as Race, COUNT (*) " +
                "FROM \"Members of Household\" " +
                "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                "WHERE \"Head of Household\".\"Program Exit Date\" > '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" < '" + endDate + "' OR \"Head of Household\".\"Program Exit Date\" IS NULL " +
                "and \"Head of Household\".\"Program\" = 'EMPII' " +
                "GROUP BY \"Members of Household\".\"Race Code\";",
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
