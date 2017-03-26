var express = require('express');
var router = express.Router();
const Sunlight = require('../wrapper/index');
sunlight = new Sunlight;

/* GET legislator page. */
router.get('/:legId', function(req, res, next) {
	var legId = req.params.legId;
	sunlight.findVotesByLegislatorID(legId, function(data){
		var votes = data;
		var legislator = data[0].voters[legId].voter;
		for (var i=0; i<20; i++) {
			votes[i].answer = votes[i].voters[legId].vote;
		}
		res.render('legislator', { legId: legId, votes: votes, legislator: legislator });
	});
	
});

module.exports = router;