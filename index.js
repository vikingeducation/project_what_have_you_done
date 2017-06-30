const request = require('request')
var prompt = require('prompt');
const baseUri = "https://congress.api.sunlightfoundation.com"

// request('https://congress.api.sunlightfoundation.com/legislators/locate?zip=02139', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
// var myArr = body.split(" ");
//     console.log(myArr[1]);
//
//
//
//     console.log("last" + JSON.parse(body)[0]);
//   }
// })

class YourReps {


  repsInZip(callback, zipCode) {
    this._sendRequest("legislators/locate?zip=" + zipCode.toString(), callback)
  }

  repsVotes(callback) {
    this._sendRequest("mostviewed", callback)
  }

  mostShared(callback) {
    this._sendRequest("mostshared", callback)
  }

  _sendRequest(type, callback) {
    const url = `${baseUri}/${type}`

    request(url, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).results)
      }
    })
  }
}

const reps = new YourReps;

 prompt.get(['zipcode'], function (err, result) {
   if (err) { return onErr(err); }
   console.log('  Zipcode: ' + result.zipcode);
 var zip = result.zipcode;

 reps.repsInZip(function(data) {
 for(var i=0; i < data.length; i++) {
   console.log(data[i].first_name + data[i].last_name);
 }

  }, zip);


})





//   var prompt = require('prompt');
// var GitHub = require('github-api');
// var github = new GitHub({
//
//     // optional
//     debug: true,
//     protocol: "https",
//     host: "api.github.com", // should be api.github.com for GitHub
//     pathPrefix: "/api/v3", // for some GHEs; none for GitHub
//     headers: {
//         "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
//     },
//
//     followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
//     timeout: 5000
// });
//
//
//
//
// prompt.get(['username'], function (err, result) {
//   if (err) { return onErr(err); }
//   console.log('  Username: ' + result.username);
// var me = github.getUser(result.username);
//
// me.listRepos(function(err, repos) {
//    // look at all the starred repos!
//    console.log("First Repo: " + repos[1].name);
//
//  });
//
//
// });
