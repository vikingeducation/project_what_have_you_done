var express = require('express');
var router = express.Router();
var {Representative, representatives} = require('../models/representatives')

router.use('/', function (req, res, next) {
  next()
})

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
