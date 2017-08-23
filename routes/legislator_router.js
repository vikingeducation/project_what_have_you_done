var express = require('express');
var router = express.Router();
var {SunlightApi} = require('../api/sunlight_api');

router.get('/:bioguide_id', function(req, res, next) {
  var bioguide_id = req.params.bioguide_id
  var api = new SunlightApi();

  // make a call to the api to get a specific legislator
  api.getLegislator(bioguide_id, function(legislator){
    // this is the action of the callback referenced api function
    res.render('legislator_show', { title: 'Legislator show page', legislator: legislator[0] });
  })
});


module.exports = router