const express = require('express');
const bodyParser = require('body-parser');

const config = require('../env/config.json');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./client/public'));

app.use(routes);

app.listen(config.server.port, () => {
  console.log(`started on port ${config.server.port}`);
});

module.exports = app;
