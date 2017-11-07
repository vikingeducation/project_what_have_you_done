'use strict';
const request = require('request');
const Express = require('express');
const router = Express.Router();
const app = new Express();
const Members = require('./index.js');
const members = {};
members.houseMember = new Members.houseMember();
members.senateMember = new Members.senateMember();

const locator = request.defaults({
  headers: { key: 'API_KEY' }
});

const congress = request.defaults({
  headers: { 'X-API-Key': 't39tWvoQexG9UaGKn3k1LDKbWEvxS7ZoxmK0B7ai' }
});

const localBaseUri =
  'https://www.googleapis.com/civicinfo/v2/representatives?key';

const lock = 'AIzaSyCBYSt4nVMnuyOUFg6TZCA9q4z6V3zkzg0';

let zip = 12550;

const congressBaseUri = 'https://api.propublica.org/congress/v1/115';
// const houseMembers =
congress.get(
  `${congressBaseUri}/house/members.json`,
  (error, response, body) => {
    if (error) {
      console.error(error);
    }
    console.log(response.statusCode);
    let data = JSON.parse(body);
    // data.results[0].members.forEach(obj => members.housemember(obj));
    // data.results[0].members.forEach(member => members.houseMember(member));
    // console.log(members);
  }
);

// locator.get(`${localBaseUri}=${lock}&address=${zip}`, (error, response, body) => {
//   if (error) {
//     console.error(error);
//   }
//   let data = JSON.parse(body);
//   for (let key in data['officials']) {
//     console.log(data['officials'][key].name);
//   }
//   // console.log(data['officials']['name']);
// });
