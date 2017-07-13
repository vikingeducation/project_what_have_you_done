var express = require('express');
var router = express.Router();
var data = require('../dummy/dummy.json');

/* GET home page. */
router.get('/reps', function(req, res, next) {
  res.json(data);
});

module.exports = router;
