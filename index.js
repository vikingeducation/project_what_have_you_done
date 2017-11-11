'use strict';

const express = require('express');
const app = express();
const request = require('request');
const rp = require('request-promise');
const fs = require('fs');
const router = express.Router();
const dotenv = require('dotenv').config();
const env = require('./.env');
const Members = require('./members.js');

const options = {
  uri: '',
  headers: { 'X-API-Key': `${congressKey}` },
  json: true
};

const localBaseUri =
  'https://www.googleapis.com/civicinfo/v2/representatives?key';

const congressBaseUri = 'https://api.propublica.org/congress/v1';

let promisedGet = url => {
  options.uri = url;
  return rp(options);
};

const findLocalReps = address => {
  return promisedGet(
    `${localBaseUri}=${googleKey}&address=${address}&levels=country`
  )
    .then(data => {
      const district = Object.keys(data.divisions).reduce((acc, div) => {
        const pieces = div.split('/');
        const piece = pieces[pieces.length - 1];
        return piece.slice(0, 3) === 'cd:' ? piece.slice(3) : acc;
      });
      const state = data.normalizedInput.state;
      return {
        state: state,
        district: district
      };
    })
    .catch(error => console.error(error));
};

let findRepIds = obj => {
  let uriArr = [
    `${congressBaseUri}/members/house/${obj.state}/${obj.district}/current.json`,
    `${congressBaseUri}/members/senate/${obj.state}/current.json`
  ];
  return Promise.all(
    uriArr.map(uri => {
      return promisedGet(uri).then(data => {
        let reps = data.results;
        return reps.map(rep => rep.id);
      });
    })
  ).then(results => results.reduce((a, b) => a.concat(b)));
};

let memberLookup = array =>
  Promise.all(array.map(id => promisedGet(`${congressBaseUri}/members/${id}`)));

let populateReps = (array, localReps) => {
  return array.map(rep => populateRep(rep, localReps));
  console.log(localReps);
};

let populateRep = (obj, localReps) => {
  let rep = obj.results[0];
  let chamber = rep.roles[0].chamber;
  if (chamber === 'House') {
    localReps[chamber][
      `${rep['first_name']} ${rep['last_name']}`
    ] = new Members.HouseMember(rep);
  } else {
    localReps[chamber][
      `${rep['first_name']} ${rep['last_name']}`
    ] = new Members.SenateMember(rep);
  }
  return localReps[chamber][`${rep['first_name']} ${rep['last_name']}`];
};

let memberVotes = obj => {
  let id = obj[0].id;
  console.log(id);
  return promisedGet(`${congressBaseUri}/members/${id}/votes.json`).then(
    data =>
      (obj[0].votes = data.results[0].votes.map(val => new Members.Votes(val)))
  );
};
// obj[0].votes= new Members.Votes(obj);
let num = ['S000148'];

const RepGenerator = id => {
  const soloRep = {
    House: {},
    Senate: {}
  };

  memberLookup(id)
    .then(obj => populateReps(obj, soloRep))
    .then(memberVotes)
    .then(data => console.log(data));
  // // .catch(error => console.error(error))
  // .then(memberVotes)
  // .catch(error => console.error(error));
};

const LocalRepsGenerator = address => {
  const localReps = {
    Senate: {},
    House: {}
  };

  findLocalReps(address)
    .then(findRepIds)
    .then(memberLookup)
    .then(array => populateReps(array, localReps))
    .then(console.log);
};

module.exports = {};

// LocalRepsGenerator('2415 nobel ave south lehigh acres fl 33973');
RepGenerator(num);
// console.log(num);
