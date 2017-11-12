'use strict';
const http = require('http');
const fs = require('fs');
const hbs = require('hbs');
const request = require('request');
const Express = require('express');
const router = Express.Router();
const app = Express();
const legislators = require('./routes/legislators.js');

const port = 3000;
const host = 'localhost';

app.set('view engine', 'hbs');

app.get('/', (req, res) =>
  fs.readFile('./views/home.html', 'utf8', (err, data) => res.end(data))
);

app.use('/legislators', legislators);
app.use(Express.static('public'));
app.listen(port);
console.log(`Currently running on ${port}`);
