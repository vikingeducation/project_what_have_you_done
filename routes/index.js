var express = require('express');
var router = express.Router();
var CongressAPI = require('../models/congress-api-wrapper');

/* GET home page. */
router.get('/', function(req, res, next) {
  // renders the standard index page when there are no queries
  if (JSON.stringify(req.query) === "{}"){
    res.render('index', { title: 'Express' });
  } else {
    let zipcode = req.query.zipCode;
    let congressAPI = new CongressAPI();
    congressAPI.getLegislatorsByZip(zipcode, function(data) {
      res.render('zipcode', {
        title: 'Express',
        legislators: data
      });
    });
  }
});

module.exports = router;
