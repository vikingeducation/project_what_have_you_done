const request = require('request')
const Legislator = require('../models/Legislator');
let _ = require('lodash');

class SunlightApi {
  constructor(){
    this.baseUrl = 'https://congress.api.sunlightfoundation.com';
  }

  legislators(zipcode, callback){
    let query = this.baseUrl + '/legislators/locate?zip=' + zipcode;
    this._sendRequest(query, callback, 'list')
  }

  getVotes(voterId, callback){
    let query =
    this.baseUrl
    + '/votes?voter_ids.'
    + voterId
    + '&fields=bill.official_title,bill.bill_id,voter_ids.'
    + voterId;
    this._sendRequest(query, callback, 'votes')
  }

  _sendRequest(urlOptions, callback, type){
    request(urlOptions, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if ( type === 'list' ){
          let legislators = JSON.parse(body).results.map( (leg) => {
            return new Legislator(leg);
          })
          callback(legislators)
        } else if (type === 'votes' ){
          let bills = []
          JSON.parse(body).results.map( (data) => {
            if (data.bill && !_.isEmpty(data.voter_ids)){
              bills.push({
                id: data.bill.bill_id,
                title: data.bill.official_title,
                vote: _.values(data.voter_ids)[0]
              })
            }
          })
          callback(bills)
        }
      }
    })
  }
}

module.exports = SunlightApi;