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
       console.log(response.results);
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
        let billz = [];

        _.each(response.results, function(bill) {
          if (bill.voters[legislator]) {
            let currentBill = {
              'title': bill.question,
              'id': bill.roll_id,
              'time': bill.voted_at,
              'vote': bill.voters[legislator].vote
            }
            billz.push(currentBill);
          }
        })

        console.log(billz);

      })
      .catch(function(error) {
        console.log(error);
      })

  }

}

module.exports = sunlight;
