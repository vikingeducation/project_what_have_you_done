var express = require('express');
var router = express.Router();

const request = require('request');
const Rep = require('../models/rep');

var zip = 53075;
var rep_url = `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zip}`


var parse = function( j_string ){
  return JSON.parse( j_string );
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
      var j_obj = parse( body );
      //the api gives results in this format
        //['results':{}, 'count': #, 'page':{}]
      var reps = [];
      for( var i = 0; i < j_obj.count; i++){
        var my_rep = new Rep( j_obj.results[i] );
        reps.push( my_rep );
      }
      resolve( reps );
    })
  })
  return promise;
}

router.get('/', function(req, res, next) {
  //make a promise
  var rep_promise = get_reps();
  Promise.all( [rep_promise] ).then( function( value ){
    debugger;
    res.render('district', { title: 'Express', zip: zip, reps: value[0] });
  }, function( error ){
    debugger;
    console.log("error: " + error );
  })

});

module.exports = router
