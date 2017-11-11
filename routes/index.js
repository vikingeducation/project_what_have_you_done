var express = require('express');
var router = express.Router();
var request = require('request')
var identification, missedvotes,totalvotes,nextelec, billNumb, billTitle, votePosition

var i = 0;
var j = 0
/* GET home page. */






router.get("/", function(req,res,next){
  res.render('index', {})


})

	
module.exports = router