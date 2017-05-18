var api = require('../call')

var Bills = {

  getBills: function(id){
    var fields = `bill.bill_id,bill.official_title,voters.${id}.vote`;
    var path = `votes?voter_ids.${id}__exists=true&fields=${fields}`;
    var obj = {}
    var p = new Promise(function(resolve, reject){
      api.call(path).then(function(data){
        var parsed = JSON.parse(data);
        // console.log(parsed.results[1])
        // console.log('this is parsed ' + parsed)
        obj['results'] = parsed.results
        resolve(obj)

      });

    })
    return p
  }

}

module.exports = Bills
