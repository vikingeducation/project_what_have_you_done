var express = require('express');
var app = express()
var router = express.Router();

//require Sunlight module for api requests
const Sunlight = require('../models/sunlightApi');

//splitLegislatorByChamber so that they can be organized
//on legislatorslist.hbs
//I only need this function on this page so I put it in the router .js page here
function splitLegislatorByChamber(legis){
  //arrays to organize members
  var peeps = {housePeeps: [], senatePeeps: []}

  legis.forEach( function(legis){
    if ( legis.chamber == 'house'){
      peeps.housePeeps.push(legis)
    } else {
      peeps.senatePeeps.push(legis)
    };
  });
    return peeps;
};//splitLegislatorByChamber


router.get('/', function(req, res, next){

  //req.query returns an object for each string in query param
  //http://expressjs.com/en/api.html#req.query
  var zip = req.query.zip;
  var api = new Sunlight();//new instance of api module

  //get the legislatorByZip function to return data based on zip query
  //then render that data in legislatorslist.hbs
  api.legislatorByZip(zip, function(legislators){

    var peeps = splitLegislatorByChamber(legislators);

    res.render('legislatorslist', {//object that defines variable for hbs
      zip: req.query.zip,
      data: peeps
    });
  })//data: is the data param got from legislator.js constructor

})//end router

module.exports = router;
