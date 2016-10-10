var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var path = require('path');

var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

//this initializes a connection pool from ../modules/connection
//it will keep idle connections open for a 1 second
//and set a limit of maximum 100 idle clients
var pool = new pg.Pool(connection);

router.post('/', function(req, res, next) {
  var user = req.body;
  console.log("user pulled in from Data Factory: ", user);

  async.waterfall(
        [
          randomToken,
          findUser,
          sendEmail,
        ],
        shutdown
  );
  function randomToken(done) {
    crypto.randomBytes(20, function(err, buf) {
      var token = buf.toString('hex');
      console.log("real token: ", token);
      done(err, token, user);
    });
  }
  function findUser(token, user, cb) {
    console.log("token maybe: ", token);
    user.reset_password_token = token;
    console.log("Date.now(): ", Date.now())
    user.reset_password_expires = Date.now() + 3600000; // 1 hour
    pool.connect(function(err, client, done) {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      }

      client.query("UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE username = $3",
                    [user.reset_password_token, user.reset_password_expires, user.username],
                    function(err, result) {

                      if (err) {
                        console.log("error: ", err);
                        res.sendStatus(500);
                      }
                      console.log("result: ", result);
                      console.log("result.rowCount: ", result.rowCount);

                      if(result.rowCount == 0) {
                        console.log('no user found!!')
                        res.sendStatus(204);
                      } else {
                        console.log("user from DB: ", user);
                        client.end();
                        cb(null, token, user);
                      }
                    });
    });
  }
  function sendEmail(token, user, done) {
    console.log("sendEmail is running");
    var smtpTransport = nodemailer.createTransport('SMTP', {
      service: 'SendGrid',
      auth: {
        user: '',
        pass: ''
      }
    });
    var mailOptions = {
      to: user.username,
      from: 'passwordreset@demo.com',
      subject: 'Node.js Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
      console.log('An e-mail has been sent to ' + user.username + ' with further instructions.');
      done(err, 'done');
    });
  }
  function shutdown(err) {
    console.log("When does shutdown function get hit?");
    if (err) return next(err);
    res.redirect('/');
  }
});

router.get('/reset/:token', function(req, res) {
  console.log('token in url: ', req.params.token);
  console.log("date.now in get line 106: ", Date.now());
  pool.connect(function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }
    client.query("SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires >= $2;",  //  AND reset_password_expires = $2
              [req.params.token, Date.now()],
              function(err, result) {
                done();

                if (err) {
                  console.log("error, Password reset token is invalid or has expired: ", err);
                  res.sendStatus(500);
                }

                console.log("result.rows: ", result.rows);
                if(result.rows == 0 || result.rows == []) {
                  console.log('Password reset token is invalid or has expired!!')
                  res.sendStatus(204);
                } else {
                  var userID = result.rows[0].id;
                  var username = result.rows[0].username;
                  userID = userID.toString();
                  var user = {
                    userID: userID,
                    username: username
                  }
                  console.log("user in GET request: ", user);

                  res.send(user);
                }
              });
  });
});

router.post('/reset', function(req, res) {
  console.log("req.body in POST: ", req.body);
  var password = encryptLib.encryptPassword(req.body.password);
  var user = {
    userId: req.body.userId,
    password: password,
    username: req.body.username
  }

  async.waterfall(
        [
          resetPassword,
          sendEmail,
        ],
        shutdown
  );
    function resetPassword(cb) {
      console.log("user in resetPassword: ", user);
      pool.connect(function(err, client, done) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        }
        client.query("UPDATE users SET password = $1, reset_password_token = $2, reset_password_expires = $3 WHERE id = $4;",
                  [user.password, 'NULL', 'NULL', user.userId],
                  function(err, result) {

                    if (err) {
                      console.log("error: ", err);
                      res.sendStatus(500);
                    }

                    client.end();
                    cb(null, user);
                  });
      });
    }
    function sendEmail(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '',
          pass: ''
        }
      });
      var mailOptions = {
        to: user.username,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log("Success! Your password has been changed.");
        done(err);
      });
    }
    function shutdown(err) {
      res.redirect('/');
    }
});

router.get('/', function(req, res) {
  res.render('forgot', {
    user: req.user
  });
});

module.exports = router;
