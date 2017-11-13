'use strict';

const express = require('express');
const app = express();
const request = require('request');
const rp = require('request-promise');
// const dotenv = require('dotenv').config();
// const env = require('./.env');
const Members = require('./members.js');

const keys = {
  googleKey: process.env.GOOGLE_KEY,
  congressKey: process.env.CONGRESS_KEY
};

const options = {
  uri: '',
  headers: { 'X-API-Key': `${keys.congressKey}` },
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
    `${localBaseUri}=${keys.googleKey}&address=${address}&levels=country`
  ).then(data => {
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
  });
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

const populateReps = reps => {
  return reps.reduce(populateRep, { Senate: [], House: [] });
};

const populateRep = (localReps, obj) => {
  const rep = obj.results[0];
  const chamber = rep.roles[0].chamber;
  if (chamber === 'House') {
    localReps.House.push(new Members.HouseMember(rep));
  } else {
    localReps.Senate.push(new Members.SenateMember(rep));
  }
  return localReps;
};

let memberVotes = obj => {
  const legislator = obj.Senate.length ? obj.Senate[0] : obj.House[0];
  return promisedGet(
    `${congressBaseUri}/members/${legislator.id}/votes.json`
  ).then(data => {
    legislator.votes = data.results[0].votes.map(val => new Members.Votes(val));
    return legislator;
  });
};

const RepGenerator = id => {
  return memberLookup(id)
    .then(populateReps)
    .then(memberVotes);
};

const LocalRepsGenerator = address => {
  return findLocalReps(address)
    .then(findRepIds)
    .then(memberLookup)
    .then(array => populateReps(array));
};

module.exports = {
  LocalRepsGenerator,
  RepGenerator
};

// let num = ['S000148'];
// LocalRepsGenerator('2415 nobel ave south lehigh acres fl 33973');
// RepGenerator(num);
