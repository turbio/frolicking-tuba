const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./client/public'));

app.use(routes);

app.listen(config.port, () => {
  console.log(`started on port ${config.port}`);
});

module.exports = app;
