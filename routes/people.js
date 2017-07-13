var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET users listing. */
router.get('/:person', function(req, res, next) {
	let data = {
		title: 'What Have You Done?'
	}

	res.render('people', data);
});

module.exports = router;
