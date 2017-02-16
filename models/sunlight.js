const baseUri = 'https://congress.api.sunlightfoundation.com';

const sunlight = {

  bioUrl: (bioguide_id) => {
    let query = `legislators?bioguide_id=${bioguide_id}`;
    return `${baseUri}/${query}`;
  },

  legislatorsUrl: (zip) => {
    let query = `legislators/locate?zip=${zip}`;
    return `${baseUri}/${query}`;
  },

  votesUrl: (bioguide_id) => {
    let query = `votes?&voter_ids.${bioguide_id}__exists=true`
              + `&fields=bill,question,voter_ids.${bioguide_id}`;
    return `${baseUri}/${query}`;
  },

  splitLegislators: (legs) => {
    let legislators = { house: [], senate: [] };
    legs.forEach( (leg) => {
      if (leg['chamber'] === 'senate') {
        legislators.senate.push(leg);
      } else {
        legislators.house.push(leg);
      };
    });
    return legislators;
  },

  billVotes: (all_votes) => {
    let bill_votes = [];
    all_votes.forEach( (vote) => {
      if (vote['bill']) bill_votes.push(vote);
    });
    return bill_votes;
  }
}

module.exports = sunlight;
