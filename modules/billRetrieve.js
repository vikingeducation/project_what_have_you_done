var request = require('sync-request');

var options = function (repId) {
  return ('https://congress.api.sunlightfoundation.com/votes?voters.' + repId + '__exists=true&fields=voters.' + repId + ',result,bill&per_page=2&page=1')
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
    var info = JSON.parse(body);
    for (var x in info.results){
      if (info.results[x].voters[repId] != undefined){
        bills[x] = new Bill(
          info.results[x].result, info.results[x].bill.bill_id, info.results[x].bill.chamber, info.results[x].bill.official_title, info.results[x].bill.short_title, info.results[x].voters[repId].vote, info.results[x].bill.urls.congress
        );
      }
    }
  }


//request(options, callbackNames);

module.exports = function (repId) {
  bills = [];
  var res = request('GET', options(repId));
  callbackNames(res.getBody(), repId);
  return bills;
}
