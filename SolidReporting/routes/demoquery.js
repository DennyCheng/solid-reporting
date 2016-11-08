var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../modules/connection');

//this initializes a connection pool from ../modules/connection
//it will keep idle connections open for a 1 second
//and set a limit of maximum 100 idle clients
var pool = new pg.Pool(connection);

// Date of Birth - Adults only //
router.post('/dobadults', function(req, res) {
  console.log("go DOB adult");
  // console.log("req.body line 09: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var gender = req.body.genderSelection;
  var ageAdult = req.body.ageAdultSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  var ageRangesArray = req.body.arrayDateRanges;
  // Query variables to use in SQL Query
  var raceAdultQuery = '';
  var raceAdult_2Query = '';
  var ageAdultQuery = '';
  var ageAdult_2Query = '';
  var genderAdultQuery = '';
  var genderAdult_2Query = '';
  var lastResidenceQuery = '';
  var lastResidence_2Query = '';
  var ageRangesAdultQuery = '';
  var ageRangesAdult_2Query = '';

  console.log("ageRangesArray: ", ageRangesArray);
  // sorting through raceAdult in HOH selections:
    if(raceAdult.length === 0) {
      // somehow delete the query or make it blank or assume this is select all
      raceAdultQuery = "";
    } else if(raceAdult.length === 1) {
      raceAdultQuery = "(\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
    } else {
      raceAdult.forEach(function(race, i) {
        //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
        if(race === null) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" IS NULL)) AND ";
        } else if(i === 0) {
          raceAdultQuery += "((\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
        } else if(i === (raceAdult.length - 1)) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "')) AND ";
        } else {
            raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
          }
      });
    }
    // console.log("raceAdultQuery after if statement: ", raceAdultQuery);

    // sorting through raceAdult for HOH-2 selections:
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceAdult_2Query = "";
  } else if(raceAdult.length === 1) {
    raceAdult_2Query = "(\"Head of Household-2\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
  } else {
    raceAdult.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" IS NULL)) AND ";
      } else if(i === 0) {
        raceAdult_2Query += "((\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceAdult.length - 1)) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }
  // console.log("raceAdult_2Query after if statement: ", raceAdult_2Query);

  // sorting through gender for Adults in HOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdultQuery = "";
  } else if(gender.length === 1) {
    genderAdultQuery = "(\"Head of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdultQuery += "(\"Head of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdultQuery += "((\"Head of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  // console.log("genderAdultQuery for HOH after if statement: ", genderAdultQuery);

  // sorting through gender for Adults in HOH-2 selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdult_2Query = "";
  } else if(gender.length === 1) {
    genderAdult_2Query = "(\"Head of Household-2\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdult_2Query += "(\"Head of Household-2\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdult_2Query += "((\"Head of Household-2\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  // console.log("genderAdult_2Query for HOH-2 after if statement: ", genderAdult_2Query);

  // sorting through ageAdults in HOH selections:
    if(ageRangesArray.length === 0) {
      // somehow delete the query or make it blank or assume this is select all
      ageRangesAdultQuery = "";
    } else if(ageRangesArray.length === 1) {
      console.log("ageRangesArray[0] line 130: ", ageRangesArray[0]);
      var newDateRange1 = ageRangesArray[0].date1Range;
      var newDateRange2 = ageRangesArray[0].date2Range;
      console.log("newDateRange1: ", newDateRange1);
      console.log("newDateRange2: ", newDateRange2);
      if(newDateRange2 == "") {
        ageRangesAdultQuery = "(\"Head of Household\".\"Date of Birth\" >= '" + newDateRange1 + "') AND ";
      } else {
        ageRangesAdultQuery = "(\"Head of Household\".\"Date of Birth\" >= '" + newDateRange1 + "' AND \"Head of Household\".\"Date of Birth\" <= '" + newDateRange2 + "') AND ";
        console.log("ageRangesAdultQuery line 139: ", ageRangesAdultQuery);
      }
    } else {
      ageRangesArray.forEach(function(ageRange, i) {
        //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
        if(ageRange === null) {
          ageRangesAdultQuery += "(\"Head of Household\".\"Date of Birth\" IS NULL)) AND ";
        } else if(i === 0) {
          ageRangesAdultQuery += "((\"Head of Household\".\"Date of Birth\" = '" + ageRange + "') OR ";
        } else if(i === (ageRangesArray.length - 1)) {
          ageRangesAdultQuery += "(\"Head of Household\".\"Date of Birth\" = '" + ageRange + "')) AND ";
        } else {
            ageRangesAdultQuery += "(\"Head of Household\".\"Date of Birth\" = '" + ageRange + "') OR ";
          }
      });
    }
    console.log("ageRangesAdultQuery after if statement: ", ageRangesAdultQuery);


  // sorting through lastResidence for HOH Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = '';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }
  // console.log("lastResidenceQuery HOH & MOH after if statement: ", lastResidenceQuery);

  // sorting through lastResidence for HOH-2 Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidence_2Query = "";
  } else if(lastResidence.length === 1) {
    lastResidence_2Query = "(\"Head of Household-2\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidence_2Query += "((\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }
  // console.log("lastResidence_2Query for HOH-2 after if statement: ", lastResidence_2Query);


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Date of Birth\", \"Program\" " +
                  "FROM \"Head of Household\" " +
                  "WHERE " + raceAdultQuery + genderAdultQuery + lastResidenceQuery +
                  // ageRangesAdultQuery +
                  "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                  "UNION " +
                  "SELECT \"Head of Household-2\".\"Date of Birth\", \"Head of Household\".\"Program\" " +
                  "FROM \"Head of Household-2\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE " + raceAdult_2Query + genderAdult_2Query + lastResidence_2Query +
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




// Date of Birth - Children only  //
router.post('/dobchildren', function(req, res) {
  console.log("go DOB Child");
  // console.log("req.body line 70: ", req.body);
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceQuery = '';
  var genderQuery = '';
  var ageChildQuery = '';
  var lastResidenceQuery = '';

  // console.log("lastResidence line 160: ", lastResidence);

  // sorting through raceChild selections:
  if(raceChild.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceQuery = "length is 0, nothing selected";
  } else if(raceChild.length === 1) {
    raceQuery = "(\"Members of Household\".\"Race Code\" = '" + raceChild[0] + "') AND ";
  } else {
    raceChild.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceQuery += "(\"Members of Household\".\"Race Code\" IS NULL)) AND "
      } else if(i === 0) {
        raceQuery += "((\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceChild.length - 1)) {
        raceQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }
  // console.log("raceQuery for Children after if statement: ", raceQuery);

  // sorting through gender selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderQuery = "(\"Members of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderQuery += "(\"Members of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderQuery += "((\"Members of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  // console.log("genderQuery for Children after if statement: ", genderQuery);

  // // sorting through ageChild Selections:
  // if(ageChild.length === 0) {
  //
  // } else if (ageChild.length === 1) {
  //
  // } else {
  //
  // }

  // sorting through lastResidence Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }
  // console.log("lastResidenceQuery for Children after if statement: ", lastResidenceQuery);


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Members of Household\".\"Date of Birth\" as DOB, \"Head of Household\".\"Program\" " +
                "FROM \"Members of Household\" " +
                "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                "WHERE " + raceQuery + genderQuery + lastResidenceQuery +
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



// Total People - Adults and Children //
router.post('/totalpeople', function(req, res) {
  console.log("go total people");
  // console.log("req.body line 107: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceAdultQuery = '';
  var raceAdult_2Query = '';
  var raceChildQuery = '';
  var ageAdultQuery = '';
  var ageAdult_2Query = '';
  var ageChildQuery = '';
  var genderAdultQuery = '';
  var genderAdult_2Query = '';
  var genderChildQuery = '';
  var lastResidenceQuery = '';
  var lastResidence_2Query = '';
  console.log("lastResidence line 354: ", lastResidence);

  // sorting through raceAdult selections:
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceAdultQuery = "";
  } else if(raceAdult.length === 1) {
    raceAdultQuery = "(\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
  } else {
    raceAdult.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceAdultQuery += "(\"Head of Household\".\"Race Code\" IS NULL)) AND ";
      } else if(i === 0) {
        raceAdultQuery += "((\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceAdult.length - 1)) {
        raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }
  console.log("raceAdultQuery after if statement: ", raceAdultQuery);

  // sorting through raceAdult for HOH-2 selections:
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceAdult_2Query = "";
  } else if(raceAdult.length === 1) {
    raceAdult_2Query = "(\"Head of Household-2\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
  } else {
    raceAdult.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" IS NULL)) AND ";
      } else if(i === 0) {
        raceAdult_2Query += "((\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceAdult.length - 1)) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }
  console.log("raceAdult_2Query after if statement: ", raceAdult_2Query);

  // // sorting through ageAdult Selections:
  // if(ageAdult.length === 0) {
  //    ageAdultQuery
  // } else if (ageAdult.length === 1) {
  //    ageAdultQuery
  // } else {
  //    ageAdultQuery
  // }

  // sorting through raceChild selections:
  if(raceChild.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceChildQuery = "";
  } else if(raceChild.length === 1) {
    raceChildQuery = "(\"Members of Household\".\"Race Code\" = '" + raceChild[0] + "') AND ";
  } else {
    raceChild.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceChildQuery += "(\"Members of Household\".\"Race Code\" IS NULL)) AND "
      } else if(i === 0) {
        raceChildQuery += "((\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceChild.length - 1)) {
        raceChildQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceChildQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }
  console.log("raceChildQuery after if statement: ", raceChildQuery);

  // sorting through gender for Adults in HOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdultQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdultQuery = "(\"Head of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdultQuery += "(\"Head of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdultQuery += "((\"Head of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  console.log("genderAdultQuery for HOH after if statement: ", genderAdultQuery);

  // sorting through gender for Adults in HOH-2 selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdult_2Query = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdult_2Query = "(\"Head of Household-2\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdult_2Query += "(\"Head of Household-2\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdult_2Query += "((\"Head of Household-2\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  console.log("genderAdult_2Query for HOH-2 after if statement: ", genderAdult_2Query);

  // sorting through gender for children in MOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderChildQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderChildQuery = "(\"Members of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderChildQuery += "(\"Members of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderChildQuery += "((\"Members of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  console.log("genderChildQuery for Children after if statement: ", genderChildQuery);

  // // sorting through ageChild Selections:
  // if(ageChild.length === 0) {
  //    ageChildQuery +=
  // } else if (ageChild.length === 1) {
  //    ageChildQuery +=
  // } else {
  //    ageChildQuery +=
  // }

  // sorting through lastResidence for HOH Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }
  console.log("lastResidenceQuery HOH & MOH after if statement: ", lastResidenceQuery);

  // sorting through lastResidence for HOH-2 Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidence_2Query = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidence_2Query = "(\"Head of Household-2\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidence_2Query += "((\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }
  console.log("lastResidence_2Query for HOH-2 after if statement: ", lastResidence_2Query);


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT SUM (numberOfPeople), 'Adults' as role, \"Program\" " +
                  "FROM( " +
                  "SELECT COUNT (*) as numberOfPeople, \"Program\" " +
                  "FROM \"Head of Household\" " +
                  "WHERE " + raceAdultQuery + genderAdultQuery + lastResidenceQuery +
                  "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                  "GROUP BY \"Program\" " +
                  "UNION " +
                  "SELECT COUNT (*) as numberOfPeople, \"Head of Household\".\"Program\" " +
                  "FROM \"Head of Household-2\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE " + raceAdult_2Query + genderAdult_2Query + lastResidence_2Query +
                  "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                  "GROUP BY \"Head of Household\".\"Program\" " +
                  ") as Adult " +
                  "GROUP BY \"Program\" " +
                  "UNION " +
                  "SELECT COUNT (*) as numberOfPeople, 'Children' as role, \"Head of Household\".\"Program\" " +
                  "FROM \"Members of Household\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE " + raceChildQuery + genderChildQuery + lastResidenceQuery +
                  "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
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



// Total families - Just adults from Head of Household //
router.post('/totalfamilies', function(req, res) {
  console.log("go total families");
  // console.log("req.body line 107: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceAdultQuery = '';
  var raceAdult_2Query = '';
  var raceChildQuery = '';
  var ageAdultQuery = '';
  var ageAdult_2Query = '';
  var ageChildQuery = '';
  var genderAdultQuery = '';
  var genderAdult_2Query = '';
  var genderChildQuery = '';
  var lastResidenceQuery = '';
  var lastResidence_2Query = '';
  console.log("lastResidence line 354: ", lastResidence);

  // sorting through raceAdult selections:
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceAdultQuery = "";
  } else if(raceAdult.length === 1) {
    raceAdultQuery = "(\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
  } else {
    raceAdult.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceAdultQuery += "(\"Head of Household\".\"Race Code\" IS NULL)) AND ";
      } else if(i === 0) {
        raceAdultQuery += "((\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceAdult.length - 1)) {
        raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }
  console.log("raceAdultQuery after if statement: ", raceAdultQuery);

  // sorting through raceAdult for HOH-2 selections:
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceAdult_2Query = "";
  } else if(raceAdult.length === 1) {
    raceAdult_2Query = "(\"Head of Household-2\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
  } else {
    raceAdult.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" IS NULL)) AND ";
      } else if(i === 0) {
        raceAdult_2Query += "((\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceAdult.length - 1)) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }
  console.log("raceAdult_2Query after if statement: ", raceAdult_2Query);

  // // sorting through ageAdult Selections:
  // if(ageAdult.length === 0) {
  //    ageAdultQuery
  // } else if (ageAdult.length === 1) {
  //    ageAdultQuery
  // } else {
  //    ageAdultQuery
  // }

  // sorting through raceChild selections:
  if(raceChild.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceChildQuery = "";
  } else if(raceChild.length === 1) {
    raceChildQuery = "(\"Members of Household\".\"Race Code\" = '" + raceChild[0] + "') AND ";
  } else {
    raceChild.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceChildQuery += "(\"Members of Household\".\"Race Code\" IS NULL)) AND "
      } else if(i === 0) {
        raceChildQuery += "((\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceChild.length - 1)) {
        raceChildQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceChildQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }
  console.log("raceChildQuery after if statement: ", raceChildQuery);

  // sorting through gender for Adults in HOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdultQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdultQuery = "(\"Head of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdultQuery += "(\"Head of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdultQuery += "((\"Head of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  console.log("genderAdultQuery for HOH after if statement: ", genderAdultQuery);

  // sorting through gender for Adults in HOH-2 selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdult_2Query = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdult_2Query = "(\"Head of Household-2\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdult_2Query += "(\"Head of Household-2\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdult_2Query += "((\"Head of Household-2\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  console.log("genderAdult_2Query for HOH-2 after if statement: ", genderAdult_2Query);

  // sorting through gender for children in MOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderChildQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderChildQuery = "(\"Members of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderChildQuery += "(\"Members of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderChildQuery += "((\"Members of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }
  console.log("genderChildQuery for Children after if statement: ", genderChildQuery);

  // // sorting through ageChild Selections:
  // if(ageChild.length === 0) {
  //    ageChildQuery +=
  // } else if (ageChild.length === 1) {
  //    ageChildQuery +=
  // } else {
  //    ageChildQuery +=
  // }

  // sorting through lastResidence for HOH Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }
  console.log("lastResidenceQuery HOH & MOH after if statement: ", lastResidenceQuery);

  // sorting through lastResidence for HOH-2 Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidence_2Query = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidence_2Query = "(\"Head of Household-2\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidence_2Query += "((\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }
  console.log("lastResidence_2Query for HOH-2 after if statement: ", lastResidence_2Query);


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query( "SELECT COUNT (*) as numberOfPeople, \"Program\" " +
                  "FROM \"Head of Household\" " +
                  "WHERE " + raceAdultQuery + genderAdultQuery + lastResidenceQuery +
                  "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                  "GROUP BY \"Program\" ;",
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

// All Gender - Adults and Children //
router.post('/allgender', function(req, res) {
  console.log("go all gender");
  // console.log("req.body line 170: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceAdultQuery = '';
  var raceAdult_2Query = '';
  var raceChildQuery = '';
  var ageAdultQuery = '';
  var ageAdult_2Query = '';
  var ageChildQuery = '';
  var genderAdultQuery = '';
  var genderAdult_2Query = '';
  var genderChildQuery = '';
  var lastResidenceQuery = '';
  var lastResidence_2Query = '';

  // sorting through raceAdult selections:
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceAdultQuery = "length is 0, nothing selected";
  } else if(raceAdult.length === 1) {
    raceAdultQuery = "(\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
  } else {
    raceAdult.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceAdultQuery += "(\"Head of Household\".\"Race Code\" IS NULL)) AND ";
      } else if(i === 0) {
        raceAdultQuery += "((\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceAdult.length - 1)) {
        raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }

  // sorting through raceAdult for HOH-2 selections:
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceAdult_2Query = "length is 0, nothing selected";
  } else if(raceAdult.length === 1) {
    raceAdult_2Query = "(\"Head of Household-2\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
  } else {
    raceAdult.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" IS NULL)) AND ";
      } else if(i === 0) {
        raceAdult_2Query += "((\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceAdult.length - 1)) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }

  // // sorting through ageAdult Selections:
  // if(ageAdult.length === 0) {
  //    ageAdultQuery
  // } else if (ageAdult.length === 1) {
  //    ageAdultQuery
  // } else {
  //    ageAdultQuery
  // }

  // sorting through raceChild selections:
  if(raceChild.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceChildQuery = "length is 0, nothing selected";
  } else if(raceChild.length === 1) {
    raceChildQuery = "(\"Members of Household\".\"Race Code\" = '" + raceChild[0] + "') AND ";
  } else {
    raceChild.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceChildQuery += "(\"Members of Household\".\"Race Code\" IS NULL)) AND "
      } else if(i === 0) {
        raceChildQuery += "((\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceChild.length - 1)) {
        raceChildQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceChildQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }

  // sorting through gender for Adults in HOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdultQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdultQuery = "(\"Head of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdultQuery += "(\"Head of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdultQuery += "((\"Head of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }

  // sorting through gender for Adults in HOH-2 selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdult_2Query = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdult_2Query = "(\"Head of Household-2\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdult_2Query += "(\"Head of Household-2\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdult_2Query += "((\"Head of Household-2\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }

  // sorting through gender for children in MOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderChildQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderChildQuery = "(\"Members of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderChildQuery += "(\"Members of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderChildQuery += "((\"Members of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }

  // // sorting through ageChild Selections:
  // if(ageChild.length === 0) {
  //    ageChildQuery +=
  // } else if (ageChild.length === 1) {
  //    ageChildQuery +=
  // } else {
  //    ageChildQuery +=
  // }

  // sorting through lastResidence for HOH Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }

  // sorting through lastResidence for HOH-2 Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidence_2Query = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidence_2Query = "(\"Head of Household-2\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidence_2Query += "((\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Gender\", SUM (numberOfPeople), \"Program\" " +
                 "FROM " +
                 "(SELECT \"Gender\", COUNT (*) as numberOfPeople, \"Program\"  " +
                 "FROM \"Head of Household\" " +
                 "WHERE " + raceAdultQuery + genderAdultQuery + lastResidenceQuery +
                 "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                 "GROUP BY \"Gender\", \"Program\" " +
                 "UNION " +
                 "SELECT \"Head of Household-2\".\"Gender\", COUNT (*) as numberOfPeople, \"Head of Household\".\"Program\"  " +
                 "FROM \"Head of Household-2\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE " + raceAdult_2Query + genderAdult_2Query + lastResidence_2Query +
                 "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                 "GROUP BY \"Head of Household-2\".\"Gender\", \"Head of Household\".\"Program\" " +
                 "UNION " +
                 "SELECT \"Members of Household\".\"Gender\", COUNT (*) as numberOfPeople, \"Head of Household\".\"Program\"  " +
                 "FROM \"Members of Household\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE " + raceChildQuery + genderChildQuery + lastResidenceQuery +
                 "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
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




// Race - only Adults //
router.post('/raceadults', function(req, res) {
  console.log("go adult race");
  // console.log("req.body line 56: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var gender = req.body.genderSelection;
  var ageAdult = req.body.ageAdultSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceAdultQuery = '';
  var raceAdult_2Query = '';
  var ageAdultQuery = '';
  var ageAdult_2Query = '';
  var genderAdultQuery = '';
  var genderAdult_2Query = '';
  var lastResidenceQuery = '';
  var lastResidence_2Query = '';


  // sorting through raceAdult in HOH selections:
    if(raceAdult.length === 0) {
      // somehow delete the query or make it blank or assume this is select all
      raceAdultQuery = "length is 0, nothing selected";
    } else if(raceAdult.length === 1) {
      raceAdultQuery = "(\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
    } else {
      raceAdult.forEach(function(race, i) {
        //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
        if(race === null) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" IS NULL)) AND ";
        } else if(i === 0) {
          raceAdultQuery += "((\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
        } else if(i === (raceAdult.length - 1)) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "')) AND ";
        } else {
            raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
          }
      });
    }

    // sorting through raceAdult for HOH-2 selections:
  if(raceAdult.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceAdult_2Query = "length is 0, nothing selected";
  } else if(raceAdult.length === 1) {
    raceAdult_2Query = "(\"Head of Household-2\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
  } else {
    raceAdult.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" IS NULL)) AND ";
      } else if(i === 0) {
        raceAdult_2Query += "((\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceAdult.length - 1)) {
        raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceAdult_2Query += "(\"Head of Household-2\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }

  // sorting through gender for Adults in HOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdultQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdultQuery = "(\"Head of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdultQuery += "(\"Head of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdultQuery += "((\"Head of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }

  // sorting through gender for Adults in HOH-2 selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdult_2Query = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdult_2Query = "(\"Head of Household-2\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdult_2Query += "(\"Head of Household-2\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdult_2Query += "((\"Head of Household-2\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }

  // // sorting through ageAdult Selections:
  // if(ageAdult.length === 0) {
  //
  // } else if (ageAdult.length === 1) {
  //
  // } else {
  //
  // }

  // sorting through lastResidence for HOH Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }

  // sorting through lastResidence for HOH-2 Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidence_2Query = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidence_2Query = "(\"Head of Household-2\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidence_2Query += "((\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidence_2Query += "(\"Head of Household-2\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Race Code\", SUM (Race), \"Program\" " +
                 "FROM " +
                 "(SELECT \"Race Code\", COUNT (*) as Race, \"Program\" " +
                 "FROM \"Head of Household\" " +
                 "WHERE " + raceAdultQuery + genderAdultQuery + lastResidenceQuery +
                 "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                 "GROUP BY \"Race Code\", \"Program\" " +
                 "UNION " +
                 "SELECT \"Head of Household-2\".\"Race Code\", COUNT (*) as Race, \"Head of Household\".\"Program\"  " +
                 "FROM \"Head of Household-2\" " +
                 "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                 "WHERE " + raceAdult_2Query + genderAdult_2Query + lastResidence_2Query +
                 "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                 "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                 "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
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




// Race - only Children //
router.post('/racechildren', function(req, res) {
  console.log("go child race");
  // console.log("req.body line 56: ", req.body);
  var raceChild = req.body.raceChildrenSelection;
  var gender = req.body.genderSelection;
  var ageChild = req.body.ageChildrenSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceQuery = '';
  var genderQuery = '';
  var ageChildQuery = '';
  var lastResidenceQuery = '';


  // sorting through raceChild selections:
  if(raceChild.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    raceQuery = "length is 0, nothing selected";
  } else if(raceChild.length === 1) {
    raceQuery = "(\"Members of Household\".\"Race Code\" = '" + raceChild[0] + "') AND ";
  } else {
    raceChild.forEach(function(race, i) {
      //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
      if(race === null) {
        raceQuery += "(\"Members of Household\".\"Race Code\" IS NULL)) AND "
      } else if(i === 0) {
        raceQuery += "((\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
      } else if(i === (raceChild.length - 1)) {
        raceQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "')) AND ";
      } else {
          raceQuery += "(\"Members of Household\".\"Race Code\" = '" + race + "') OR ";
        }
    });
  }

  // sorting through gender selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderQuery = "(\"Members of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderQuery += "(\"Members of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderQuery += "((\"Members of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }


  // // sorting through ageChild Selections:
  // if(ageChild.length === 0) {
  //
  // } else if (ageChild.length === 1) {
  //
  // } else {
  //
  // }

  // sorting through lastResidence Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Members of Household\".\"Race Code\" as Race, COUNT (*), \"Head of Household\".\"Program\" " +
                "FROM \"Members of Household\" " +
                "LEFT JOIN \"Head of Household\" ON \"Members of Household\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                "WHERE " + raceQuery + genderQuery + lastResidenceQuery +
                "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
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




// Last Residence //
router.post('/lastres', function(req, res) {
  console.log("go last res");
  // console.log("req.body line 56: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var gender = req.body.genderSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceAdultQuery = '';
  var ageAdultQuery = '';
  var genderAdultQuery = '';
  var lastResidenceQuery = '';


  // sorting through raceAdult in HOH selections:
    if(raceAdult.length === 0) {
      // somehow delete the query or make it blank or assume this is select all
      raceAdultQuery = "length is 0, nothing selected";
    } else if(raceAdult.length === 1) {
      raceAdultQuery = "(\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
    } else {
      raceAdult.forEach(function(race, i) {
        //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
        if(race === null) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" IS NULL)) AND ";
        } else if(i === 0) {
          raceAdultQuery += "((\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
        } else if(i === (raceAdult.length - 1)) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "')) AND ";
        } else {
            raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
          }
      });
    }

  // sorting through gender for Adults in HOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdultQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdultQuery = "(\"Head of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdultQuery += "(\"Head of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdultQuery += "((\"Head of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }

  // // sorting through ageAdult Selections:
  // if(ageAdult.length === 0) {
  //
  // } else if (ageAdult.length === 1) {
  //
  // } else {
  //
  // }

  // sorting through lastResidence for HOH Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"County of Last Residence\", COUNT (*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE " + raceAdultQuery + genderAdultQuery + lastResidenceQuery +
    "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
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




// Household Income  //
router.post('/houseincome', function(req, res) {
  console.log("go house income");
  // console.log("req.body line 56: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var gender = req.body.genderSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceAdultQuery = '';
  var ageAdultQuery = '';
  var genderAdultQuery = '';
  var lastResidenceQuery = '';

  // sorting through raceAdult in HOH selections:
    if(raceAdult.length === 0) {
      // somehow delete the query or make it blank or assume this is select all
      raceAdultQuery = "length is 0, nothing selected";
    } else if(raceAdult.length === 1) {
      raceAdultQuery = "(\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
    } else {
      raceAdult.forEach(function(race, i) {
        //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
        if(race === null) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" IS NULL)) AND ";
        } else if(i === 0) {
          raceAdultQuery += "((\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
        } else if(i === (raceAdult.length - 1)) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "')) AND ";
        } else {
            raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
          }
      });
    }

  // sorting through gender for Adults in HOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdultQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdultQuery = "(\"Head of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdultQuery += "(\"Head of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdultQuery += "((\"Head of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }

  // // sorting through ageAdult Selections:
  // if(ageAdult.length === 0) {
  //
  // } else if (ageAdult.length === 1) {
  //
  // } else {
  //
  // }

  // sorting through lastResidence for HOH Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"HoH Mthly  Earned Income\", \"HoH Mthly UnEarned Incom\", \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE " + raceAdultQuery + genderAdultQuery + lastResidenceQuery +
    "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
    "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
    "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
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




// Families Exiting Housing  //
router.post('/famsexit', function(req, res) {
  console.log("go fam exit");
  // console.log("req.body line 56: ", req.body);
  var raceAdult = req.body.raceAdultSelection;
  var ageAdult = req.body.ageAdultSelection;
  var gender = req.body.genderSelection;
  var lastResidence = req.body.lastResidenceSelection;
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query
  var raceAdultQuery = '';
  var ageAdultQuery = '';
  var genderAdultQuery = '';
  var lastResidenceQuery = '';

  // sorting through raceAdult in HOH selections:
    if(raceAdult.length === 0) {
      // somehow delete the query or make it blank or assume this is select all
      raceAdultQuery = "length is 0, nothing selected";
    } else if(raceAdult.length === 1) {
      raceAdultQuery = "(\"Head of Household\".\"Race Code\" = '" + raceAdult[0] + "') AND ";
    } else {
      raceAdult.forEach(function(race, i) {
        //differences if there is a beginning '(' or ')' and ending with 'OR' or 'AND'
        if(race === null) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" IS NULL)) AND ";
        } else if(i === 0) {
          raceAdultQuery += "((\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
        } else if(i === (raceAdult.length - 1)) {
          raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "')) AND ";
        } else {
            raceAdultQuery += "(\"Head of Household\".\"Race Code\" = '" + race + "') OR ";
          }
      });
    }

  // sorting through gender for Adults in HOH selections:
  if(gender.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    genderAdultQuery = 'length is 0, nothing selected';
  } else if(gender.length === 1) {
    genderAdultQuery = "(\"Head of Household\".\"Gender\" = '" + gender[0] + "') AND ";
  } else {
    gender.forEach(function(gen, i) {
      if(i === (gender.length - 1)) {
        genderAdultQuery += "(\"Head of Household\".\"Gender\" = '" + gen + "')) AND ";
      } else {
          genderAdultQuery += "((\"Head of Household\".\"Gender\" = '" + gen + "') OR ";
        }
    });
  }

  // // sorting through ageAdult Selections:
  // if(ageAdult.length === 0) {
  //
  // } else if (ageAdult.length === 1) {
  //
  // } else {
  //
  // }

  // sorting through lastResidence for HOH Selections:
  if(lastResidence.length === 0) {
    // somehow delete the query or make it blank or assume this is select all
    lastResidenceQuery = 'length is 0, nothing selected';
  } else if(lastResidence.length === 1) {
    lastResidenceQuery = "(\"Head of Household\".\"County of Last Residence\" = '" + lastResidence[0] + "') AND ";
  } else {
    lastResidence.forEach(function(county, i) {
      if(i === 0) {
        lastResidenceQuery += "((\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
      } else if(i === (lastResidence.length - 1)) {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "')) AND ";
      } else {
        lastResidenceQuery += "(\"Head of Household\".\"County of Last Residence\" = '" + county + "') OR ";
        }
    });
  }


  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT \"Reason for Leaving\", COUNT (*), \"Program\" " +
    "FROM \"Head of Household\" " +
    "WHERE " + raceAdultQuery + genderAdultQuery + lastResidenceQuery +
    "(\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' and \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
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
