var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('zip_results', { title: 'Legislators by Zip' });
});

module.exports = router;
