var api = require('../call')

var Bills = {

  getBills: function(id){
    var fields = `bill.bill_id,bill.official_title,voters.${id}.vote,question`;
    var path = `votes?voter_ids.${id}__exists=true&per_page=50&fields=${fields}`;
    var obj = {}

    var p = new Promise(function(resolve, reject){
      api.call(path).then(function(data){
        var parsed = JSON.parse(data);

        var results = [];
        for (var i=0; i<parsed.page.count; i++){
          if (parsed.results[i].bill){
            var bill = parsed.results[i]
            var bill_id = bill.bill.bill_id;
            var question = bill.question;
            var title = bill.title;
            var vote = bill.voters[id].vote
            var split = bill_id.split("-");
            var link = 'https://www.govtrack.us/congress/bills/' + split[1] + '/' + split[0];
            bill['link']=link;
            bill['bill_id'] = bill_id
            bill['vote'] = vote;
            if (vote === 'Yea'){
              bill['votedYes']=true
              results.push(bill)
            } else {
              results.push(bill)
            }
          }
        }
        obj['results'] = results;
        resolve(obj)
      });

    })
    return p
  }

}

module.exports = Bills
