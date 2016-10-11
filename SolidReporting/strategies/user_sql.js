var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');


//this initializes a connection pool from ../modules/connection
//it will keep idle connections open for a 1 second
//and set a limit of maximum 100 idle clients
var pool = new pg.Pool(connection);

passport.serializeUser(function(user, done) {
  console.log('serialized', user);
  console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
// TO DO SQL query
  console.log('called deserializeUser');
  pool.connect(function (err, client) {
    if(err) {
      console.log('connection error ', err);
      done(err);
    }

    var user = {};

    client.query("SELECT * FROM users WHERE id = $1", [id], function(err, result) {
      client.end();

      // Handle Errors
      if(err) {
        console.log('query error', err);
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
	    pool.connect(function (err, client) {
        if(err) {
          console.log('connection error', err);
          return done(null, false);
        }

	    	console.log('called local - pg');
	    	var user = {};
        // assumes the username will be unique, thus returning 1 or 0 results
        client.query("SELECT * FROM users WHERE username = $1", [username],
          function(err, result) {
            client.end();

            // Handle Errors
            if (err) {
              console.log('query err ', err);
              return done(null, false);
            }

            var user = result.rows[0];

            if(user) {
              // Hash and compare
              if(encryptLib.comparePassword(password, user.password)) {
                // all good!
                console.log('passwords match');
                done(null, user);
              } else {
                console.log('password does not match');
                return done(null, false, {message: 'Incorrect credentials.'});
              }
            } else {
              console.log('no user. just fail');
              return done(null, false);
            }
          });


	    });
    }
));

module.exports = passport;
