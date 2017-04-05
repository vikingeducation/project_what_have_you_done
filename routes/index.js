var express = require('express');
var router = express.Router();
const sunlight = require('sunlight');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Voters are Watching' });
});

router.get('/bill/:bill_id', function(req, res, next) {
  sunlight.bill(req.params.bill_id, function(billDetails) {

      res.render('bill', {
          title: 'Bill Details',
          bill_id: req.params.bill_id,
          bill: billDetails
      });
});
});

module.exports = router;
