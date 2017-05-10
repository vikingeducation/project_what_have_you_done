const request = require('request');
const baseUri = "https://congress.api.sunlightfoundation.com"

module.exports = class SunlightCongress {
  legislator(bioguide_id, callback) {
    const promise = _sendRequest(`legislators?bioguide_id=${bioguide_id}`);

    return promise.then(results => {
      return callback(results.results[0])
    }).catch(error => console.log(error));
  }

  legislatorsByLocale(zip, callback) {
    const promise = _sendRequest(`legislators/locate/?zip=${zip}`);

    return promise.then(results => {
      return callback(results.results)
    }).catch(error => console.log(error));
  }

  billsByLegislator(bioguide_id, callback) {
    const fields = `bill.bill_id,bill.official_title,voters.${bioguide_id}.vote`;

    const promise =
      _sendRequest(`votes?voter_ids.${bioguide_id}__exists=true&fields=${fields}`);

    return promise.then(results => {
      return callback(results.results)
    }).catch(error => console.log(error));
  }
}

const _sendRequest = function(path) {
  const url = `${baseUri}/${path}`

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        const results = JSON.parse(body)

        resolve(results);
      } else {
        reject(error);
      }
    });
  });
}
