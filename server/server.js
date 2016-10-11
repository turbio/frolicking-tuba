const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const morgan = require('morgan');
const fs = require('fs');

const config = require('../env/config.json');
const routes = require('./routes');

const app = express();

const logStream = fs.createWriteStream(
  './server.log',
  { flags: 'a' });

app.use(morgan('combined', { stream: logStream }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('trust proxy', 1);
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: null
  },
  store: new redisStore()
}));

app.use(routes);

app.listen(config.server.port, () => {
  console.log(`started on port ${config.server.port}`);
});

module.exports = app;
