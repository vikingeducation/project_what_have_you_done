'use strict';
const dotenv = require('dotenv').config();
const env = require('./.env');
const request = require('request');
const Express = require('express');
const router = Express.Router();
const app = Express();
const Members = require('./index.js');
const members = {};
// members.HouseMember = new Members.HouseMember();
// members.SenateMember = new Members.SenateMember();

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
  generalGet(`${congressBaseUri}/members/${id}/votes.json`, data =>
    callback(data)
  );
};

let localReps = zip => {
  generalGet(
    `${localBaseUri}=${googleKey}&address=${zip}&levels=country`,
    data => {
      for (let key in data['officials']) {
        console.log(data['officials'][key]);
      }
    }
  );
};

generalGet(`${congressBaseUri}/115/house/members.json`, data => {
  data.results[0].members.forEach(
    member => (members.HouseMember = new Members.HouseMember(member))
  );
});

generalGet(`${congressBaseUri}/115/senate/members.json`, data => {
  data.results[0].members.forEach(
    member => (members.HouseMember = new Members.HouseMember(member))
  );
});
