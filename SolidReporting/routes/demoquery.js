var express = require('express');
var router = express.Router();
var pg = require('pg');
// var connection = require('../modules/connection');

var config = {
  user: '', //env var: PGUSER
  database: 'omicron', //env var: PGDATABASE
  password: '', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 100, // max number of clients in the pool
  idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
};


//this initializes a connection pool
//it will keep idle connections open for a 1 second
//and set a limit of maximum 1000 idle clients
var pool = new pg.Pool(config);


// Date of Birth - Adults only
router.post('/dobadults', function(req, res) {
  console.log("go DOB adult");
  console.log("req.body line 09: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var gender = req.body.genderSelection;
  var ageAdult = req.body.ageAdultSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  console.log("startDate: ", startDate);
  console.log("endDate: ", endDate);

  console.log("raceAdult: ", raceAdult);
  var raceQuery = '';
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceQuery = "length is 0, nothing selected";
  } else if(raceAdult.length === 1) {
    raceQuery = "\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "' AND ";
  } else {
    // var raceAdultQuery = raceAdult.forEach(race, i) {
    //
    // }
    raceQuery = "else statement";
  }

  console.log("raceQuery after if statement: ", raceQuery);

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Date of Birth\", \"Program\" " +
                  "FROM \"Head of Household\" " +
                  "WHERE " + raceQuery +
                  "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                  "UNION " +
                  "SELECT \"Head of Household-2\".\"Date of Birth\", \"Head of Household\".\"Program\" " +
                  "FROM \"Head of Household-2\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE " + raceQuery +
                  "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) ",
      function(err, result) {
        done();

        if(err) {
          console.log("select error: ", err);
          res.sendStatus(500);
        }
        // console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


// Date of Birth - Children only
router.post('/dobchildren', function(req, res) {
  console.log("go DOB Child");
  // console.log("req.body line 70: ", req.body);
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

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
        // console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


// Total People - Adults and Children
router.post('/totalpeople', function(req, res) {
  console.log("go total people");
  // console.log("req.body line 107: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

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
        // console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


// All Gender - Adults and Children
router.post('/allgender', function(req, res) {
  console.log("go all gender");
  // console.log("req.body line 170: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

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
        // console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


// Race - only Adults
router.post('/raceadults', function(req, res) {
  console.log("go adult race");
  // console.log("req.body line 56: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var gender = req.body.genderSelection;
  var ageAdult = req.body.ageAdultSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

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
        // console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


// Race - only Children
router.post('/racechildren', function(req, res) {
  console.log("go child race");
  // console.log("req.body line 56: ", req.body);
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

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
        // console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


// Last Residence
router.post('/lastres', function(req, res) {
  console.log("go last res");
  // console.log("req.body line 56: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

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
        // console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


// Household Income
router.post('/houseincome', function(req, res) {
  console.log("go house income");
  // console.log("req.body line 56: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

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
        // console.log('results.row: ', result.rows);

        res.send(result.rows);
    });

  });
});


// Families Exiting Housing
router.post('/famsexit', function(req, res) {
  console.log("go fam exit");
  // console.log("req.body line 56: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

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
        // console.log('results.row: ', result.rows);

        res.send(result.rows);

    });

  });
});

module.exports = router;
