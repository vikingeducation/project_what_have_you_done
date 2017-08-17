var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('legislators', { title: 'Legislators by Zip' });
});

module.exports = router;
