const request = require('request')
const base = 'https://congress.api.sunlightfoundation.com/'

var API = {

  call: function(path){
    var url = base + path
    var p = new Promise(function(resolve, reject){
      request(url, function(err, response, body){
        if (err){
          reject(err)
        }
        resolve(body);
      });
    })
    return p
  }

}



module.exports = API;
