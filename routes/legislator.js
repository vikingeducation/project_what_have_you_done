var express = require('express');
var router = express.Router();
var wrapper = require("../models/info_wrapper.js");


router.get('/:name', function(req, res, next) {
	var name = req.params.name;
	//locate legislator by zip
	wrapper.locate_legislator(name).then(function(info){

		//then get the bills they voted on
		var bill_obj = wrapper.get_bills_voted_on(info.results[0].bioguide_id);
		bill_obj.then(function(bill_results){

			//then fetch extra info about each bill
			wrapper.get_bill_information(bill_results.results, false).then(function(bill_info){
				res.render('legislator', {
					l_info: info.results[0],
					bills: bill_results.results,
					bill_info: bill_info,
		})
	})
});
})
})

module.exports = router;
