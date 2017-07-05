'use strict';

const rp = require('request-promise-native');
const moment = require('moment');

const baseUrl = 'https://congress.api.sunlightfoundation.com/';

const sunlight = {

  getLegislators: function(zipCode, callback) {

    // return the legislators for a given zip code 

    const url = baseUrl + 'legislators/locate?zip=' + zipCode;
    const options = {
      uri: url,
      json: true
    };
    rp(options)
      .then(function(response) {

        let legislators = {
          house: [],
          senate: []
        };

        response.results.forEach(function(legislator) {
          legislators[legislator.chamber]
            .push(sunlight.parseLegislator(legislator));
        });

       callback(null, legislators);
      })
      .catch(function(error) {
        callback(error);
      });

  },

  getVotes: function(legislator, callback) {

    // return the votes of a given legislator
    const fieldList = [
      'voters',
      'roll_id',
      'question',
      'voted_at',
      'congress',
      'vote_type',
      'bill'
    ]
    const fields = fieldList.join(',');
    const url = baseUrl + `votes?order=voted_at&per_page=50&fields=${fields}`;
    const options = {
      uri: url,
      json: true
    }
    rp(options)
      .then(function(response) {
        let polVotes = {
          votes: [],
          legislator: null
        }
        const voteConverter = {
          'Yea': true,
          'Nay': false,
        }

        response.results.forEach(function(vote) {
          if (vote.voters[legislator]
              && (vote.vote_type === 'passage')) {

            // grab our legislator's details from a vote
            if (!polVotes.legislator) {
              let ourPol = vote.voters[legislator].voter;
              polVotes.legislator = sunlight.parseLegislator(ourPol);
            }
            // parse vote
            let currentVote = {
              title: vote.bill.official_title,
              id: vote.roll_id.split('-')[0],
              vote: voteConverter[vote.voters[legislator].vote],
              congress: vote.congress
            }
            currentVote.date = moment(vote.voted_at).format('M/D/YY');

            if (currentVote.vote === undefined) {
              return;
            }
            polVotes.votes.push(currentVote);
          }
        })

        callback(null, polVotes);

      })
      .catch(function(error) {
        callback(error);
      })

  },

  parseLegislator: function(legislator) {
    const partyConverter = {
      'D': 'Democrat',
      'R': 'Republican',
      'I': 'Independant'
    };
    const titleConverter = {
      'house': 'Representative',
      'senate': 'Senator'
    };
    const nameOptions = [
      'middle_name',
      'last_name',
      'name_suffix'
    ];
    const contactOptions = {
      phone: 'phone',
      email: 'oc_email',
      website: 'website',
      facebook: 'facebook_id',
      twitter: 'twitter_id',
      youtube: 'youtube_id',
    };

    // basics
    let pol = {
      id: legislator.bioguide_id,
      party: partyConverter[legislator.party],
      chamber: legislator.chamber,
      title: titleConverter[legislator.chamber],
      contact: {}
    };

    // name
    let name = legislator.first_name;;
    if (legislator.nickname) {
      name = legislator.nickname;
    }

    nameOptions.forEach(function(subName) {
      if (legislator[subName]) {
        name += ' ' + legislator[subName];
      }
    });

    pol.name = name;

    // contact
    for (let service in contactOptions) {
      if (legislator[contactOptions[service]]) {
        pol.contact[service] = legislator[contactOptions[service]];
      }
    }

    return pol;

  }

}

module.exports = sunlight;
