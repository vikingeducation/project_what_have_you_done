const request = require('request');

//require data modules
const Legislator = require('./legislator');
const Bills = require('/.bills');


const baseUri = 'https://congress.api.sunlightfoundation.com';

class Sunlight {


  legislatorByZip(zip, callback) {
    //figure out url and send it in first
    var url = `${baseUri}/legislators/locate?zip=${zip}`;
    var data = function(apiData) {
      return new Legislator(apiData)
    };
    console.log(url);
    this._sendRequest(url, data, callback);
  }//legislatorByZip


  legislatorByBioguide_id(bioguide_id, callback) {

    var url = `${baseUri}/legislators/?bioguide_id=${bioguide_id}`;
    var data = function(apiData) {
      return new Legislator(apiData)
    };
    console.log(url);
    this._sendRequest(url, data, callback);
  }//legislatorByBioguide_id


  billAndVoteData(bioguide_id, callback) {

    var url = `https://congress.api.sunlightfoundation.com/votes?voter_ids.${bioguide_id}__exists=true&fields=bill_id,result,url,question,voter_ids.${bioguide_id}`;
    var data = function(apiData) {
      return new Bills(apiData)
    };
    console.log(url);
    this._sendRequest(url, data, callback);
  }
  

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
