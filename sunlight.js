'use strict';

const rp = require('request-promise-native');
const _ = require('lodash');

const baseUrl = 'https://congress.api.sunlightfoundation.com/';

const sunlight = {

  getLegislators: function(zipCode) {

    // return the legislators for a given zip code 

    const url = baseUrl + 'legislators/locate?zip=' + zipCode;
    const options = {
      uri: url,
      json: true
    };
    rp(options)
      .then(function(response) {
        const fields = [
          'bioguide_id',
          'chamber',
          'facebook_id',
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

        let parsedPersons = []

        _.each(response.results, function(legislator) {
          parsedPersons.push(_.pick(legislator, fields));
        })

        console.log(parsedPersons);
      })
      .catch(function(error) {
        console.log(error);
      });

  },

  getVotes: function(legislator) {

    // return the votes of a given legislator

  }

}

module.exports = sunlight;
