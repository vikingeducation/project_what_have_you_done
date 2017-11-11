var request = require('request')

var url = "https://api.propublica.org/congress/v1/members/G000555/votes.json"

request(url, {headers: {"X-API-KEY": "qSmJFCqApH5IKEF2SHn7SWYzwuh0SVR07P8f9sj4"}}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var obj = JSON.parse(body)
    console.log(JSON.parse(body).results[0].votes)
}

})
