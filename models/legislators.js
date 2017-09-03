var api = require('../call')

var Legislators = {

  parseData: function(parsed){
    console.log(parsed)
    var congress = [];
    for (var i=0; i<parsed.count; i++){
      var results = parsed.results[i]
      var newObj = {
        'id': results.bioguide_id,
        'chamber': results.chamber,
        'name': `${results.first_name} ${results.last_name}`,
        'phone': results.phone,
        'website': results.website,
        'email': results.oc_email,
        'image': `https://theunitedstates.io/images/congress/original/${results.bioguide_id}.jpg`
      }
      if (results.twitter_id){
        newObj['twitter'] = `https://twitter.com/${results.twitter_id}`
      }
      results.party === 'D' ? newObj['party'] = 'Democrat' : newObj['party'] = 'Republican'
      results.chamber === 'house' ? congress.unshift(newObj) : congress.push(newObj)
    }
    return congress
  },

  getLegislators: function(path){
    console.log(path)
    // var path = path
    // var congress = []
    var p = new Promise(function(resolve, reject){

      api.call(path).then(function(data){
        console.log(data);
        var parsed = JSON.parse(data)
        // for (var i=0; i<parsed.count; i++){
        //   var results = parsed.results[i]
        //   var newObj = {
        //     'id': results.bioguide_id,
        //     'chamber': results.chamber,
        //     'name': `${results.first_name} ${results.last_name}`,
        //     'party': results.party,
        //     'phone': results.phone,
        //     'website': results.website,
        //     'email': results.oc_email,
        //   }
        //   if (results.twitter){
        //     newObj['twitter'] = `https://twitter.com/${results.twitter_id}`
        //   }
        //   results.party === 'D' ? newObj['party'] = 'Democrat' : newObj['party'] = 'Republican'
        //   congress.push(newObj)
        // }
        var congress = Legislators.parseData(parsed);
        resolve(congress)
      }).catch(function(err){
        reject(err)
      });
    })
    return p
  }

}

module.exports = Legislators
