var express = require('express');
var router = express.Router();


//for the moment
//////////////////////////////////////////////////////////////////
//move this back to api caller later
const request = require('request');
const Rep = require('../models/rep');

//pass me the zip code later
var zip = 53075;
var url = `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zip}`
/*
request( url, function( err, res, body){
  //body is a giant json formatted string
  var j_obj = JSON.parse( body );
  //the api gives results in this format
    //['results':{}, 'count': #, 'page':{}]
    //consider transforming this data into our own class

  //var results = j_obj.results;
  //var count = j_obj.count;
  //debugger;
  var my_rep = new Rep( j_obj.results[0] );
  my_rep.say_hello();
  debugger;
  console.log(`count = ${body.count}`);
})
*/
//module.exports =
//////////////////////////////////////////////////////////////////

/* GET home page. */
router.get('/', function(req, res, next) {
  //make a promise
  //verify that promise is needed
  var zz= res;
  request( url, function( err, res, body){
    //body is a giant json formatted string
    var j_obj = JSON.parse( body );
    //the api gives results in this format
      //['results':{}, 'count': #, 'page':{}]
      //consider transforming this data into our own class

    //var results = j_obj.results;
    //var count = j_obj.count;
    //debugger;
    var my_rep = new Rep( j_obj.results[0] );
    my_rep.say_hello();
    debugger;
    //console.log(`count = ${body.count}`);
    zz.render('district', { title: 'Express', reps: my_rep, zip: zip });
  })

  //res.render('index', { title: 'Express' });
});

module.exports = router;
