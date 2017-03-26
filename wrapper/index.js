const request = require('request');


/* BASE URI */
const baseURI = "https://congress.api.sunlightfoundation.com"

class Sunlight {

	/* Makes callback on an array of representative objects */
	findLegislatorsByZip(zip, callback) {
		const url = baseURI + "/legislators/locate?zip=" + zip + "&fields=bioguide_id,chamber,first_name,middle_name,last_name,party,phone,website";
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				if (data.count) {
					callback(data.results);
				}
			}
		});
	}
	/* Makes callback on an array of votes: PAY ATTENTION TO NESTED VOTE ANSWER */
	findVotesByLegislatorID(legislatorID, callback) {
		const url = baseURI + "/votes?voter_ids." + legislatorID + "__exists=true&fields=roll_id,question,congress,bill,voters." + legislatorID;
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				callback(data.results);	
			}
		});
	}

};


module.exports = Sunlight;
