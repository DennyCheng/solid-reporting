var express = require('express');
var router = express.Router();
var pg = require('pg');
// var connectionString = 'postgres://localhost:5432/solidground';
var connectionString = require('../modules/connection');
const fs = require('fs');
var multer  = require('multer');
var storage = multer.memoryStorage();
// This will save the file in storage memory to prevent from making a new folder file
var upload= multer({ storage: storage });

router.post('/', upload.single('file'), function (req, res, next) {

    var file = req.file;
    console.log('file====', file);

    var search = 'CREATE DATABASE "movedb";';

    //file buffer is a shit load of unreadable code, so use tostring to  read sql file
    var body = file.buffer.toString();
    body += ' ALTER TABLE "Head of Household" DROP Column "LastName", DROP Column "MI", DROP Column "FirstName", DROP Column "Address", DROP Column "City", DROP Column "State", DROP Column "ZIPPostal", DROP Column "CellPhone"; ';
    body += ' ALTER TABLE "Head of Household-2" DROP Column "LastName", DROP Column "MI", DROP Column "FirstName", DROP Column "Address", DROP Column "City", DROP Column "State", DROP Column "ZIPPostal", DROP Column "CellPhone"; ';
    body += ' ALTER TABLE "Members of Household"  DROP Column "MI", DROP Column "Last Name", DROP Column "First Name", DROP Column "CellPhone"; ';

    // console.log(body);

    remove();

    function remove() {
        var idx = body.indexOf(search);
        if (idx >= 0 ) {
            body = body.substr(0, idx) + body.substr(idx + search.length);
        }
    }

    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.log('error: ', err);
            res.sendStatus(500);
        }
        client.query(body, function (err, result) {

            console.log(result);
            done();
            if (err) {
                console.log('error: ', err);
                res.sendStatus(500);
            }
            res.send(result.rows);
        });
    });
});

router.get('/', function (req, res) {
    var tables = ' SELECT * FROM "Head of Household"; ';
    tables += ' SELECT * FROM "Head of Household-2"; ';
    tables += ' SELECT * FROM "Members of Household"; ';

    console.log('hello from get');
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query(tables, function (err, result) {
            done();

            if (err) {
                console.log('err---', err);
                res.sendStatus(500);
            }

            res.send(result.rows);
        });
    });
});

router.get('/data', function (req, res) {
    var program = 'SELECT * FROM "Head of Household" WHERE "Gender" = \' $1 \'';
    // program += 'SELECT * FROM "Head of Household-2" WHERE status = \' $2 \'';
    // program += 'SELECT * FROM "Members of Household" WHERE status = \' $2 \'';

    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        console.log('req.param --------', req.params.status);
        client.query(program, function (err, result) {
            done();

            console.log('error line 60');
            console.log(err);
            if (err) {
                res.sendStatus(500);
            }
            console.log(result);
            res.send(result.rows);
        });
    });
});




module.exports = router;
