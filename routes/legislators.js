var express = require('express');
var router = express.Router();

var lookUp = require("../models/lookUp");

/* GET users listing. */
router.get('/:id', function(req, res, next) {
	lookUp.singleLegislator(req.params.id, function(legislator) {
		lookUp.votes(req.params.id, function(votes) {
	  	res.render("legislator", {title: `Vote History for ${legislator.name.first_name} ${legislator.name.last_name}`,
																legislator: legislator,
																votes: votes,
																id: req.params.id});
	  });
	});
});

module.exports = router;
