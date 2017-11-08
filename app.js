'use strict';
const dotenv = require('dotenv').config();
const env = require('./.env');
const request = require('request');
const Express = require('express');
const router = Express.Router();
const app = Express();
const Members = require('./index.js');
const members = {};
const localReps = {};

const congress = request.defaults({
  headers: { 'X-API-Key': `${congressKey}` }
});

const localBaseUri =
  'https://www.googleapis.com/civicinfo/v2/representatives?key';

const congressBaseUri = 'https://api.propublica.org/congress/v1';

let generalGet = (url, callback) => {
  congress.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
    }
    console.log(response.statusCode);
    callback(JSON.parse(body));
  });
};

let memberLookup = (id, callback) => {
  generalGet(`${congressBaseUri}/members/${id}`, data => callback(data));
};

let memberVotes = (id, callback) => {
  generalGet(`${congressBaseUri}/members/${id}/votes.json`, data => {
    for (let key in localReps) {
      if (localReps[key].id === id) {
        localReps[key].voteCount = new Members.Votes(data.results[0].votes);
      }
    }
  });
};

let findLocalReps = zip => {
  generalGet(
    `${localBaseUri}=${googleKey}&address=${zip}&levels=country`,
    data => {
      for (var key in data['officials']) {
        for (var key2 in members) {
          if (data['officials'][key]['name'] === key2) {
            localReps[key2] = members[key2]['SenateMember'];
            localReps[key2][photo] = data['officials'][key]['photoUrl'];
          }
        }
      }
    }
  );
};

generalGet(`${congressBaseUri}/115/house/members.json`, data => {
  data.results[0].members.forEach(member => {
    members[
      `${member.first_name} ${member.last_name}`
    ] = new Members.HouseMember(member);
  });
});

generalGet(`${congressBaseUri}/115/senate/members.json`, data => {
  data.results[0].members.forEach(member => {
    members[
      `${member.first_name} ${member.last_name}`
    ] = new Members.SenateMember(member);
  });
  findLocalReps(12550);
  console.log(localReps);
});
