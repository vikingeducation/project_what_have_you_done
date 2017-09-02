const request = require('request');
const baseUri = 'https://congress.api.sunlightfoundation.com/legislators?bioguide_id=';


class LegislatorProfile {
	constructor(bioguideId) {
		this.bioguideId = bioguideId;
	}

	
	profile(callback) {
		this._sendRequest("results", callback)
	}

	_sendRequest(type, callback) {
		let url = `${baseUri}${bioguideId}`
		request(url, (err, res, body) => {
			if (!err && res.statusCode === 200) {
				callback(JSON.parse(body).results);
			}
		})
	}
}

module.exports = LegislatorProfile;