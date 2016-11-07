router.post('/totalpeopleforoutcomes', function(req, res) {
  console.log("go total people, outcomes");
  // console.log("req.body line 107: ", req.body);
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;
  // Query variables to use in SQL Query

  pool.connect(function(err, client, done) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT SUM (numberOfPeople), 'Adults' as role, \"Program\" " +
                  "FROM( " +
                  "SELECT COUNT (*) as numberOfPeople, \"Program\" " +
                  "FROM \"Head of Household\" " +
                  "WHERE " +
                  "((\"Head of Household\".\"Program Exit Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" <= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" IS NULL) " +
                  "OR (\"Head of Household\".\"Program Entry Date\" <= '" + startDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "') " +
                  "OR (\"Head of Household\".\"Program Entry Date\" >= '" + startDate + "' AND \"Head of Household\".\"Program Entry Date\" <= '" + endDate + "' AND \"Head of Household\".\"Program Exit Date\" >= '" + endDate + "')) " +
                  "GROUP BY \"Program\" " +
                  "UNION " +
                  "SELECT COUNT (*) as numberOfPeople, \"Head of Household\".\"Program\" " +
                  "FROM \"Head of Household-2\" " +
                  "LEFT JOIN \"Head of Household\" ON \"Head of Household-2\".\"Head of Household\" = \"Head of Household\".\"HoHID\" " +
                  "WHERE " +
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
                  "WHERE " + 
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
