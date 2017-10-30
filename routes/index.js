var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var google = require('../models/google');
var test = require('../test');
var usIDs = require('../models/usgithub');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find Your Representative' });
});


/* On submit, send object results */
router.get('/results', function(req, res, next) {
  var address = req.query;

  // CALL API HERE
  google.executeGoogleRequest(address.line1, address.city, address.state, address.zip, function(APIerr, officialArray) {
    if (err) { throw err }
    else if (APIerr) {
      console.log(APIerr);
    } else {


      // CALL SECOND API HERE
      executeUSGithubRequest(officialArray);


      // CALL THIRD API HERE
      res.render('results', { googleResults: officialArray });
    }



  });

});

module.exports = router;
