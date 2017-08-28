const Legislators = require('../models/Legislators')
const Bills = require('../models/Bills')

const legislators = new Legislators();
const bills = new Bills();

exports.homePage = (req, res) => {
	res.render("index",  { title: 'What have you done?' });

}

exports.LegislatorsPage = (req, res) => {
	zip = req.query.zip;
	res.render('Legislators', {zip: zip,
		legislators_party: legislators.party,
		legislators_middleName: legislators.middleName,
	legislators_firstName: legislators.firstName
	})
}


exports.BillsPage = (req, res) => {
	let id = req.params.id;
	res.render('bills', {
		legislator_BioguideId: legislators.bioguide_id,
		bill_chamber: bills.chamber
	})
}