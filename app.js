'use strict';
const http = require('http');
const fs = require('fs');
const exphbs = require('express-handlebars');
const request = require('request');
const Express = require('express');
const router = Express.Router();
const app = Express();
const legislators = require('./routes/legislators.js');

const port = 3000;
const host = 'localhost';

const hbs = exphbs.create({
  partialsDir: 'views/',
  defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'));

app.use('/legislators', legislators);
app.use(Express.static('public'));
app.listen(port);
console.log(`Currently running on ${port}`);
