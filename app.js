const express = require('express')
const app = express();
const legislators = require('./models/legislators')
const bills = require('./models/bills')
const port = process.env.PORT || '3000'

var show = require('./routes/show')
var legislator = require('./routes/legislators')

app.use('/static', express.static('public'))

app.set('view engine', 'hbs')

app.get('/', function(req, res){
  legislators.getLegislators(`/legislators/locate?zip=55406`).then(function(data){
    var id = data[0].id
    bills.getBills(id).then(function(data){
      res.render('index', {test: data.results[1].bill.bill_id, test2:id})
    })
  })
})

app.use('/show', show);
app.use('/legislators', legislator)

app.listen(port)
