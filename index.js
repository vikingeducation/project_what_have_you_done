const Legislators = require('./models/Legislators')
const Bills = require('./models/Bills');

const legislators = new Legislators();
const bills = new Bills()

legislators.party((data) => {
	console.log("PARTY");
	console.log(data);
})

legislators.firstName((data) => {
	console.log("PARTY");
	console.log(data);
})

legislators.middleName((data) => {
	console.log("PARTY");
	console.log(data);
})

bills.voteType((data) => {
	console.log(JSON.stringify(data));
})

bills.officialTitle((data) => {
	console.log(data);
})


const request = require('request')

request('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json', function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(JSON.parse(body).results)
  }
})