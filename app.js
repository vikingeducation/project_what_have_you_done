'use strict';
const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv').config();
const env = require('./.env');
const request = require('request');
const Express = require('express');
const router = Express.Router();
const app = Express();
const Members = require('./members.js');

const localReps = {
  senate: {},
  house: {}
};

const port = 3000;
const host = 'localhost';

let server = http.createServer((req, res) => {
  fs.readFile('./views/home.html', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    }
  });
});

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
      return; //Handle errors!
    }
    console.log(response.statusCode);
    callback(JSON.parse(body));
  });
};

let memberLookup = (array, callback) => {
  array.forEach(id => {
    generalGet(`${congressBaseUri}/members/${id}`, data => callback(data));
  });
};

let memberVotes = (id, callback) => {
  generalGet(`${congressBaseUri}/members/${id}/votes.json`, data => {
    callback(data);
  });
};

let findHouseReps = (state, district, callback) => {
  generalGet(
    `${congressBaseUri}/members/house/${state}/${district}/current.json`,
    data => {
      let repArr = [];
      data.results.forEach(rep => repArr.push(rep.id));
      callback(repArr);
    }
  );
};

let findSenateReps = (state, callback) => {
  generalGet(
    `${congressBaseUri}/members/senate/${state}/current.json`,
    data => {
      let repArr = [];
      data.results.forEach(rep => repArr.push(rep.id));
      callback(repArr);
    }
  );
};

let popHouseReps = obj => {
  let rep = obj.results[0];
  let id = obj.results[0].member_id;
  memberVotes(id, data => {
    let thisRep = localReps.house[`${rep['first_name']} ${rep['last_name']}`];
    thisRep = new Members.HouseMember(rep);
    thisRep.voteCount = [];
    let dir = data.results[0].votes;
    for (let key in dir) {
      thisRep.voteCount.push(new Members.Votes(dir[key]));
    }
  });
};

let popSenateReps = obj => {
  let rep = obj.results[0];
  let id = obj.results[0].member_id;
  memberVotes(id, data => {
    let thisRep = localReps.senate[`${rep['first_name']} ${rep['last_name']}`];
    thisRep = new Members.SenateMember(rep);
    thisRep.voteCount = [];
    let dir = data.results[0].votes;
    for (let key in dir) {
      thisRep.voteCount.push(new Members.Votes(dir[key]));
    }
  });
};

let findLocalReps = (address, callback) => {
  generalGet(
    `${localBaseUri}=${googleKey}&address=${address}&levels=country`,
    data => {
      let district = Object.keys(data.divisions)[2];
      district = district.slice(district.length - 2).replace(/\W/g, '');
      let state = data.normalizedInput.state;
      callback(state, district);
    }
  );
};

findLocalReps('94 prospect street newburgh ny 12550', (state, district) => {
  findHouseReps(state, district, array => {
    memberLookup(array, obj => {
      popHouseReps(obj);
    });
    findSenateReps(state, array => {
      memberLookup(array, obj => {
        popSenateReps(obj);
      });
    });
  });
});
