var express = require('express');
var router = express.Router();

const sunlightAPI = require('../utils/api')
const Legistlator = require('../models/legislators')

router.post('/', function(req, res, next) {
    if (!(/^\d{5}(?:[-\s]\d{4})?$/.test(req.body.zip))) {
      console.log('error out')
      res.render('index')
    } else {
      const zip = req.body.zip

      sunlightAPI.getLegistlatorByZip(zip)
          .then((legislators) => {
            res.render('legislatorList', {legislators: legislators, zip: zip});
          })
          .catch((err) => {
              console.error(err)
              res.send(err)
          })  
    }      
});

router.get('/', function(req, res, next) {
  console.log('error?')
  res.render('index', {title: 'Express'});
});

module.exports = router;
