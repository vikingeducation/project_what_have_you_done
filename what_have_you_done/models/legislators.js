const request = require('request');
const baseUri = "https://congress.api.sunlightfoundation.com";
const legislators = [];
const bills = [];

// API Wrapper
class CongressSearch {
  constructor(query) {
    this.query = query;
  }
  locate(callback) {
    this._sendRequest("legislators/locate?zip=", callback);
  }
  votes(callback) {
    this._sendRequest("votes?voter_ids.", callback);
  }
  _sendRequest(type, callback) {
    let url = "";

    if (type === "legislators/locate?zip=") {
      url = `${baseUri}/${type}${this.query}`;
    } else if (type === "votes?voter_ids.") {
      url = `${baseUri}/${type}${this.query}__exists=true&fields=voter_ids,bill_id,bill,question&per_page=20&page=1`;
    };

    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else {
        console.error(JSON.parse(body));
      };
    });
  }
};

// Parses JSON into objects
const JSONhandler = function(data) {
  let results = data.results;

  results.forEach(result => {

    if (result.bioguide_id) {
      legislators.push(new Legislator(
        result.bioguide_id,
        result.chamber,
        result.first_name,
        result.middle_name,
        result.last_name,
        result.party,
        result.phone,
        result.website,
        `https://theunitedstates.io/images/congress/225x275/${result.bioguide_id}.jpg`));

      bills.push(new Bill(result.bioguide_id));
    } else if (result.bill_id) {

    }
  });

  console.log(legislators);
  console.log(bills);
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
  constructor(bioguide_id) {
     this.bioguide_id = bioguide_id;
   };
 };

module.exports = {
  Legislator,
  legislators
};

const test = new CongressSearch("90210");
test.locate(function(data) {
  JSONhandler(data);
});
