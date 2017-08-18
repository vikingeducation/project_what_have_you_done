var express = require('express');
var router = express.Router();
const {Legislator, LEGISLATORS} = require('../models/legislators_model')

const findLegislator = (leg) => {
  return LEGISLATORS.find(LEGISLATORS => leg == LEGISLATORS.bioguide_id)
}

router.get('/:bioguide_id', function(req, res, next) {
  const legislator_for_view = findLegislator(req.params.bioguide_id)
  res.render('legislator_show', { title: 'Legislator show page', legislator: legislator_for_view });
});


module.exports = router