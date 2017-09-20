var express = require('express');
var router = express.Router();
var SunlightApi = require('../api/sunlight_api');

router.get('/:bioguide_id', function(req, res, next) {
  var bioguide_id = req.params.bioguide_id
  var api = new SunlightApi();

  api.getLegislator(bioguide_id, function(legislator){
    api.getLegislatorVotes(bioguide_id, function(votes){
      res.render('legislator_details', 
      	{ 
      	  legislator: legislator[0], 
      	  votes: votes 
      	}
      );
    });
  })
});


module.exports = router