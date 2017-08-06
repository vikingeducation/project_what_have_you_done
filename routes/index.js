var express = require('express');
var router = express.Router();
var wrapper = require("../models/info_wrapper.js"); 

router.get('/', function(req, res, next) {
	res.render('index', { l_info: "" });
});

router.get('/:zip', function(req, res, next) {
	wrapper.locate_legislators(req.params.zip).then(function(legislator_info){
  		res.render('index', {
  		l_info: legislator_info.results, 
  		no_reps: "no representatives found :(",
  		zip: req.params.zip
  	});
	});
});

module.exports = router;
