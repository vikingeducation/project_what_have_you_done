var express = require('express');
var router = express.Router();

var lookUp = require("../models/lookUp");

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  lookUp.votes(req.params.id, function(votes) {
  	res.render("legislator", {title: `Legislators for ${req.query.zip}`,
															votes: votes,
															id: req.params.id});
  });
});

module.exports = router;
