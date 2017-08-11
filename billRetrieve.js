var request = require('sync-request');
var representitive = require ('./repRetrieve')


var zipCode = '21111';
var rep = 0;
representitive[rep].bioguideId


var options = {
  url: 'https://congress.api.sunlightfoundation.com/votes?voter_ids.' + representitive[rep].bioguideId +'&fields=roll_id,result,voters,bill'
}


class Bill {
  constructor(result, bill_id, chamber, officalTitle, short_title, vote) {
    this.result = result,
    this.bill_id = bill_id,
    this.chamber = chamber,
    this.officalTitle = officalTitle,
    this.vote = vote
  }
}

const bills = [];

function callbackNames(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log("***", info.results[0]);
    for (var x in info.results){
      bills[x] = new Bill(
        info.results[x].result, info.results[x].bill.bill_id, info.results[x].bill.chamber, info.results[x].bill.offical_title, info.results[x].bill.short_title, info.results[x].voters[representitive[rep].bioguideId].vote
      );
    }
    //console.log(bills);
  }
  else {
    console.log(response.statusCode);
    console.log(response.body);
  }
}

request(options, callbackNames);

module.exports = bills;
