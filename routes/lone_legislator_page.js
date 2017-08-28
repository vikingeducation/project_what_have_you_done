var express = require('express');
var app = express()
var router = express.Router();

//require Sunlight module for api requests
const Sunlight = require('../models/sunlightApi');

router.get('/:bioguide_id', function(req, res, next){

  //req.query returns an object for each string in query param
  //http://expressjs.com/en/api.html#req.query
  //var bioguide_id = req.query.bioguide_id;
  var api = new Sunlight();//new instance of api module

  //get the legislatorByZip function to return data based on zip query
  //then render that data in legislatorslist.hbs
  api.legislatorByBioguide_id(bioguide_id, function(legislator){

    res.render('lonelegis', {//object that defines variable for hbs
      bioguide_id: req.params.bioguide_id,
      data: legislator
      });
  })//data: is the data param got from legislator.js constructor

})//end router

module.exports = router;

//========
//notes
//modify app.js -done
//modify legislatorslist.hbs to have links to lonelegis -done
//get links to work
//query votes
//display contact info
