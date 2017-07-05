'use strict';

const rp = require('request-promise-native');
const _ = require('lodash');

const baseUrl = 'https://congress.api.sunlightfoundation.com/';

const sunlight = {

  getLegislators: function(zipCode) {

    // return the legislators for a given zip code 

    const fields = [
          'bioguide_id',
          'chamber',
          'facebook_id',
          'nickname',
          'first_name',
          'middle_name',
          'last_name',
          'name_suffix',
          'party',
          'phone',
          'oc_email',
          'website',
          'twitter_id',
          'youtube_id'
        ]

    const url = baseUrl + 'legislators/locate?zip=' + zipCode + '&fields=' + fields.join(',');
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
        const partyConverter = {
          'D': 'Democrat',
          'R': 'Republican',
          'I': 'Independant'
        }
        _.each(response.results, function(legislator) {
          let currentPol = {
            id: legislator.bioguide_id,
            party: partyConverter[legislator.party],
            phone: legislator.phone,
            email: legislator.oc_email,
            website: legislator.website,
            twitter: legislator.twitter_id,
            youtube: legislator.youtube_id
          };

          // parse name
          let name = '';
          if (legislator.nickname) {
            name += legislator.nickname;
          } else {
            name += legislator.first_name;
          }
          _.each(['middle_name', 'last_name', 'name_suffix'], function(subName) {
            if (legislator[subName]) {
              name += ' ' + legislator[subName];
            }
          });
          currentPol.name = name;

          legislators[legislator.chamber].push(currentPol);

        })
       console.log(legislators);
      })
      .catch(function(error) {
        console.log(error);
      });

  },

  getVotes: function(legislator) {

    // return the votes of a given legislator

    const url = baseUrl + 'votes?order=voted_at&fields=voters,roll_id,question,voted_at&per_page=50';
    const options = {
      uri: url,
      json: true
    }
    rp(options)
      .then(function(response) {
        let votes = [];
        const voteConverter = {
          'Yea': true,
          'Nay': false,
        }

        _.each(response.results, function(vote) {
          if (vote.voters[legislator]) {
            
            let currentVote = {
              'title': vote.question,
              'id': vote.roll_id,
              'time': vote.voted_at,
              'vote': voteConverter[vote.voters[legislator].vote]
            }
            votes.push(currentVote);
          }
        })

        console.log(votes);

      })
      .catch(function(error) {
        console.log(error);
      })

  }

}

module.exports = sunlight;
