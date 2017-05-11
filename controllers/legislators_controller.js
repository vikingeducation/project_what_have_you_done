const express = require('express');
const router = express.Router();
const Legislator = require('../models/legislator');

router.get('/', (req, res, next) => {
  const zip = req.query.zip

  Legislator.findByZip(zip)
    .then(legislators => {
      res.render('index', {
        zip: zip,
        houseMembers: Legislator.filterForHouse(legislators),
        senateMembers: Legislator.filterForSenate(legislators)
      });
    });
});

router.get('/:id', (req, res, next) => {
  Legislator.findById(req.params.id)
    .then(legislator => {
      legislator.bills().then(bills => {
        res.render('show', {legislator: legislator, bills: bills});
      });
    });
});

module.exports = router;
