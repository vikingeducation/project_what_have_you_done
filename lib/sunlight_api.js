// require the request library
const request = require('request');

// set up the base URI for the api
// https://sunlightlabs.github.io/congress/
const baseUri = 'https://congress.api.sunlightfoundation.com/';

class SunlightData {
  constructor() {
    // this.apiKey = apiKey
  }

  printer(input){
    console.log(input);

  };

  // A method for grabbing a list of legislators based upon a given zip code.

  // A method for parsing the JSON data into objects (Legislators, Bills, etc.).

  // A method for retrieving the bills recently voted upon by a given legislator.

  // Make sure you include how the legislator voted.

  // Any other methods or objects you find useful


} // close SunlightData


// return the class for use in other files
module.exports = SunlightData;
