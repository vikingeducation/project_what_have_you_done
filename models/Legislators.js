const request = require('request')
var baseUri = 'https://congress.api.sunlightfoundation.com/legislators/locate?';

class Legislators {
	constructor(zip) {
		this.zip = zip;
	}

	party(callback) {
		this._sendRequest("party", callback);
	}

	chamber(callback) {
		this._sendRequest("chamber", callback)
	}
	bioguideIde(callback) {
		this._sendRequest("bioguide_id", callback)
	}
	firstName(callback) {
		this._sendRequest("first_name", callback)
	}
	middleName(callback) {
		this._sendRequest("middle_name", callback)
	}
	phone(callback) {
		this._sendRequest("phone", callback)
	}
	website(callback) {
		this._sendRequest("website", callback)
	}

	_sendRequest(type, callback) {
		let url = `${baseUri}11216&fields=${type}`
		request(url, (err, res, body) => {
			if (!err && res.statusCode === 200) {
				callback(JSON.parse(body).results);
			}
		})
	}
}


module.exports = Legislators;