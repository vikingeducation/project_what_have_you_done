const request = require('request')

const baseUri = 'https://congress.api.sunlightfoundation.com/votes?voter_ids.';


class Bills {
	constructor(bioguideId) {
		this.bioguideId = bioguideId;
	}
		Voted(callback) {
		this._sendRequest('results', callback);
	}

	_sendRequest(type, callback) {
		const url = `${baseUri}${bioguideId}__exists=true`;

		request(url, (err, res, body) => {
			if(!err && res.statusCode === 200) {
				callback(JSON.parse(body).results)
			}
		})
	}
}

module.exports = Bills;