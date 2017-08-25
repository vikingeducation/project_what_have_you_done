const request = require('request');
const Legislator = require('./legislator');


const baseUri = 'https://congress.api.sunlightfoundation.com';

class Sunlight {

  legislatorByZip(zip, callback) {
    //figure out url and send it in first
    var url = '${baseUri}legislators/locate?zip=${zip}';
    var data = function(apiData) {
      return new Legislator(apiData)
    };
    
    this._sendRequest(url, dataSend, callback);
  }


  _sendRequest(url, dataSend, callback) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(JSON.parse(body).results.map(function(apiData) {
          return mapper(apiData)
        }))
      } else {
        //error handling
        console.log(options.url)
        console.log("Oh no error", error);
        console.log(response.statusCode);
      }
    }) //request
  } //_sendRequest



} //Sunlight
