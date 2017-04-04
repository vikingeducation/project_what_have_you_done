var express = require('express');
var router = express.Router();

const sunlightAPI = require('../utils/api')

/* GET legislator info by id */
router.get('/:id', function(req, res, next) {
    const id = req.params.id
    let data = []

    let legislator = sunlightAPI.getLegislatorByID(id)
    let votes = sunlightAPI.getRecentVotesByID(id)

    Promise.all([legislator, votes])
        .then(results => res.send(results))
        .catch((err) => {
            console.error(err)
        }) 
   
});

module.exports = router;
