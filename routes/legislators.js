const express = require('express');
const router = express.Router();
const request = require('request');

const sunlight = require('../models/sunlight');
const Legislator = require('../models/legislator');
const Bill = require('../models/bill');

router.get('/', (req, res, next) => {
  let zip = req.query.zip;
  let url = sunlight.legislatorsUrl(zip);
  request(url, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      let legs = JSON.parse(body).results;
      legs = legs.map( (leg) => {
        return new Legislator(leg);
      });
      let legislators = sunlight.splitLegislators(legs);
      res.render('legislators', { legislators: legislators,
                                  zip: zip });
    };
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  let bio_url = sunlight.bioUrl(id);
  let votes_url = sunlight.votesUrl(id);
  let legislator;
  request(bio_url, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      let leg = JSON.parse(body).results[0];
      legislator = new Legislator(leg);
    };
  });
  request(votes_url, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      let all_votes = JSON.parse(body).results;
      let bill_votes = sunlight.billVotes(all_votes);
      let bills = bill_votes.map( (bill) => {
        return new Bill(bill);
      });
      res.render('profile', { legislator: legislator,
                              bills: bills })
    };
  });
});

module.exports = router;
