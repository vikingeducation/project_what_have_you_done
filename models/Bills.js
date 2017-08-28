const request = require('request')

const baseUri = 'https://congress.api.sunlightfoundation.com/bills?history.active=true&order=last_action_at';


class Bills {
	chamber(callback) {
		this._sendRequest("chamber", callback)
	}

	billId(callback) {
		this._sendRequest("bill_id", callback)
	}

	officialTitle(callback) {
		this._sendRequest('official_title', callback);
	}

	voteType(callback) {
		this._sendRequest('votes.vote_type', callback);
	}

	_sendRequest(type, callback) {
		const url = `${baseUri}&fields=${type}`;

		request(url, (err, res, body) => {
			if(!err && res.statusCode === 200) {
				callback(JSON.parse(body).results)
			}
		})
	}
}

module.exports = Bills;