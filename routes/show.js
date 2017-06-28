var express = require('express');
var router = express.Router();
var legislators = require('../models/legislators')

router.use(express.static('public'))


router.get('/', function(req, res){
  var zip = req.query.zip
  var path = `/legislators/locate?zip=${zip}`;
  legislators.getLegislators(path).then(function(data){
    var house = data[0];
    var senate1 = data[1];
    var senate2 = data[2];
    res.render('show', {
      zip: zip,
      house: house,
      senate1: senate1,
      senate2: senate2
    })
  });
});





module.exports = router
