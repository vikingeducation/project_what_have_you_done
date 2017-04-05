var express = require('express');
var router = express.Router();
const sunlight = require('sunlight');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.get('/zip/:zip', function(req, res, next) {
    var tempZip = req.params.zip;
    if (tempZip.length != 5 || isNaN(tempZip)) {
        res.redirect('/');
    } else {
        sunlight.locate(tempZip, function(legislatorsByZip) {

            res.render('legislators', {
                title: 'Your Local Legislators',
                zip: req.params.zip,
                legislators: legislatorsByZip
            });
        });
    };
});

router.get('/bioguide/:bioguide', function(req, res, next) {
    var currentBioguide = req.params.bioguide;

    sunlight.legislator(currentBioguide, function(legislatorData) {
      sunlight.votes(currentBioguide, function(legislatorVotes){

          res.render('legislator', {
              title: 'Legislator Voting Record',
              bioguide: currentBioguide,
              legislator: legislatorData,
              votes: legislatorVotes
          });

      });
    });








});




module.exports = router;
