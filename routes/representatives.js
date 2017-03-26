var express = require('express');
var router = express.Router();
const request = require('request');
var {Representative, representatives} = require('../models/representatives');
var {Vote, votes} = require('../models/votes');

const findRep = (name) => {
  return representatives.find(representative => name == representative.name)
}

router.use('/:name',function (req, res, next) {
  var representative = findRep(req.params.name);

  var options = {
    url: 'https://congress.api.sunlightfoundation.com/' + 'votes?fields=voter_ids,question,bill&voter_ids.' + representative.id + '__exists=true&bill_id__exists=true&vote_type=passage'
  };

  //options.url = 'https://congress.api.sunlightfoundation.com/' + 'votes?fields=voter_ids,question,bill&voter_ids.' + representative.id + '__exists=true&bill_id__exists=true&vote_type=passage';

  function voteData(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);

      if (votes.length > 0) {
        votes = [];
      }

      for (var i = 0; i < info.results.length; i++) {
        if ("bill" in info.results[i]) {
          votes.push(new Vote (info.results[i].bill.bill_id,
            info.results[i].bill.urls.govtrack,
            info.results[i].bill.official_title,
            info.results[i].voter_ids[representative.id]));
        }
        else {
          // Exclude votes for non-bills
        }
      }
      next();
    }
    else {
      console.log("Something went wrong adding bill information to rep's bill array");
    }
  }
  request(options, voteData);
  });

router.get('/:name', function(req, res, next) {
  var representative = findRep(req.params.name)
  res.render('representatives', { representative: representative, votes : votes})
});

module.exports = router;
