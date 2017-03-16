const express = require('express');
const router = express.Router();
const Sunlight = require('../sunlight_api');
const Legislator = require('../models/Legislator');
const sunlight = new Sunlight();


router.get('/', function(req, res, next) {
  let zip = req.query.zip;
  sunlight.listOfLegislators(zip, function(legislators) {
    let legislators_house = legislators.house;
    let legislators_senate = legislators.senate;
    res.render('legislators', { zip: zip,
                                legislators_house: legislators_house,
                                legislators_senate: legislators_senate })
  });
});

router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  sunlight.profileOfLegislator(id, function(legislator, bills) {
    res.render('profile', { legislator: legislator,
                            bills: bills });
  })
})

module.exports = router;
