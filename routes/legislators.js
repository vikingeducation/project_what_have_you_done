let _ = require('lodash');
let express = require('express');
let router = express.Router();
const SunlightApi = require('../utils/SunlightApi');
let sunlight = new SunlightApi;


/* GET legislators by zip. */
  router.get('/', function(req, res, next) {
    let zip = req.query.zip
    if (isNaN(zip)){
      res.render('index', {error: 'Invalid zip code'})
    } else {
      let legislators = sunlight.legislators(zip, function(leg){
        let reps = _.filter(leg, ['chamber', 'house']);
        let senators = _.filter(leg, ['chamber', 'senate']);
        res.render('legislators', { zip: zip, reps: reps, senators: senators })
      })
    }
  });

module.exports = router;

