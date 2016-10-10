const db = require('./db');

//models
const User = require('./models/user');
const Key = require('./models/key');
const Url = require('./models/url');

//options
const force = process.argv.includes('--force');

console.log('syncing', force ? 'FORCEFULLY' : 'non-forcefully');

Promise.resolve().then(() =>
  console.log('syncing User schema') || User.sync({ force }))

.then(() =>
  console.log('syncing Key schema') || Key.sync({ force }))

.then(() =>
  console.log('syncing Url schema') || Url.sync({ force }))

.then(() =>
  db.close())

.catch((err) =>
  console.log('migration error:', err));
