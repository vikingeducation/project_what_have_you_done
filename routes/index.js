var express = require('express');
var router = express.Router();
var fetchLegislators = require("../modules/repRetrieve");
var fetchBills = require("../modules/billRetrieve");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    inputError: ""
  });
});

//form use
router.get('/zipCode',function(request,response, next){
  var zip = request.query.zipCode;
  var legislatorsListByZip = fetchLegislators(zip);
  //Check zipcode length and if accurate zip
  if ( (zip.length != 5) || (legislatorsListByZip[0] === undefined) ) {
    response.render ('index', {
      inputError: "Please enter a 5-digit zip code"

    })
  }
  else {
    response.render('local_legislators', {
      zipCode: zip,
      legislatorInfo: legislatorsListByZip
    })
  }
})

//Click on legislator link to
router.get('/bills/:bioId',function (request, response, next) {
  var bioId = request.params.bioId;
  var billsList = fetchBills(bioId);
  var legislatorsListById = fetchLegislators(bioId);
  response.render('bills', {
    billsListing: billsList,
    legislator: legislatorsListById[0]
  });
})

module.exports = router;
