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

const congressBaseUri = 'https://api.propublica.org/congress/v1/115';

congress.get(
  `${congressBaseUri}/house/members.json`,
  (error, response, body) => {
    if (error) {
      console.error(error);
    }
    console.log(response.statusCode);
    let data = JSON.parse(body);
    data.results[0].members.forEach(member => {
      members.HouseMember = new Members.HouseMember(member);
    });
  }
);

congress.get(
  `${congressBaseUri}/senate/members.json`,
  (error, response, body) => {
    if (error) {
      console.error(error);
    }
    console.log(response.statusCode);
    JSON.parse(body).results[0].members.forEach(member => {
      members.SenateMember = new Members.SenateMember(member);
      console.log(members);
    });
  }
);

// request.get(
//   `${localBaseUri}=${googleKey}&address=${address}`,
//   (error, response, body) => {
//     if (error) {
//       console.error(error);
//     }
//     var data = JSON.parse(body);
//     for (var key in data['officials']) {
//       console.log(data['officials'][key]);
//     }
//     // console.log(data['officials']['name']);
//   }
// );
