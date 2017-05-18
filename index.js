const express = require('express')
const app = express();
const legislators = require('./models/legislators')
const bills = require('./models/bills')

var show = require('./routes/show')

app.set('view engine', 'hbs')

app.get('/', function(req, res){
  legislators.getLegislators(55406).then(function(data){
    var id = data[0].id
    bills.getBills(id).then(function(data){
      // var something = data
      console.log(data.results[1].bill.bill_id)
      res.render('index', {test: data.results[1].bill.bill_id, test2:id})
    })
  })
})

app.use('/show', show)

app.listen(3000, function() {
  console.log('Listening on localhost')
})
