var express = require('express');
var router = express.Router();
var fetchLegislators = require("../modules/repRetrieve");
var fetchBills = require("../modules/billRetrieve");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'What Have You Done?',
    inputError: ""
  });
});

//form use
router.get('/zipCode',function(request,response, next){
  var zip = request.query.zipCode;
  var legislatorsListByZip = fetchLegislators(zip);
  if (zip.length != 5) {
    response.render ('index', {
      title: 'What Have You Done?',
      inputError: "Please enter a 5-digit zip code"

    })
  }
  else {
    response.render('local_legislators', {
      title: 'What Have You Done?',
      zipCode: zip,
      legislatorInfo: legislatorsListByZip
    })
  }
})

router.get('/bills/:bioId',function (request, response, next) {
  var bioId = request.params.bioId;
  var billsList = fetchBills(bioId);
  var legislatorsListById = fetchLegislators(bioId);
  response.render('bills', {
    title: 'What Have You Done?',
    billsListing: billsList,
    legislator: legislatorsListById
  });
})

module.exports = router;
