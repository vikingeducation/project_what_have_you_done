const request = require('request')
const Legislator = require('../models/Legislator');

class SunlightApi {
  constructor(){
    this.baseUrl = 'https://congress.api.sunlightfoundation.com';
  }

  legislators(zipcode, callback){
    let query = this.baseUrl + '/legislators/locate?zip=' + zipcode;
    this._sendRequest(query, callback)
  }


  votes(voterId, callback){
    let query =
    this.baseUrl
    + '/votes?voter_ids.'
    + voterId
    + '&fields=bill.official_title,bill.bill_id,voter_ids.'
    + voterId;
    this._sendRequest(query, callback)
  }

  _sendRequest(urlOptions, callback){
    request(urlOptions, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let legislators = JSON.parse(body).results.map( (leg) => {
          return new Legislator(leg);
        })
        callback(legislators)
      }
    })
  }

}


module.exports = SunlightApi;