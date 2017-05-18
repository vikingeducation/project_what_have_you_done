var express = require('express');
var router = express.Router();
var api = require('../call')


router.get('/', function(req, res){
  const zip = req.query.zip
  api.call(zip).then(function(data){
    res.render('show', {test: data})
  });
});





module.exports = router
