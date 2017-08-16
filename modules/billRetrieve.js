var request = require('request');

var options = function (repId) {
  return {
    url: 'https://congress.api.sunlightfoundation.com/votes?voters.' + repId + '__exists=true&fields=voters.' + repId + ',result,bill&per_page=20&page=1'
  }
}

class Bill {
  constructor(result, bill_id, chamber, official_title, short_title, vote, link) {
    this.result = result,
    this.bill_id = bill_id,
    this.chamber = chamber,
    this.official_title = official_title,
    this.short_title = short_title,
    this.vote = vote,
    this.link = link
  }
}

var bills = [];

function callbackNames(body, repId) {
  //console.log("**", body);
    var info = JSON.parse(body);
    for (var x in info.results){
      if (info.results[x].voters[repId] != undefined){
        bills[x] = new Bill(
          info.results[x].result, info.results[x].bill.bill_id, info.results[x].bill.chamber, info.results[x].bill.official_title, info.results[x].bill.short_title, info.results[x].voters[repId].vote, info.results[x].bill.urls.congress
        );
      }
    }
  }

module.exports = function (repId) {
  bills = [];

  return new Promise(function(resolve, reject){
      request(options(repId), function (err, response, body) {
        if (response.statusCode === 504) {
          reject("504: Sorry, did not load from https://congress.api.sunlightfoundation.com");
        }
        else {
          if (err) {
            reject(err);
          }
          try {
              callbackNames(body, repId);
              resolve(bills);
          } catch(err) {
              reject(err);
          }
        }
      });
    });
  }
