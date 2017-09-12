var express = require('express');
var router = express.Router();
const {CongressSearch, JSONhandler} = require('../models/congress_search_api');

const filterBills = (bills, bioguide_id) => {
  let filteredBills = [];

  bills.forEach((element) => {
    element.my_vote = element.voter_ids[bioguide_id];
    element.govtrackUrl = element.bill.urls["govtrack"];
    filteredBills.push(element);
  });
  return filteredBills;
};

/* GET home page. */
router.get('/:id', function(req, res, next) {
  const bioguide_id = req.params.id;
  const congressSearch = new CongressSearch();

  congressSearch.votes(bioguide_id, function(voteData) {
    congressSearch.profile(bioguide_id, function(profileData) {
      const allBills = JSONhandler(voteData);
      const filteredBills = filterBills(allBills, bioguide_id);
      legislator = JSONhandler(profileData);

      res.render('legislator', {
        title: 'What Have You Done?',
        legislator: legislator,
        bills: filteredBills
      });
    });
  });
});

module.exports = router;
