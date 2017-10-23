var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find Your Representative' });
});

/* On POST, send object results */
router.post('/', function(req, res, next) {
  var params = req.body;
  res.render('results', { params: params });
});

module.exports = router;
