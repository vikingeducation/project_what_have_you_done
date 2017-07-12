const request = require("request");
const fs = require("fs");

const baseUri = "http://congress.api.sunlightfoundation.com/"

const lookUp = {
	zipLookup: function(zip, callback) {
		var fields = "bioguide_id,first_name,last_name,phone,oc_email,website,party,chamber";
		var url = `${baseUri}legislators/locate?zip=${zip}&fields=${fields}`;

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

	singleLegislator: function(id, callback) {
		var fields = "bioguide_id,first_name,last_name,phone,oc_email,website,party,chamber";
		var url = `${baseUri}legislators?bioguide_id=${id}&fields=${fields}`;

		request.get(url, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var legislator = JSON.parse(body);
				legislator = cleanupLegislators(legislator)[0];

				callback(legislator);
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
		cleanLegislator  = {
			id: legislator.bioguide_id,
			name: {
				firstName: legislator.first_name,
				lastName: legislator.last_name
			},
			contact: {
				phone: legislator.phone,
				email: legislator.oc_email,
				website: legislator.website
			}
		};

		switch (legislator.party) {
			case "R":
				cleanLegislator.party = "Republican";
				break;
			case "D":
				cleanLegislator.party = "Democratic";
				break;
			case "I":
				cleanLegislator.party = "Independent";
				break;
			case "G":
				cleanLegislator.party = "Green Party";

				break;
			default:
				cleanLegislator.party = "";
				break;
		};

		switch (legislator.chamber) {
			case "senate":
				cleanLegislator.title = "Senator";
				break;
			case "house":
				cleanLegislator.title = "Congressperson";
				break;
			default:
				cleanLegislator.title = "";
				break;
		}

		return cleanLegislator;
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

lookUp.singleLegislator("B001299", function(legislator) {
	lookUp.votes("B001299", function(votes) {
		console.log(legislator);
		console.log(votes);
	});
});

module.exports = lookUp;