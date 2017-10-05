var express = require('express');
var router = express.Router();

const Sunlight = require('../models/sunlightApi');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'What Have You Done'});
});


module.exports = router;
