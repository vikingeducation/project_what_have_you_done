let _ = require('lodash');
let express = require('express');
let router = express.Router();
const SunlightApi = require('../utils/SunlightApi');
let sunlight = new SunlightApi;
var cache = require('memory-cache');


/* GET legislators by zip. */
  router.get('/', function(req, res, next) {
    let zip = req.query.zip
    if (isNaN(zip)){
      res.render('index', {error: 'Invalid zip code'})
    } else {
      let legislators = sunlight.legislators(zip, function(leg){
        let reps = _.filter(leg, ['chamber', 'house']);
        let senators = _.filter(leg, ['chamber', 'senate']);
        cache.put('leg', leg)
        res.render('legislators', { zip: zip, reps: reps, senators: senators })
      })
    }
  });

  /* GET legislators by zip. */
  router.get('/:id', function(req, res, next) {
    let id = req.params.id
    let legislator = null;
    cache.get('leg').forEach(function(leg){
      if (leg.bioguide_id == id) legislator = leg
    })
    sunlight.getVotes(id, function(votes){
      legislator.votes = votes
      res.render('legislatorDetail', { legislator: legislator })
    });
  });

module.exports = router;

