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
  //Check zipcode length and if accurate zip
  if ( (zip.length != 5)  ) {
    response.render ('index', {
      inputError: "Please enter a 5-digit zip code"
    })
  }
  else {
     fetchLegislators(zip).then(function(legislators) {
      response.render('local_legislators', {
        zipCode: zip,
        legislatorInfo: legislators
      })
      }).catch(function(err) {
      console.err(err);
      response.render ('index', {
        inputError: "Please enter a 5-digit zip code"
      })
    })
  }
});

//Click on legislator link to
router.get('/bills/:bioId',function (request, response, next) {
  var bioId = request.params.bioId;
  var billsListings = [fetchBills(bioId),fetchLegislators(bioId)];

  Promise.all(billsListings).then(function(values) {
    response.render('bills', {
      billsListing: values[0],
      legislator: values[1][0]
    });
    }).catch(function(err) {
      console.log(err);
      response.render('index', {
        inputError: "Sorry, the list of bills didn't load, please try again later."
      });
  });
})

module.exports = router;
