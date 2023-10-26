const express = require('express');
const mustacheExpress = require('mustache-express');
const logger = require('morgan');
const session = require('express-session')

const router = require('./controllers/router');

const app = express();

app.engine('html', mustacheExpress());

app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(session({
    secret: 'a random set of characters like 1aq2ws3de4',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

app.use('/', router);

app.listen(3000, () => { console.log("Listening on port 3000...") });
