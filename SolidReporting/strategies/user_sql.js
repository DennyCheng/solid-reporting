var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

passport.serializeUser(function(user, done) {
  console.log('serialized');
  console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
// TO DO SQL query
  console.log('called deserializeUser');
  pg.connect(connection, function (err, client) {

    if(err) {
      console.log(err);
      done(err);
    }

    var user = {};
    console.log('called deserializeUser - pg');


    client.query("SELECT * FROM users WHERE id = $1", [id], function(err, result) {
      client.end();

      // Handle Errors
      if(err) {
        console.log(err);
        done(err);
      }

      user = result.rows[0];

      if(!user) {
          // user not found
          return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // user found
        console.log('User row', user);
        done(null, user);
      }

    });
  });
});

// Does actual work of logging in
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    }, function(req, username, password, done){
	    pg.connect(connection, function (err, client) {
	    	console.log('called local - pg');
	    	var user = {};
        // assumes the username will be unique, thus returning 1 or 0 results
        var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

        query.on('row', function (row) {
        	console.log('User obj', row);
        	user = row;

          // Hash and compare
          if(encryptLib.comparePassword(password, user.password)) {
            // all good!
            console.log('passwords match');
            done(null, user);
          } else {
            console.log('password does not match');
            done(null, false, {message: 'Incorrect credentials.'});
          }

        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
	    });
    }
));

module.exports = passport;
