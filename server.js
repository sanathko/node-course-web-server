const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

//reuse content as partials
hbs.registerPartials(__dirname + '/views/partials');

//view engine is handlebars
app.set('view engine', 'hbs');

//register logger
app.use((req, res, next) => {
  var now =  new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

//overrides any page..goes only to this..
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//static resources middlewear
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to our page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMesage: 'Unable to process'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
