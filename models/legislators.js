var api = require('../call')

var Legislators = {

  getLegislators: function(zip){
    var path = `/legislators/locate?zip=${zip}`
    var congress = []
    var p = new Promise(function(resolve, reject){

      api.call(path).then(function(data){
        var parsed = JSON.parse(data)
        for (var i=0; i<3; i++){
          var results = parsed.results[i]
          var newObj = {
            'id': results.bioguide_id,
            'website': results.website,
            'chamber': results.chamber,
            'facebook': results.facebook_id,
            'first_name': results.first_name,
            'last_name': results.last_name,
            'party': results.party,
            'phone': results.phone,
            'twitter': results.twitter_id,
            'website': results.website,
          }
          congress.push(newObj)
        }
        // console.log(congress)
        resolve(congress)
      })
    })
    return p
  }
}

module.exports = Legislators
