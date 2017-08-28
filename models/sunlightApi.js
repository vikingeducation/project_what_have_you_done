const request = require('request');
const Legislator = require('./legislator');


const baseUri = 'https://congress.api.sunlightfoundation.com';

class Sunlight {


  legislatorByZip(zip, callback) {
    //figure out url and send it in first
    var url = `${baseUri}/legislators/locate?zip=${zip}`;
    var data = function(apiData) {
      return new Legislator(apiData)
    };

    this._sendRequest(url, data, callback);
  }//legislatorByZip


  legislatorByBioguide_id(bioguide_id, callback) {
    url = `${baseUri}/legislators?bioguide_id=${bioguide_id}&all_legislators=true`;
    var data = function(apiData) {
      return new Legislator(apiData)
    };

    this._sendRequest(url, data, callback);
  }//legislatorByBioguide_id


  _sendRequest(url, data, callback) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(JSON.parse(body).results.map(function(apiData) {
          return data(apiData)
        }))
      } else {
        //error handling
        console.log("Oh no error", error);

      }
    }) //request
  } //_sendRequest


} //Sunlight
module.exports = Sunlight;
