const request = require("request");
const fs = require("fs");

const baseUri = "https://congress.api.sunlightfoundation.com/"

module.exports = {
	zipLookup: function(zip, callback) {
		var url = `${baseUri}legislators/locate?zip=${zip}`;

		request.get(url, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var legislators = JSON.parse(body);
				legislators = cleanupLegislators(legislators);
				callback(legislators);
			} else {
				console.log(error);
			};
		});
	},

	votes: function(id, callback) {
		var fields = `bill_id,voter_ids.${id},bill.official_title`;
		var filters = `bill_id__exists=true&voter_ids.${id}__exists=true`
		
		var url = `${baseUri}votes?${filters}&fields=${fields}`;

		request.get(url, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var votes = JSON.parse(body).results;
				votes = cleanupVotes(id, votes);

				callback(votes)
			} else {
				console.log(error);
			};
		});
	}
};

cleanupLegislators = function(legislators) {
	legislators = legislators.results.map(function (legislator) {
		return {
			id: legislator.bioguide_id,
			name: {
				firstName: legislator.first_name,
				nickname: legislator.nickname,
				lastName: legislator.last_name,
				middleName: legislator.middleName,
				nameSuffix: legislator.name_suffix
			},
			chamber: legislator.chamber,
			party: legislator.party,
			state: legislator.state_name,
			contact: {
				phone: legislator.phone,
				email: legislator.oc_email,
				website: legislator.website
			}
		};
	});

	return legislators;
};

cleanupVotes = function(id, votes) {
	votes = votes.map(function (vote) {
		return {
			bill_id: vote.bill_id,
			vote: vote.voter_ids[id],
			title: vote.bill.official_title
		};
	});

	return votes;
};