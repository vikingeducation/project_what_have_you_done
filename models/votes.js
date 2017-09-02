function billVotes(all_votes) {
     let bill_votes = [];
     all_votes.forEach(function(vote) {
       if (vote.bill) {
         bill_votes.push(vote);
       }
     })
     return bill_votes;
   };

class Bill {
   constructor (leg) {
     this.bill_id = leg.bill.bill_id;
     this.title = leg.bill.official_title;
     this.url = leg.bill.urls.govtrack;
     this.votes = leg.voter_ids;
     this.vote = this.votes[Object.keys(this.votes)[0]].toLowerCase();
   }

   profileOfLegislators(bioguideId, callback) {
	let url = `${baseUri}votes?voter_ids.${bioguideId}__exists=true&fields=bill,voter_ids.${bioguideId}`;

	request(url, (err, res, body) => {
		if(!err && res.statusCode === 200) {
			let bill_votes = billVotes(JSON.parse(body).results);
			let bills = bill_votes.map( function(bill) {
				return new Bill(bill);
			});
			callback(legislator, bills);
		}
	})
   }
 }
