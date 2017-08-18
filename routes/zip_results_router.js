var express = require('express');
var router = express.Router();
const {Legislator, LEGISLATORS} = require('../models/legislators_model')

router.get('/', function(req, res, next) {
  res.render('zip_results', { title: 'Legislators by Zip' });
});

router.get('/:zip', function(req, res, next) {
  res.render('zip_results_view', { title: 'Legislators by zip', legislators: LEGISLATORS });
});

module.exports = router
