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


// Houseing Stability
router.post('/houseStabil', function(req, res) {
  console.log("go house stabil");
  console.log("req.body line 09: ", req.body);
  var raceAdult = req.body.raceAdultSelection; //we won't have sorting based on this.
  var gender = req.body.genderSelection;
  var ageAdult = req.body.ageAdultSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  console.log("startDate: ", startDate);
  console.log("endDate: ", endDate);

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Achieve Housing Stability\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE (\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "GROUP BY \"Achieve Housing Stability\", \"Program\" " +
    "ORDER BY \"Program\"; ",

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


// Adult Education Advancement
router.post('/adulteduadv', function(req, res) {
  console.log("go Adult EDU ADV");
  // console.log("req.body line 70: ", req.body);
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Adult Edu Adv\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE (\"Head of Household\".\"Adult Edu Adv\" != '') and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Adult Edu Adv\", \"Program\" " +
    "UNION " +
    "SELECT \"Head of Household-2\".\"Adult Edu Adv\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Head of Household-2\" " +
    "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE (\"Head of Household\".\"Adult Edu Adv\" != '') and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Head of Household-2\".\"Adult Edu Adv\", \"Head of Household\".\"Program\";",
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


// Adult Learning Disability
router.post('/adultlearningdis', function(req, res) {
  console.log("go adult learn dis");
  // console.log("req.body line 107: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Is There a Learning Disability\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE (\"Head of Household\".\"Is There a Learning Disability\" != '' and \"Head of Household\".\"Is There a Learning Disability\" != 'NO' ) and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Is There a Learning Disability\", \"Program\" " +
    "UNION " +
    "SELECT \"Head of Household-2\".\"Is There a Learning Disability\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Head of Household-2\" " +
    "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE (\"Head of Household-2\".\"Is There a Learning Disability\" != '' and \"Head of Household-2\".\"Is There a Learning Disability\" != 'NO' ) and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Head of Household-2\".\"Is There a Learning Disability\", \"Head of Household\".\"Program\"; ",
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


// Children Learning Disability
router.post('/childlearndis', function(req, res) {
  console.log("go child learn dis");
  // console.log("req.body line 170: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Members of Household\".\"Is There a Learning Disability\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Members of Household\" " +
    "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE (\"Members of Household\".\"Is There a Learning Disability\" != '' and \"Members of Household\".\"Is There a Learning Disability\" != 'NO' and \"Members of Household\".\"Is There a Learning Disability\" != 'No') and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Members of Household\".\"Is There a Learning Disability\", \"Head of Household\".\"Program\"; ",
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


// HH Currently Employed
router.post('/hhcurrentemp', function(req, res) {
  console.log("go hh current Emp");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var gender = req.body.genderSelection;
  // var ageAdult = req.body.ageAdultSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Currently Employed\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Currently Employed\" IS NOT NULL AND \"Head of Household\".\"Currently Employed\" != '0' AND \"Head of Household\".\"Currently Employed\" != 'No' ) AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Currently Employed\", \"Program\"; ",
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


// HH2 Current Emp
router.post('/hh2currentemp', function(req, res) {
  console.log("go HH2 Current Emp");
  // console.log("req.body line 56: ", req.body);
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Head of Household-2\".\"Currently Employed\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Head of Household-2\" " +
    "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE (\"Head of Household-2\".\"Currently Employed\" IS NOT NULL and \"Head of Household-2\".\"Currently Employed\" != 'NO' ) and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Head of Household-2\".\"Currently Employed\", \"Head of Household\".\"Program\"; ",
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


// Improved Econ Stability
router.post('/econstabil', function(req, res) {
  console.log("go Econ Stabil");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Improved Econ Stability\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Improved Econ Stability\" IS NOT NULL AND \"Improved Econ Stability\" != '') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Improved Econ Stability\", \"Program\" " +
    "UNION " +
    "SELECT \"Head of Household-2\".\"Improved Econ Stability\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Head of Household-2\" " +
    "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE (\"Head of Household-2\".\"Improved Econ Stability\" IS NOT NULL AND \"Head of Household-2\".\"Improved Econ Stability\" != '') and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Head of Household-2\".\"Improved Econ Stability\", \"Head of Household\".\"Program\"; ",
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


// Adult Disability
router.post('/adultdisabil', function(req, res) {
  console.log("go adult disabil");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Is There a Disability\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Is There a Disability\" IS NOT FALSE) AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Is There a Disability\", \"Program\" " +
    "UNION " +
    "SELECT \"Head of Household-2\".\"Is There a Disability\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Head of Household-2\" " +
    "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE (\"Head of Household-2\".\"Is There a Disability\" IS NOT FALSE) and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Head of Household-2\".\"Is There a Disability\", \"Head of Household\".\"Program\"; ",

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


// Adult MI
router.post('/adultmi', function(req, res) {
  console.log("go adult mi");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Is There a Diagnosed Mental Illness\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Is There a Diagnosed Mental Illness\" IS NOT NULL AND \"Is There a Diagnosed Mental Illness\" != 'NO' AND \"Is There a Diagnosed Mental Illness\" != 'No') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Is There a Diagnosed Mental Illness\", \"Program\" " +
    "UNION " +
    "SELECT \"Head of Household-2\".\"Is There a Diagnosed Mental Illness\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Head of Household-2\" " +
    "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE (\"Head of Household-2\".\"Is There a Diagnosed Mental Illness\" IS NOT NULL AND \"Head of Household-2\".\"Is There a Diagnosed Mental Illness\" != 'NO' AND \"Head of Household-2\".\"Is There a Diagnosed Mental Illness\" != 'No') and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Head of Household-2\".\"Is There a Diagnosed Mental Illness\", \"Head of Household\".\"Program\"; ",
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

// Child Disability
router.post('/childDis', function(req, res) {
  console.log("go child dis");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Members of Household\".\"Is There a Disability\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Members of Household\" " +
    "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE(\"Members of Household\".\"Is There a Disability\" IS NOT FALSE) AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Members of Household\".\"Is There a Disability\", \"Head of Household\".\"Program\"; ",
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

// Child MI
router.post('/childmi', function(req, res) {
  console.log("go child mi");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Members of Household\".\"Is There a Diagnosed Mental Illness\", COUNT (*), \"Head of Household\".\"Program\" " +
    "FROM \"Members of Household\" " +
    "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
    "WHERE (\"Members of Household\".\"Is There a Diagnosed Mental Illness\" != 'NO') and ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Members of Household\".\"Is There a Diagnosed Mental Illness\", \"Head of Household\".\"Program\"; ",
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

// Parenting Education just if they did it
router.post('/parentedu', function(req, res) {
  console.log("go parent edu");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Parenting Education\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Parenting Education\" IS NOT FALSE) AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Parenting Education\", \"Program\"; ",
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


// Parenting Education -- if they completed in current year
router.post('/parenteduthisyear', function(req, res) {
  console.log("go parent edu this year");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT COUNT(*) \"Parenting Completed\", \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Parenting Completed\" >= '" + startDate + "' AND \"Head of Household\".\"Parenting Completed\" <= '" + endDate + "') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Program\"; ",
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

// Parenting Education -- if they completed year before
router.post('/parenteduyearbefore', function(req, res) {
  console.log("go parent edu year before");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT COUNT(*) \"Parenting Completed\" , \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Parenting Completed\" < '2015-01-01') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Program\"; ",
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

// Budgeting Education if they did it
router.post('/budgetingedu', function(req, res) {
  console.log("go budgeting edu");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Budgeting Class\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Budgeting Class\" IS NOT FALSE) AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Budgeting Class\", \"Program\"; ",
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

// Budgeting Education during the same year
router.post('/budgetingedusameyear', function(req, res) {
  console.log("go budgeting edu same year");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT COUNT(*) \"Budgeting Completed\", \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Budgeting Completed\" >= '" + startDate + "' AND \"Head of Household\".\"Budgeting Completed\" <= '" + endDate + "') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Program\"; ",
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


// Budgeting Education year before
router.post('/budgetingeduyearbefore', function(req, res) {
  console.log("go budgeting edu year before");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT COUNT(*) \"Budgeting Completed\" , \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Budgeting Completed\" < '" + startDate + "') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Program\"; ",
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


// Risk of Violence
router.post('/violence', function(req, res) {
  console.log("go violence");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Has or Had experienced or at risk for violence\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Has or Had experienced or at risk for violence\" IS NOT NULL AND \"Has or Had experienced or at risk for violence\" != 'NO' AND \"Has or Had experienced or at risk for violence\" != 'No') AND((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Has or Had experienced or at risk for violence\", \"Program\"; ",
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


// Tenant Training if they did it
router.post('/tenanttraining', function(req, res) {
  console.log("go tenant training");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Tenant Training\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Tenant Training\" IS NOT FALSE) AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Tenant Training\", \"Program\"; ",
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


// Tenant Training in the same year
router.post('/tenanttrainingsameyear', function(req, res) {
  console.log("go tenant training same year");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT COUNT(*) \"Tenant Training Completed\", \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Tenant Training Completed\" >= '" + startDate + "' AND \"Head of Household\".\"Tenant Training Completed\" <= '" + endDate + "') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Program\"; ",
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


// Tenant Training in prior year
router.post('/tenanttrainingprioryear', function(req, res) {
  console.log("go tenant training prior year");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT COUNT(*) \"Tenant Training Completed\" , \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Tenant Training Completed\" < '" + startDate + "') AND " +
    "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Program\"; ",
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


// DBT
router.post('/DBT', function(req, res) {
  console.log("go DBT");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"DBT\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"DBT\" IS NOT NULL AND \"DBT\" != 'No') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"DBT\", \"Program\"; " ,
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


// DBT in the same year
router.post('/DBTsameyear', function(req, res) {
  console.log("go DBT same year");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT COUNT(*) \"DBT Completed\", \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Tenant Training Completed\" >= '" + startDate + "' AND \"Head of Household\".\"Tenant Training Completed\" <= '" + endDate + "') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Program\"; ",
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


// DBT in the prior year
router.post('/DBTprioryear', function(req, res) {
  console.log("go DBT prior year");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT COUNT(*) \"DBT Completed\" , \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Head of Household\".\"Tenant Training Completed\" < '" + startDate + "') AND " +
    "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Program\"; ",
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

// Has health improved
router.post('/healthimproved', function(req, res) {
  console.log("go health imoproved");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Has Health Improved\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Has Health Improved\" != '') AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Has Health Improved\", \"Program\"; ",
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

// Increas social support
router.post('/socialsupport', function(req, res) {
  console.log("go social support");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Increased their Social Support\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE(\"Increased their Social Support\" IS NOT FALSE) AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Increased their Social Support\", \"Program\"; ",
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

// Self-Defined Goals
router.post('/selfgoals', function(req, res) {
  console.log("go Self-Defined goals");
  // console.log("req.body line 56: ", req.body);
  // var raceAdult = req.body.raceAdultSelection;
  // var ageAdult = req.body.ageAdultSelection;
  // var raceChild = req.body.raceChildrenSelection;
  // var gender = req.body.genderSelection;
  // var ageChild = req.body.ageChildrenSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Progressed on a Self-Defined Goal\", COUNT(*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE (\"Progressed on a Self-Defined Goal\" IS NOT FALSE) AND ((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
    "GROUP BY \"Progressed on a Self-Defined Goal\", \"Program\"; ",
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
