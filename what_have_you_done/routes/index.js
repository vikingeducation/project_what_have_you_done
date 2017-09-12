var express = require('express');
var router = express.Router();
const {CongressSearch, JSONhandler} = require('../models/congress_search_api');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (JSON.stringify(req.query) === '{}') {
    res.render('index', { title: 'What Have You Done?' });
  } else {
    const zipcode = req.query.zipCode;
    const congressSearch = new CongressSearch();

    congressSearch.locate(zipcode, function(data) {
      const legislators = JSONhandler(data);
      res.render('zipcode', {
        title: 'What Have You Done?',
        zipcode: zipcode,
        legislators: legislators
      });
    });
  };
});

module.exports = router;
