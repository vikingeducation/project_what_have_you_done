'use strict';
const http = require('http');
const fs = require('fs');
const request = require('request');
const Express = require('express');
const router = Express.Router();
const app = Express();
const Members = require('./members.js');
const Locals = require('./routes/locals.js');

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

Locals.findLocalReps(
  '94 prospect street newburgh ny 12550',
  (state, district) => {
    Locals.findHouseReps(state, district, array => {
      Locals.memberLookup(array, obj => {
        Locals.popHouseReps(obj);
      });
      Locals.findSenateReps(state, array => {
        Locals.memberLookup(array, obj => {
          Locals.popSenateReps(obj);
        });
      });
    });
  }
);
