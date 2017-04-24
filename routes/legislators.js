var express = require('express');
var router = express.Router();
var CongressAPI = require('../models/congress-api-wrapper');

// iterates through request data, searching for bills only, ignoring
// nominations and other votes
const filterBills = (bills, legislatorID) => {
  var billList = [];
  bills.forEach((element) => {
    if (element.hasOwnProperty('bill_id')) {
      element.my_vote = element.voter_ids[legislatorID];
      billList.push(element);
    }
  });
  return billList;
};

router.get('/:id', function(req, res, next) {
  // renders the standard index page when there are no queries
  const legislatorID = req.params.id;
  const congressAPI = new CongressAPI();

  congressAPI.getLegislatorVoteDetails(legislatorID, function (data) {
    const bills = filterBills(data, legislatorID);
    res.render('legislators', {
      bills: bills,
      title: 'What Have You Done?'
    });
  });
});

module.exports = router;
