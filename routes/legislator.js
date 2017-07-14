var express = require('express');
var router = express.Router();
const request = require('request');

const Rep = require('../models/rep');
const Bill = require('../models/bill')



var parse = function( j_string ){
  return JSON.parse( j_string );
}

//call api for more info on bill and return a promise
var get_bill = function( bill_id ){
  //make a promise
  var promise = new Promise( function( resolve, reject){

    var url = `https://congress.api.sunlightfoundation.com//bills?bill_id=${bill_id}`
    request( url, function( err, res, body){
      debugger;
      if ( err ){
        reject( err );
      }else if ( res.statusCode == 404 ){
        reject( 404 );
        throw( 404 );
      }
      debugger;
      //getting '<h1>Not Found</h1>' = body
      var result = parse( body ).results;
      resolve( result );
    })
  })
  return promise;
}

//get all recent bill id
//from a chamber
//of type passage
var get_recent_bills = function(chamber){
  //make promise
  var promise = new Promise( function( resolve, rejcet ){
    var url = `https://congress.api.sunlightfoundation.com/votes?order=voted_at&vote_type=passage&chamber=${chamber}`
    request( url, function( err, res, body){
      if ( err ){
        reject( err );
      }
      //get bill ids
      // results = [ {}, {} ]
      var results = parse( body ).results;

      /*  The API'S throwing me 404's so I'm just going to list bill_id
      var bill_ids = results.map( function( element){
        var bill_id = element.bill_id;
        return bill_id;
      })
      */
      var bill_ids = results;
      resolve( bill_ids );
    })
  })
  return promise;
}
var get_rep = function( url ){
  var promise = new Promise( function( resolve, reject){
    request( url, function( err, res, body){
      if ( err ){
        console.log( err )
        reject( err );
      }

      var rep_obj = parse( body).results;
      var rep = new Rep( rep_obj[0] );
      resolve( rep );
    })
  })
  return promise;
}

//https://congress.api.sunlightfoundation.com/legislators?bioguide_id=G000585
/* Legislator page. */
router.get('/:bioguide_id', function(req, res, next) {
  var rep_id = req.params.bioguide_id;

  //get rep
  var url = `https://congress.api.sunlightfoundation.com/legislators?bioguide_id=${rep_id}`;
  var rep = get_rep(url);
  var bills;
  var bill_ids;
  rep.then(function(value){
    bill_ids = get_recent_bills( value.basic_info.chamber );

    //get bills voted on in that chamber
    bill_ids.then( function(bill_value ){
      //call api
      /*
      var bill_promises = value.map( function( element ){
        //debugger;
        var bill_promise = get_bill( element );

        return bill_promise;
      })
      //for each id make a Bill
      Promise.all( bill_promises ).then( function( value ) {
        //create new bills
        debugger;
        bills = value.map( function( element ){
          var bill = new Bill( element );
          return bill;
        })
        res.render('legislator', { bills: bills, rep: rep});
      })
      bills = value.map( function( element ){
        var bill = new Bill( element );
        return bill;
      })
      */
      res.render('legislator', { bills: bill_value, rep: value});
    })

  })
});

module.exports = router;
