
const sunlight = require('./sunlight/sunlight');



sunlight.idiots();
//sunlight.locate('98019', function(legislators){console.log(legislators);});
//sunlight.legislator('M001111', function(legislatorData){console.log(legislatorData);});
//sunlight.votes('M001111', function(legislatorData){console.log(legislatorData[0].passed);});
sunlight.bill('hjres42-115', function(bill){console.log(bill);});
