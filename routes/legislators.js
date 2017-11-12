'use strict';

const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const router = express.Router();
const dotenv = require('dotenv').config();
const env = require('../.env');
const Members = require('../members.js');
const Reps = require('../index.js');

router.get('/', () => console.log('Request received'));

router.get('/address', (req, res) => {
  console.log('address received');
  // let address = req.query.address;
  Reps.LocalRepsGenerator(req.query.address)
    .then(reps => {
      console.log(reps);
      return res.render('../views/locals.hbs', { reps });
    })
    .catch(err => res.render('../views/error.hbs', { err }));
});

router.get('/id/:id', (req, res) => {
  console.log('Rep ID received');
  // let id = [req.params.id];
  Reps.RepGenerator([req.params.id])
    .then(rep => res.render('../views/profile.hbs', { rep }))
    .catch(err => res.render('../views/error.hbs', { err }));
});

module.exports = router;
