var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = 'postgres://localhost:5432/omicron';
//this needs to be specified for our DB**

console.log("we hit the server")

module.exports = router;
