var express = require('express');
var router = express.Router();

var lookUp = require("../models/legislators")

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.query.zip) {
		var legislators = lookUp.zipLookup(req.query.zip, function(legislators) {
			console.log("I was called!!!");
			
			res.render('legislators', {title: `Legislators for ${req.query.zip}`,
																 legislators: legislators});
		});
	} else {
		res.render('index', { title: 'What Have You Done?' });
	}
});

module.exports = router;