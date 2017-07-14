/*
	NOTE: This was for the Sunlight Labs API that has since been shut down. Leaving work here as notes.
 */

var superagent = require('superagent');

var baseURI = 'https://congress.api.sunlightfoundation.com'; 

module.exports = {
	getLegislators: function(zipCode) {
		return this._get('legislators/locate', { zip: zipCode });
	},

	getVotes: function(sponsorID) {
		let id = `voter_ids.${sponsorID}`;

		return this._get('votes', { fields: `chamber,bill_id,${id}` });
	},

	getBill: function(billID) {
		return this._get('bills', { fields: 'urls.govtrack,official_title', bill_id: billID });
	},

	_get: function(endpoint, queries={}) {
		return new Promise(function(resolve, reject) {
			let endURI = `${baseURI}/${endpoint}`

			superagent
				.get(endURI)
				.set('Accept', 'application/json')
				.query(queries)
				.end(function(err, res) {
					if (err) {
						reject(err);
						return;
					}

					let parsedData = JSON.parse(res.text);

					resolve(parsedData);
				})

		})
	}
}