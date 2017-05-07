const express = require('express');
const app = express();

const generateId = require('./lib/generate-id');

const path = require('path');

const bodyParser = require('body-parser');

app.use(express.static('static'));

app.set('view engine', 'jade')

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Express Train';
app.locals.trains = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (request, response) => {
  response.render('index');
});

app.post('/trains', (request, response) => {
  if(!request.body.train) { return response.sendStatus(400); }

  var id = generateId();

  app.locals.trains[id] = request.body.train;

  response.redirect('/trains/' + id);
});

app.get('/trains/:id', (request, response) => {
  var train = app.locals.trains[request.params.id];

  response.send({ train: train });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
};

module.exports = app;
