const jsondata = require("./datatest");
const Legislator = require("./models/legislator")



console.log(jsondata.results[0].bioguide_id);
console.log(jsondata.results['bioguide_id']);

for (var i = 0; i < jsondata.results.length; i++) {
  console.log(jsondata.results[i].bioguide_id)
};

var legs = jsondata.results;
legs = legs.map(function(leg) {
  return legs;
})

console.log('this is the legs var' + legs)
console.log('this is the data again' + legs.bioguide_id)

//======
//try through constructor

var dataParseTest = new Legislator(jsondata);

console.log('dataParseTest' + dataParseTest)

for (var i = 0; i < dataParseTest.length; i++){
  console.log('looped data' + dataParseTest[i]);
}





//console.log('through constructor this is the legs var' + legs2)
//console.log('through constructor this is the data again' + legs2.bioguide_id)
