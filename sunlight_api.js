const request = require('request');
const baseUri = "https://congress.api.sunlightfoundation.com";
const Legislator = require('./models/Legislator');
const Bill = require('./models/Bill');

function billVotes(all_votes) {
    let bill_votes = [];
    all_votes.forEach(function(vote) {
      if (vote.bill) {
        bill_votes.push(vote);
      }
    })
    return bill_votes;
  };

function splitLegislators(legs) {
  let legislators = { senate: [], house: []}
  legs.forEach(function(leg) {
    leg.chamber === 'senate' ? legislators.senate.push(leg) : legislators.house.push(leg);
  });
  return legislators;
};

class Sunlight {

  listOfLegislators(zip, callback) {
    const url = `${baseUri}/legislators/locate?zip=${zip}`;
    request(url, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        let legislators = JSON.parse(body).results.map( (leg) => {
          return new Legislator(leg);
        })
        callback(splitLegislators(legislators));
      } else {
        console.error(error);
      }
    });
  };

  profileOfLegislator(bioguide_id, callback) {
    const bio_url = `${baseUri}/legislators?bioguide_id=${bioguide_id}`;
    const votes_url = `${baseUri}/votes?voter_ids.${bioguide_id}__exists=true&fields=bill,question,voter_ids.${bioguide_id}`;
    request(bio_url, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        let legislator = new Legislator(JSON.parse(body).results[0]);

        request(votes_url, function(err, res, body) {
          if (!err && res.statusCode === 200) {
            let bill_votes = billVotes(JSON.parse(body).results);
            let bills = bill_votes.map(function(bill) {
              return new Bill(bill);
            });
            callback(legislator, bills);
          }
        })
      }
    })
  };
};

module.exports = Sunlight;