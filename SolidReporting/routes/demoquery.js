var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/solid_ground';

//routes
// router.post('/', function(req, res) {
//   var task = req.body;
//   console.log(task);
//
//   // Store in DB
//   pg.connect(connection, function(err, client, done) {
//     if(err) {
//       console.log(err);
//       res.sendStatus(500);
//     }
//
//     client.query("INSERT INTO tasks (task_content) VALUES ($1)",
//       [task.content],
//       function(err, result) {
//         done();
//
//         if(err) {
//           console.log("query error: ", err);
//           res.sendStatus(500);
//         }
//         // created!
//         res.sendStatus(201);
//     });
//   });
//
// });

router.get('/', function(req, res) {
  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM tasks ORDER BY completed_date DESC",
      function(err, result) {
        done();

        if(err) {
          console.log("select error: ", err);
          res.sendStatus(500);
        }
        // console.log('results: ', resultStuff);

        res.send(result.rows);
    });

  });
});


router.delete('/:id', function(req, res) {
  var taskID = req.params.id;

  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

  client.query("DELETE FROM tasks WHERE id = $1",
      [taskID],
      function(err, result) {
        done();

        if(err) {
          console.log("delete error: ", err);
          res.sendStatus(500);
        }

        res.sendStatus(202);
    });
  });

});

module.exports = router;
