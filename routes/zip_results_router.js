var express = require('express');
var router = express.Router();
// var {SunlightApi} = require('../api/sunlight_api');
const {Legislator, LEGISLATORS} = require('../models/legislators_model')

router.get('/:zip', function(req, res, next) {
  var zip_from_params = req.params.zip;
  // var api = new SunlightApi(zip_from_params);
  // api.get_legislators();
  // res.send('you sent ' + zip_from_params);
  res.render('zip_results_view', { title: 'Legislators by zip', legislators: LEGISLATORS, from_params: zip_from_params });
});

module.exports = router
