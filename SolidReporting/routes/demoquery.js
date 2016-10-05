var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../modules/connection');


// Date of Birth - Adults only
router.post('/dobadults', function(req, res) {
  console.log("go DOB adult");
  console.log("req.body line 09: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Date of Birth\", \"Program\" " +
                  "FROM \"Head of Household\" " +
                  "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "UNION " +
                  "SELECT \"Head of Household-2\".\"Date of Birth\", \"Head of Household\".\"Program\" " +
                  "FROM \"Head of Household-2\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') ",
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


// Date of Birth - Children only
router.post('/dobchildren', function(req, res) {
  console.log("go DOB Child");
  console.log("req.body line 09: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Members of Household\".\"Date of Birth\" as DOB, \"Head of Household\".\"Program\" " +
                "FROM \"Members of Household\" " +
                "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') ",
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
  console.log("go total people");
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT SUM (numberOfPeople), 'Adults' as role, \"Program\" " +
                  "FROM " +
                  "(SELECT COUNT (*) as numberOfPeople, \"Program\" " +
                  "FROM \"Head of Household\" " +
                  "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "GROUP BY \"Program\" " +
                  "UNION " +
                  "SELECT COUNT (*) as numberOfPeople, \"Head of Household\".\"Program\" " +
                  "FROM \"Head of Household-2\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "GROUP BY \"Head of Household\".\"Program\" " +
                  ") as Adult " +
                  "GROUP BY \"Program\" " +
                  "UNION " +
                  "SELECT COUNT (*) as numberOfPeople, 'Children' as role, \"Head of Household\".\"Program\" " +
                  "FROM \"Members of Household\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "GROUP BY \"Head of Household\".\"Program\", role; ",
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
  console.log("go all gender");
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Gender\", SUM (numberOfPeople), \"Program\" " +
                 "FROM " +
                 "(SELECT \"Gender\", COUNT (*) as numberOfPeople, \"Program\"  " +
                 "FROM \"Head of Household\" " +
                 "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "GROUP BY \"Gender\", \"Program\" " +
                 "UNION " +
                 "SELECT \"Head of Household-2\".\"Gender\", COUNT (*) as numberOfPeople, \"Head of Household\".\"Program\"  " +
                 "FROM \"Head of Household-2\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "GROUP BY \"Head of Household-2\".\"Gender\", \"Head of Household\".\"Program\" " +
                 "UNION " +
                 "SELECT \"Members of Household\".\"Gender\", COUNT (*) as numberOfPeople, \"Head of Household\".\"Program\"  " +
                 "FROM \"Members of Household\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "GROUP BY \"Members of Household\".\"Gender\", \"Head of Household\".\"Program\") as People " +
                 "GROUP BY \"Gender\", \"Program\";",
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
  console.log("go adult race");
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Race Code\", SUM (Race), \"Program\" " +
                 "FROM " +
                 "(SELECT \"Race Code\", COUNT (*) as Race, \"Program\" " +
                 "FROM \"Head of Household\" " +
                 "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "GROUP BY \"Race Code\", \"Program\" " +
                 "UNION " +
                 "SELECT \"Head of Household-2\".\"Race Code\", COUNT (*) as Race, \"Head of Household\".\"Program\"  " +
                 "FROM \"Head of Household-2\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "GROUP BY \"Head of Household-2\".\"Race Code\", \"Head of Household\".\"Program\") as Races " +
                 "GROUP BY \"Race Code\", \"Program\";",
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
  console.log("go child race");
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Members of Household\".\"Race Code\" as Race, COUNT (*), \"Head of Household\".\"Program\" " +
                "FROM \"Members of Household\" " +
                "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                "GROUP BY \"Members of Household\".\"Race Code\", \"Head of Household\".\"Program\";",
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


// Last Residence
router.post('/lastres', function(req, res) {
  console.log("go last res");
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"County of Last Residence\", COUNT (*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "GROUP BY \"County of Last Residence\", \"Program\";",
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


// Household Income
router.post('/houseincome', function(req, res) {
  console.log("go house income");
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"HoH Mthly  Earned Income\", \"HoH Mthly UnEarned Incom\", \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    ";",
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


// Families Exiting Housing
router.post('/famsexit', function(req, res) {
  console.log("go fam exit");
  console.log("req.body line 56: ", req.body);
  console.log("req.body.dates.startdate line 12: ", req.body.startdate);
  console.log("req.body.dates.enddate line 13: ", req.body.enddate);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pg.connect(connection, function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Reason for Leaving\", COUNT (*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE \"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "' " +
    "GROUP BY \"Reason for Leaving\", \"Program\";",
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
