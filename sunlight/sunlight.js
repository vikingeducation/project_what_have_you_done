const request = require('request');

const baseURL = 'https://congress.api.sunlightfoundation.com';
const pathToZip = '/legislators/locate?zip=';
const pathToLegislator = '/legislators?bioguide_id=';
const pathToVote = '/votes?voter_ids.';
const pathToVoteClose = '__exists=true';
const voteFieldsToRequest = '&fields=roll_id,bill_id,question,result,url,voted_at,voters,breakdown'
const pathToBill = '/bills?bill_id=';

var congress = {


  idiots: function() {
    console.log('Congress are idiots');
  },

// returns array with all legislators for that zip
  locate: function(zip, callback) {
    request(baseURL + pathToZip + zip, function(error, response, body) {
      if (!error & response.statusCode === 200) {
          callback(JSON.parse(body).results);
      }
    })
  },

// returns object containing legislator details
  legislator: function(bioguide, callback) {
    request(baseURL + pathToLegislator + bioguide, function(error, response, body) {
      if (!error & response.statusCode === 200) {
          callback(JSON.parse(body).results[0]);
      }
    })
  },

// returns an array of objects holding recent votes for offical with bioguide
  votes: function(bioguide, callback) {
    request(baseURL + pathToVote + bioguide + pathToVoteClose + voteFieldsToRequest, function(error, response, body) {
      var recentVotes = [];
      var voteResults = [];
      var voteResult = {};
      if (!error & response.statusCode === 200) {
          voteResults = JSON.parse(body).results;
          voteResults.forEach(function(aVote){
            voteResult.roll_id = aVote.roll_id;
            voteResult.bill_id = aVote.bill_id;
            voteResult.question = aVote.question;
            voteResult.result = aVote.result;
            voteResult.url = aVote.url;
            voteResult.voted_at = aVote.voted_at;
            voteResult.vote = aVote.voters[bioguide].vote;
            voteResult.breakdown = aVote.breakdown.total;
            recentVotes.push(voteResult);
            voteResult = {};
          })
          callback(recentVotes);
      }
    })
  },

// returns an object with key details of a bill_id
  bill: function(bill_id, callback) {
    request(baseURL + pathToBill + bill_id, function(error, response, body) {
      if (!error & response.statusCode === 200) {
          callback(JSON.parse(body).results[0]);
      }
    })
  }
}

module.exports = congress;
