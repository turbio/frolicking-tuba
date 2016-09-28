const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require('../env/config.json');
const routes = require('./routes');
//const swagger = require('swagger-express');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.all('/*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.set('trust proxy', 1);
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: null
  }
}));


// app.use(swagger.init(app, {
//   apiVersion: '1.0',
//   swaggerVersion: '1.2',
//   swaggerURL: '/swagger',
//   swaggerJSON: '/api-docs.json',
//   swaggerUI: './public/swagger/',
//   basePath: 'http://localhost:3000',
//   apis: ['./server/api/github.js'],
//   middleware: () => {}
// }));


app.use(routes);
app.use(express.static('./client/public'));


app.listen(config.server.port, () => {
  console.log(`started on port ${config.server.port}`);
});

module.exports = app;
