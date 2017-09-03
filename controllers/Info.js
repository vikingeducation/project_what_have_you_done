const LegislatorProfile = require('../models/legislatorProfile')
const Bills = require('../models/Bills')
const Legislators = require('../models/legislators')
const _ = require('lodash');

const legislators = new Legislators();
const legislatorProfile = new LegislatorProfile();
const bills = new Bills();

var result;
var profile;
var bill;

exports.homePage = (req, res) => {
	res.render("index",  { title: 'What have you done?' });

}

exports.legislatorsList = (req, res, next) => {
	zip = req.query.zip;
	next();
}

exports.LegislatorsPage =  (req, res) => {
	const Results = legislators.Data((data) => {
				result = data;
			})
	setTimeout(() => {
		res.render('legislators', {zip: zip,
			legislators: result 
		})
	}, 5000)
}


exports.BillsPage = (req, res) => {

	bioguideId = req.params.bioguideId;
	const profilePage = legislatorProfile.profile((data) => {
				profile = data;
			})

	const Bills = bills.Voted((data) => {
		bill = data;
	})

	setTimeout(() => {
		res.render('bills', {
			data: profile,
			bioguide_id: bioguideId,
			votes: bill
		})
	}, 5000)
}