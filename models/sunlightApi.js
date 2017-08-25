const request = require('request');
const Legislator = require('./legislator');


const baseUri = 'https://congress.api.sunlightfoundation.com';

class SunlightApi = {

  legislatorByZip: function(zip, callback){
    //figure out url and send it in first
    var url = '${baseUri}legislators/locate?zip=${zip}';
    var dataSend = function(apiData){
      return new Legislator(apiData)
    };
    this._sendRequest(url, dataSend, callback);
  }


  _sendRequest(url, dataSend, callback){
    request(url, function(error, response, body){
      if(!error && response.statusCode === 200){
        callback(JSON.parse(body).results)
      }
    })
  }


}
