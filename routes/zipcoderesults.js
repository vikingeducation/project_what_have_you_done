var express = require('express');
var router = express.Router();
const request = require('request');
var {Representative, representatives} = require('../models/representatives')

router.use('/',function (req, res, next) {
  var zipcode = req.query.zipcode;
  var options = {
    url: 'https://congress.api.sunlightfoundation.com/legislators/locate/?zip=' + zipcode
  };

  function repData(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);

      if (representatives.length > 0) {
        representatives = [];
      }

      for (var i = 0; i < info.results.length; i++) {
        representatives.push(new Representative(info.results[i].bioguide_id,
        info.results[i].first_name + " " + info.results[i].last_name,
        info.results[i].chamber,
        info.results[i].party,
        info.results[i].phone,
        info.results[i].website));
      }
        next();
    }
    else {
      console.log("Something went wrong while updating reps based on zip");
    }
  }

  var getReps = function (zipcode) {
    request(options, repData);
  }

  getReps(zipcode);

});

router.get('/', function(req, res, next) {
  res.render('zipcoderesults', { representatives: representatives });
});

module.exports = router;
