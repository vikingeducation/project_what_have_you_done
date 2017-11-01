var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var google = require('../models/google');
var usIDs = require('../models/usgithub');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find Your Representative' });
});


/* On submit, send object results */
router.get('/results', function(req, res, next) {
  var address = req.query;
  //address.line1 = address.line1.trim();
  //address.city = address.city.trim();
  //address.state = address.state.trim();
  //address.zip = address.zip.trim();

  // CALL API HERE
  google.executeGoogleRequest(address.line1, address.city, address.state, address.zip, function(APIerr, officialArray) {
    if (err) { throw err }
    else if (APIerr) {
      console.log(APIerr);
    } else {


      // CALL SECOND API HERE
      //usIDs.executeUSGithubRequest(officialArray);


      // CALL THIRD API HERE
      //executeProPubRequest(officialArray);
      res.render('results', { googleResults: officialArray });
    }



  });

});

module.exports = router;
