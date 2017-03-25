var express = require('express');
var router = express.Router();
var {Representative, representatives} = require('../models/representatives')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
