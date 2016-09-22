const express = require('express');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(express.static('./client/public'));

app.use(routes);

app.listen(config.port, () => {
  console.log(`started on port ${config.port}`);
});
