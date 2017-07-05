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

    const url = baseUrl + 'votes?order=voted_at&fields=voters,roll_id,question,voted_at&per_page=50';
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
          if (vote.voters[legislator]) {

            // grab our legislator's details from a vote
            if (!polVotes.legislator) {
              let ourPol = vote.voters[legislator].voter;
              polVotes.legislator = sunlight.parseLegislator(ourPol);
            }
            // parse vote
            let currentVote = {
              title: vote.question,
              id: vote.roll_id,
              vote: voteConverter[vote.voters[legislator].vote]
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
    for (let method in contactOptions) {
      if (legislator[contactOptions[method]]) {
        pol.contact[method] = legislator[contactOptions[method]];
      }
    }

    return pol;

  }

}

module.exports = sunlight;
