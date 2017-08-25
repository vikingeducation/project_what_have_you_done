const express = require('express');
const router = express.Router();

const Sunlight = require('../models/sunlightApi');

router.get('/:location', function(req, res, next){

    var zip = req.query.zip;
    var api = new Sunlight();

    api.legislatorByZip(zip, function(req, res, error){
      res.render('legislatorslist', {zip: req.params.zip})
    });

});

module.exports = router
