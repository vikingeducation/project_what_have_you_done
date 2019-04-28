// require the request library
const request = require('request');
const {Legislator} = require('../models/legislator_model')
const {Vote} = require('../models/vote_model')

// set up the base URI for the api from https://sunlightlabs.github.io/congress/
const baseUri = 'https://congress.api.sunlightfoundation.com';


// build class to organize api calls
class SunlightApi {

  // Get a list of legislators based upon a given zip code.
  // The callback is passed in directly in the router.
  getLegislators(zip, callback) {
    var url = `${baseUri}/legislators/locate?zip=${zip}`
    var mapper =  function(result){
      // generate a new instance of legislator obj
      return new Legislator(result)
    }
    this._sendRequest(url, mapper, callback);
  }

  // Get details on a specific legislator.
  // The callback is passed in directly in the router.
  getLegislator(bioguide_id, callback) {
    var url = `${baseUri}/legislators?bioguide_id=${bioguide_id}`
    var mapper = function(result){
      // generate a new instance of legislator obj
      return new Legislator(result)
    }
    this._sendRequest(url, mapper, callback);
  }

  // Get the list of votes a legislator has participated in
  getLegislatorVotes(bioguide_id, callback) {
    var url = `https://congress.api.sunlightfoundation.com/votes?fields=bill_id,vote_zipUri,year,result,voter_ids&vote_type=passage&voter_ids.${bioguide_id}__exists=true`;
    var mapper = function(result){
      // generate a new instance of legislator obj
      return new Vote(result, bioguide_id)
    }
    this._sendRequest(url, mapper, callback);
  };


  // A method for making all of the api calls
  _sendRequest(url, mapper, callback){
    request(url, function(error, response, body){
      if (!error & response.statusCode === 200) {
        callback(
          JSON.parse(body).results.map(function(api_result) {
            // for each result, execute the passed mapper function
            return mapper(api_result)
          }
        ))
      }
    });
  }

} // close SunlightApi

// return the class for use in other files
module.exports = {
  SunlightApi
};
