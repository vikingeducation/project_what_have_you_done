/*
	For Dummy Data
 */

var superagent = require('superagent');

// var baseURI = '/api/reps'; 

module.exports = {

	get: function(endpoint, queries={}) {
		return new Promise(function(resolve, reject) {
			superagent
				.get(endpoint)
				.set('Accept', 'application/json')
				.query(queries)
				.end(function(err, res) {
					if (err) {
						reject(err);
						return;
					}

					let parsedData = JSON.parse(res.text);

					resolve(parsedData);
				});
		});
	}
}