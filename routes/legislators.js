var express = require('express');
var router = express.Router();
var legislators = require('../models/legislators')
var bill = require('../models/bills')

router.get('/:id', function(req, res){
  var id = req.params.id;
  var path = `legislators?bioguide_id=${id}`
  legislators.getLegislators(path).then(function(data){
    var legislator = data[0];
    bill.getBills(legislator.id).then(function(info){
      var bills = info.results;
      res.render('legislator', {
        bills: bills,
        legislator: legislator
      })
    })
  })
})

module.exports = router
