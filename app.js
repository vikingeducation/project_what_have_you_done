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
  res.render('index');
})

app.use('/show', show);
app.use('/legislators', legislator)

app.listen(port)
