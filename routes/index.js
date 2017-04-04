var express = require('express');
var router = express.Router();

const sunlightAPI = require('../utils/api')
const Legistlator = require('../models/legislators')

/* GET legislator by zip */
router.get('/:zip?', function(req, res, next) {
    if (!req.query.zip) {
      next()
    } else {
      const zip = req.query.zip

      let legislatorList = []

      sunlightAPI.getLegistlatorByZip(zip)
          .then((results) => res.send(results))
          .catch((err) => {
              console.error(err)
              res.send(err)
          })  
    }      
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
