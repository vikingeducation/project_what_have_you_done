var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET users listing. */
router.get('/:person', function(req, res, next) {
	console.log(req.params);

	let data = {
		title: 'What Have You Done?'
	}

	utils.APIManager.get('http://localhost:3000/api/reps')
		.then(function(info) {
			data['results'] = info.results;

			let selected = data.results.house.filter(person => person.name === req.params.person);

			if (selected.length === 0) {
				selected = data.results.senate.filter(person => person.name === req.params.person);
			} 

			data['results'] = selected[0];

			(data.results.party === 'Democrat') ? data.results['label'] = 'Democratic Congressperson' : data.results['label'] = 'Republican Congressperson';

			res.render('people', data);
		})
		.catch(function(err) {
			console.log(err)
		});
});

module.exports = router;
