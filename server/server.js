const express = require('express');
const config = require('./config');

const app = express();

app.use(express.static('./client/public'));

app.listen(config.port, () => {
  console.log(`started on port ${config.port}`);
});
