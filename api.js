//api caller


//https://congress.api.sunlightfoundation.com/legislators/locate?zip=53075
//////////////////////////////////////////////////////////////////
//move this back to api caller later
const request = require('request');
const Rep = require('./models/rep');

//pass me the zip code later
var zip = 53075;
var url = `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zip}`

var request( url, function( err, res, body){
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

//module.exports =
//////////////////////////////////////////////////////////////////
