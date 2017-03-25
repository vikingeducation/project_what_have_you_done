var express = require('express');
var router = express.Router();
var {Representative, representatives} = require('../models/representatives')

const findRep = (name) => {
  return representatives.find(representative => name == representative.name)
}

router.get('/:name', function(req, res, next) {
  var representative = findRep(req.params.name)
  res.render('representative', { representative: representative })
});

module.exports = router
