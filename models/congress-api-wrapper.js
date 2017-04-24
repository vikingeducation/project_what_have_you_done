const request = require('request');
const baseUri = 'https://congress.api.sunlightfoundation.com/';

class SunlightCongress {

  getLegislatorsByZip(zipcode, callback) {
    var path = `legislators/locate?zip=${zipcode}`;
    this._sendRequest(path, callback);
  }

  // Searches by congress member's id, and filters only 'passage'-related
  // votes. Returns info about bill, and main question being addressed.
  getLegislatorVoteDetails(id, callback) {
    var path = `votes?voter_ids.${id}__exists=true&vote_type=passage&fields=voter_ids,bill_id,bill,question&per_page=1000`;
    this._sendRequest(path, callback);
  }

  getLegislatorProfile(id, callback) {
    var path = `legislators?bioguide_id=${id}`;
    this._sendRequest(path, callback);
  }

  _sendRequest(path, callback) {
    const url = baseUri + path;

    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(JSON.parse(body).results);
      }
    });
  }
}


const legislatorAPI = new SunlightCongress();

module.exports = SunlightCongress;