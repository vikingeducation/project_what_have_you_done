// require the request library
const request = require('request');

var fs = require('fs');

// set up the base URI for the api from https://sunlightlabs.github.io/congress/
const baseUri = 'https://congress.api.sunlightfoundation.com';
const zipUri = '/legislators/locate?zip=';
// const legislatorUri = '/legislators?bioguide_id=';
// const voteUri = '/votes?voter_ids.';
// const billUri = '/bills?bill_id=';


class SunlightApi {
  constructor(zip) {
    this.zip = zip
  }

  // A method for grabbing a list of legislators based upon a given zip code.
  get_legislators() {
    this._sendRequest(this.zip, zipUri, this.saveToLegislatorJson)
  }

  // set up method to make the api call and return results
  _sendRequest(zip, zipUri, callback) {
    const url = `${baseUri}${zipUri}${this.zip}`
    var options = {
      url: url
    }
    request(options, function(error, response, body){
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).results)
      }
    })
  }


  // A method for parsing the JSON data into objects (Legislators, Bills, etc.).
  saveToLegislatorJson(input) {
    fs.writeFile('./lib/legislators_by_zip.json', input 'utf8', function(err){
      err ? console.log(err) : console.log('The file has been saved to legislators_by_zip.json.');
    });
  };

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
