const express = require('express'),
      path = require('path'),
      app = express();

const legislators = require('./controllers/legislators_controller');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('homepage');
});

app.use('/legislators', legislators);

app.listen(3000, () => {
  console.log('success!');
});
