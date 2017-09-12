const request = require('request');
const baseUri = "https://congress.api.sunlightfoundation.com";

// API Wrapper
class CongressSearch {
  locate(zipcode, callback) {
    let urlStub = `legislators/locate?zip=${zipcode}`
    this._sendRequest(urlStub, callback);
  }
  votes(id, callback) {
    let urlStub = `votes?voter_ids.${id}__exists=true&vote_type=passage&fields=voter_ids,bill_id,bill&per_page=20&page=1`;
    this._sendRequest(urlStub, callback);
  }
  profile(id, callback) {
    let urlStub = `legislators?bioguide_id=${id}`;
    this._sendRequest(urlStub, callback);
  }
  _sendRequest(urlStub, callback) {
    const url = baseUri + '/' + urlStub;

    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else {
        console.error(JSON.parse(body));
      };
    });
  };
};

// Parses JSON into objects
const JSONhandler = function(data) {
  let results = data.results;
  var output = [];

  if (results[0].bioguide_id) {

    results.forEach(result => {
      output.push(new Legislator(
        result.bioguide_id,
        result.chamber,
        result.first_name,
        result.middle_name,
        result.last_name,
        result.party,
        result.phone,
        result.website,
        `https://theunitedstates.io/images/congress/225x275/${result.bioguide_id}.jpg`));
    });
  } else if (results[0].bill_id) {

    results.forEach(result => {
      output.push(new Bill(
        result.bill,
        result.voter_ids));
    });
  };
  return output;
};

// Constructors
class Legislator {
  constructor(bioguide_id, chamber, first_name, middle_name, last_name, party, phone, website, photo) {
    this.bioguide_id = bioguide_id;
    this.chamber = chamber;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.party = party;
    this.phone = phone;
    this.website = website;
    this.photo = photo;
  };
};

class Bill {
  constructor(bill, voter_ids) {
    this.bill = bill;
    this.voter_ids = voter_ids;
   };
};

module.exports = {
  CongressSearch,
  JSONhandler
};
