var express = require('express');
var router = express.Router();

const title = 'What Have You Done?';
const sunlight = require('../lib/sunlight');

/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.query.zip) {

    // we have a zipcode, attempt to display pols
    sunlight.getLegislators(req.query.zip, function(err, legislators) {
      if (err) {
        console.log(err);
      } else {

        // prepare options
        const options = {
          title: title,
          zip: req.query.zip,
          legislators: legislators
        }

        //render template
        res.render('index', options);
      }
    });

  } else {
    // no zipcode show the form
    res.render('index', {title: title});
  }
});

/* GET legislator */
router.get('/:chamber/:id', function(req, res, next) {

  // attempt to get votes
  sunlight.getVotes(req.params.id, req.params.chamber, function(err, polVotes) {
    if (err) {
      console.log(err);
    } else {

      // prepare options
      let options = {
        title: title,
        pol: polVotes.legislator,
        votes: polVotes.votes
      }
      if (req.query.zip) {
        options.zip = req.query.zip;
      }

      // render template
      res.render('votes', options);
    }
  });
})

module.exports = router;
