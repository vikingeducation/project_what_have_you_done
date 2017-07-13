var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET users listing. */
router.get('/:zipcode', function(req, res, next) {
	let data = {
		title: 'What Have You Done?',
		zipcode: req.params.zipcode
	}

	utils.APIManager.get('http://localhost:3000/api/reps')
		.then(function(info) {
			data['results'] = info.results;

			console.log(data, 'data');
			res.render('results', data);
		})
		.catch(function(err) {
			console.log(err)
		});
});

module.exports = router;
