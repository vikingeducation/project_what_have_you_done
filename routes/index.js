const express = require('express');
const router = express.Router();
const Info = require('../controllers/Info')
/* GET home page. */
router.get('/', Info.homePage);
router.get('/Legislators', Info.LegislatorsPage)
router.get('/legislators/:id', Info.BillsPage)


module.exports = router;
