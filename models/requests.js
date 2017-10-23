var request = require("request");
var keys = require("C:/Users/Jared/Modules/Cles/items");

// User input 
var line1 = "352 Woodford St.";
var city = "Portland";
var state = "ME";
var zip = "04103";
var address = `${line1} ${city} ${state} ${zip}`;

// Options object, which gets passed to request call
var options = {
  method: 'GET',
  url: 'https://www.googleapis.com/civicinfo/v2/representatives',
  qs:
   { address: address,
     includeOffices: 'true',
     levels: 'country',
     key: keys.google },
  headers:
   { 'postman-token': keys.postmanToken,
     'cache-control': 'no-cache',
     authorization: 'Basic ' + keys.googleBasic } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


module.exports = {

};
