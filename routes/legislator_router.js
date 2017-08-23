var express = require('express');
var router = express.Router();
var {SunlightApi} = require('../api/sunlight_api');

router.get('/:bioguide_id', function(req, res, next) {
  var bioguide_id = req.params.bioguide_id
  var api = new SunlightApi();

  // make a call to the api to get a specific legislator
  api.getLegislator(bioguide_id, function(legislator){
    // make a call to the api to get that legislator's vote records
    api.getLegislatorVotes(bioguide_id, function(votes){
      res.render('legislator_show', { title: 'Legislator show page', legislator: legislator[0], votes: votes });
    });
  })
});


module.exports = router