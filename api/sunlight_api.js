// require the request library
const request = require('request');
const {Legislator} = require('../models/legislator_model')

// set up the base URI for the api from https://sunlightlabs.github.io/congress/
const baseUri = 'https://congress.api.sunlightfoundation.com';
// const voteUri = '/votes?voter_ids.';
// const billUri = '/bills?bill_id=';


class SunlightApi {


  // A method for grabbing a list of legislators based upon a given zip code.
  // The callback is passed in directly in the router.
  getLegislators(zip, callback) {
    var url = `${baseUri}/legislators/locate?zip=${zip}`
    var mapper =  function(result){
      // generate a new instance of legislator obj
      return new Legislator(result)
    }

    this._sendRequest(url, mapper, callback);
  }

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

  // A method for retrieving the bills recently voted upon by a given legislator.
  getBills() {
    function buildBills(){
      console.log('builsBills test');
      var billLink = `https://www.govtrack.us/congress/bills/114/hr3082`;
    };
    var url = `https://congress.api.sunlightfoundation.com/bills?fields=bill_id,congress,number,official_title,summary`;
    this._sendRequest(url, buildBills);
  };

  // Make sure you include how the legislator voted.
  legislatorVote() {
    function buildVotes(){
      console.log('buildVotes test');
    };
    var url = `https://congress.api.sunlightfoundation.com/votes?fields=bill_id,vote_zipUri,year,question,result,voter_ids&vote_type=passage&voter_ids.R000588__exists=true`
    this._sendRequest(url, buildVotes);

  };

  // Any other methods or objects you find useful

} // close SunlightApi

// return the class for use in other files
module.exports = {
  SunlightApi
};
