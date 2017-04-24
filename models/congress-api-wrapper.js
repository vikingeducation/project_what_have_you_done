const request = require('request');
const baseUri = 'https://congress.api.sunlightfoundation.com/';

class SunlightCongress {

  getLegislatorsByZip(zipcode, callback) {
    var path = `legislators/locate?zip=${zipcode}`;
    this._sendRequest(path, callback);
  }

  getLegislatorVoteDetails(id, callback) {
    var path = `votes?voter_ids.${id}__exists=true&fields=voter_ids,bill_id,result,bill`;
    this._sendRequest(path, callback);
  }

  getDetailsOfVote(id, callback) {
    var path = `votes?voter_ids.${id}__exists=true&fields=voter_ids,bill_id,result,bill`;
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


// legislatorAPI.getLegislatorVoteDetails('M001169', function(data) {
//   data.forEach(function(element) {
//     if (element.hasOwnProperty('bill_id')) {
//       console.log(element);
//     }
//   });
// });

module.exports = SunlightCongress;
// So we need these functions:
// 1. getLegislatorByZip
// 2. getVotesByLegislator
// 3. getDetailsOfVote
