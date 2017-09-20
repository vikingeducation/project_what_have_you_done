const request = require('request');
const Legislator = require('../models/legislators_model');
const Bill = require('../models/bills_model');

const baseUri = 'https://congress.api.sunlightfoundation.com';


class SunlightApi {

  getLegislators(zip, callback) {
    let url = `${baseUri}/legislators/locate?zip=${zip}`
    let data =  (result) => new Legislator(result);

    this._sendRequest(url, data, callback);
  }

  getLegislator(bioguide_id, callback) {
    var url = `${baseUri}/legislators?bioguide_id=${bioguide_id}`
    var data = (result) => new Legislator(result);

    this._sendRequest(url, data, callback);
  }

 
  getLegislatorVotes(bioguide_id, callback) {
    var url = `https://congress.api.sunlightfoundation.com/votes?fields=bill,voter_ids&vote_type=passage&order=voted_at&voter_ids.${bioguide_id}__exists=true`;
    var data = (result) => new Bill(result, bioguide_id);

    this._sendRequest(url, data, callback);
  };


  _sendRequest(url, data, callback){
    request(url, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).results.map(function(apiData) {
          return data(apiData)
        }))
      }
    });
  }

} 

module.exports = SunlightApi;