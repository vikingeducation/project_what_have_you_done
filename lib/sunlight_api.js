// require the request library
const request = require('request');

// set up the base URI for the api from https://sunlightlabs.github.io/congress/
const baseUri = 'https://congress.api.sunlightfoundation.com';
const zipUri = '/legislators/locate?zip=';
const legislatorUri = '/legislators?bioguide_id=';
const voteUri = '/votes?voter_ids.';
const billUri = '/bills?bill_id=';

var selectedLegislatorsDetails = [];

class SunlightApi {
  constructor(zip) {
    this.zip = zip
  }

  // set up method to make the api call and return results
  _sendRequest(url, builderCallback) {
    var options = {
      url: url
    }
    request(options, function(error, response, body){
      if (!error & response.statusCode === 200) {
        builderCallback(JSON.parse(body));
      }
    });
  }

  // A method for grabbing a list of legislators based upon a given zip code.
  getLegislators() {
    function buildLegislators(jsonBody){
      var apiResults = jsonBody.results;
      apiResults.forEach(function(legislator){
        selectedLegislatorsDetails.push(
          {
            bioguideId: legislator.bioguide_id,
            firstName: legislator.first_name,
            lastName: legislator.last_name,
            chamber: legislator.chamber,
            party: legislator.party,
            phone: legislator.phone,
            website: legislator.website,
            imageUrl: `https://theunitedstates.io/images/congress/225x275/${legislator.bioguide_id}.jpg`
          }
        );//close push
      });//close forEach
      return selectedLegislatorsDetails;
    };//close buildLegislators

    var url = `${baseUri}${zipUri}${this.zip}`;
    this._sendRequest(url, buildLegislators);
  };//close getLegislators



  // A method for parsing the JSON data into objects (Legislators, Bills, etc.).

  // A method for retrieving the bills recently voted upon by a given legislator.
  getBills() {
    function buildBills(){
      console.log('test');
    };
    var url = `https://congress.api.sunlightfoundation.com/bills?fields=bill_id,official_title,summary`;
    this._sendRequest(url, buildBills);
  };

  // Make sure you include how the legislator voted.

  // Any other methods or objects you find useful

} // close SunlightApi



// return the class for use in other files
module.exports = {
  SunlightApi
};
