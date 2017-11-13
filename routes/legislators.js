'use strict';

const express = require('express');
const request = require('request');
const router = express.Router();
const dotenv = require('dotenv').config();
const env = require('../.env');
const Members = require('../members.js');
const Reps = require('../index.js');

router.get('/', () => console.log('Request received'));

router.get('/address', (req, res) => {
  Reps.LocalRepsGenerator(req.query.address)
    .then(reps => res.render('locals', { reps }))
    .catch(err => res.render('error', { err }));
});

router.get('/id/:id', (req, res) => {
  console.log('Rep ID received');
  Reps.RepGenerator([req.params.id])
    .then(rep => res.render('profile', { rep }))
    .catch(err => res.render('error', { err }));
});

module.exports = router;
