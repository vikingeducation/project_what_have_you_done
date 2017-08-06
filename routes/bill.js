var express = require('express');
var router = express.Router();
var wrapper = require("../models/info_wrapper.js");

router.get('/:bill', function(req, res, next) {
	wrapper.get_single_bill(req.params.bill).then(function(info){

		wrapper.get_bill_by_id(info.results[0].related_bill_ids).then(function(r_bills){
			
			res.render('bill', 
				{
					bill:info.results[0],
					related_bills: r_bills
				})
		})
	})
});

module.exports = router;