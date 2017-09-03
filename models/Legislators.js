const request = require('request')
var baseUri = 'https://congress.api.sunlightfoundation.com/legislators/locate?';

class Legislators {
	constructor(zip) {
		this.zip = zip;
	}

	
	Data(callback) {
		this._sendRequest("results", callback)
	}

	_sendRequest(type, callback) {
		let url = `${baseUri}zip=${zip}`
		request(url, (err, res, body) => {
			if (!err && res.statusCode === 200) {
				callback(JSON.parse(body).results);
			}
		})
	}
}


module.exports = Legislators;