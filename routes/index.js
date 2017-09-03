const express = require('express');
const router = express.Router();
const Info = require('../controllers/Info')
/* GET home page. */
router.get('/', Info.homePage);
router.get('/Legislators', Info.legislatorsList, Info.LegislatorsPage)
router.get('/legislators/:bioguideId', Info.BillsPage)


module.exports = router;
