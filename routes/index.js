var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var google = require('../models/google');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find Your Representative' });
});


/* On POST, send object results */
router.get('/results', function(req, res, next) {
  var address = req.query;

  // CALL API HERE
  var results = google.getGoogleAPI(address.firstline, address.city, address.state, address.zip);
  res.render({ googleResults: results });
});

module.exports = router;
