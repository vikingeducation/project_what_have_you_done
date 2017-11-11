const request = require('request');

var uri = "https://api.propublica.org/congress/v1/members/"
class RepMemb {
	constructor(name){
		this.name = name
	}

	stats(callback){
		this._sendRequest(callback)
	}

	_sendRequest(callback){
	 var url = "https://api.propublica.org/congress/v1/115/senate/members.json"

request(url, {headers: {"X-API-KEY": "qSmJFCqApH5IKEF2SHn7SWYzwuh0SVR07P8f9sj4"}}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    callback(JSON.parse(body).results[0].members)
}

})

}
}


class Rep1Memb {
	constructor(identification){
		this.identification = identification
	}

	stats1(callback){
		this._sendRequest(callback)
	}

	_sendRequest(callback){
	 var url = `${uri}${this.identification}/votes.json`

request(url, {headers: {"X-API-KEY": "qSmJFCqApH5IKEF2SHn7SWYzwuh0SVR07P8f9sj4"}}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    callback(JSON.parse(body).results[0].votes)
}

})

}
}
module.exports = {RepMemb, Rep1Memb}