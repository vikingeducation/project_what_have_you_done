var express = require('express');
var router = express.Router();
const Sunlight = require('../wrapper/index');
sunlight = new Sunlight;

/* GET zip page. */
router.get('*', function(req, res, next) {
	var zipcode = req.param('zipcode');
	sunlight.findLegislatorsByZip(zipcode, function(data){
		res.render('zipcode', { zipcode: zipcode, legislators: data });
	});
	
});

module.exports = router;