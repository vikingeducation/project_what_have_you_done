var express = require('express');
var router = express.Router();

const title = 'What Have You Done?';
const sunlight = require('../lib/sunlight');

/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.query.zip) {
    sunlight.getLegislators(req.query.zip, function(err, legislators) {
      if (err) {
        console.log(err);
      } else {
        res.render('index', {
          title: title,
          zip: req.query.zip,
          legislators: legislators
        });
      }
    })
  } else {
    res.render('index', { title: title, zip: req.query.zip});
  }
});

module.exports = router;
