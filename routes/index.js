var express = require('express');
var router = express.Router();
const request = require('request');
const Rep = require('../models/rep');



//var zip = 53075;
//var rep_url = `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zip}`
var bill_url;

//https://congress.api.sunlightfoundation.com//bills?history.active=true&order=last_action_at&actions.type=vote
//https://congress.api.sunlightfoundation.com//bills?history.active=true&order=last_action_at&actions.type=vote&chamber=senate
//https://congress.api.sunlightfoundation.com//bills?history.active=true&order=last_action_at&actions.type=vote&chamber=house

//Bills
//https://congress.api.sunlightfoundation.com/votes?order=voted_at&chamber=house
//https://congress.api.sunlightfoundation.com/votes?order=voted_at&chamber=senate

//https://congress.api.sunlightfoundation.com//bills?bill_id=hr2810-115


//Votes
//NOTE: votes are supposed to be found here but the API is messed up
//https://congress.api.sunlightfoundation.com/votes/voter_id=G000546

var get_bills = function( bill_id ){
  //make a promise
  var promise = new Promise( function( resolve, reject){
    var url = `https://congress.api.sunlightfoundation.com//bills?bill_id=${bill_id}`
    request( url, function( err, res, body){
      if ( err ){
        reject( err );
      }
      var result = parse( body ).results;
      resolve( result );
    })
  })
}
var parse = function( j_string ){
  return JSON.parse( j_string );
}
var get_recent_bills = function(chamber){
  //make promise
  var promise = new Promise( function( resolve, rejcet ){
    var url = `https://congress.api.sunlightfoundation.com/votes?order=voted_at&chamber=${chamber}`
    request( url, function( err, res, body){
      if ( err ){
        reject( err );
      }
      var results = parse( body ).results;
      resolve( results );
    })
  })
  return promise;
}

//return a promise ( I swear I'll have the data later...I'm good for it)
//get the list of reps
var get_reps = function( ){
  var promise = new Promise( function( resolve, reject){
    request( rep_url, function( err, res, body){
      if ( err ){
        console.log( err )
        reject( err );
      }
      //body is a giant json formatted string
      var j_obj = JSON.parse( body );
      //the api gives results in this format
        //['results':{}, 'count': #, 'page':{}]
      //debugger;
      var reps = [];
      for( var i = 0; i < j_obj.count; i++){
        var my_rep = new Rep( j_obj.results[i] );
        reps.push( my_rep );
      }

      //my_rep.say_hello();
      resolve( reps );
    })
  })
  return promise;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  debugger;
  res.render('index');
});

module.exports = router;
