var express = require('express');
var app = express()
var router = express.Router();

//require Sunlight module for api requests
const Sunlight = require('../models/sunlightApi');

router.get('/', function(req, res, next){

  //req.query returns an object for each string in query param
  //http://expressjs.com/en/api.html#req.query
  var zip = req.query.zip;
  var api = new Sunlight();//new instance of api module

  //get the legislatorByZip function to return data based on zip query
  //then render that data in legislatorslist.hbs
  api.legislatorByZip(zip, function(legislators){

    var peeps = api.splitLegislatorByChamber(legislators);

    res.render('legislatorslist', {
      zip: req.params.zip,
      data: peeps
      });
  })//data: is the data param got from legislator.js constructor

})//end router

module.exports = router;
