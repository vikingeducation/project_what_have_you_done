var express = require('express');
var router = express.Router();
var {SunlightApi} = require('../api/sunlight_api');

router.get('/', function(req, res, next) {
  // res.send('you sent ' + req.query.zip);
  var zip = req.query.zip;
  var api = new SunlightApi();

  // make a call to the api to get legislators for this zip
  api.getLegislators(zip, function(legislators){
    // this is the action of the callback referenced api function
    res.render('legislators_index', { title: 'Legislators by zip', legislators: legislators, zip_numbers: zip.split('') });
  });
});

module.exports = router
